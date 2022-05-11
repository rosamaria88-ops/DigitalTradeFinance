// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ObjectId } = require('mongodb');
import { getCollection } from '../database';
import { Estore } from '../interfaces';
import { ESTORE_CRON_STATUS, UKEF_ID } from '../constants';
import { eStoreCronJobManager } from './eStoreCronJobManager';
import { eStoreFacilityFolderCreationJob } from './eStoreFacilityFolderCreationJob.cron';
import { createDealFolder } from '../v1/controllers/estore/eStoreApi';
const facilityCreationTimer = '59 * * * * *';

export const eStoreDealFolderCreationJob = async (eStoreData: Estore) => {
  try {
    const cronJobLogsCollection = await getCollection('cron-job-logs');
    const tfmDealsCollection = await getCollection('tfm-deals');
    let { dealIdentifier } = eStoreData;
    if (dealIdentifier === UKEF_ID.PENDING) {
      console.info('Deal Identifier Cron Job: DealIdentifier is set to PENDING');
      const identifier = tfmDealsCollection.findOne({ _id: ObjectId(eStoreData.dealId) });
      if (identifier?.dealSnapshot?.ukefDealId) {
        dealIdentifier = identifier?.dealSnapshot?.ukefDealId;
      }
    }

    // check if the dealIdentifier is set - this needs to be generated by the number-generator
    if (dealIdentifier && dealIdentifier !== UKEF_ID.PENDING) {
      // create the Deal folder
      console.info('API Call started: Create the Deal folder for ', eStoreData.dealIdentifier);
      const dealFolderResponse = await createDealFolder(eStoreData.siteName, {
        exporterName: eStoreData.exporterName,
        buyerName: eStoreData.buyerName,
        dealIdentifier: eStoreData.dealIdentifier,
        destinationMarket: eStoreData.destinationMarket,
        riskMarket: eStoreData.riskMarket,
      });
      // check if the API call was successful
      if (dealFolderResponse.status === 201) {
        console.info('API Call finished: The Deal folder was successfully created');
        // stop and the delete the cron job to release the memory
        eStoreCronJobManager.deleteJob(`Deal${eStoreData.dealId}`);

        // update the `tfm-deals` collection once the buyer and deal folders have been created
        tfmDealsCollection.updateOne(
          { _id: ObjectId(eStoreData.dealId) },
          { $set: { 'tfm.estore': { buyerName: eStoreData.buyerName, folderName: dealFolderResponse.data.foldername, siteName: eStoreData.siteName } } },
        );

        // update the record inside `cron-job-logs` collection to indicate that the cron job finished executing
        await cronJobLogsCollection.updateOne(
          { dealId: eStoreData.dealId },
          {
            $set: {
              'dealCronJob.status': ESTORE_CRON_STATUS.COMPLETED,
              'dealCronJob.completionDate': new Date(),
              'facilityCronJob.status': ESTORE_CRON_STATUS.RUNNING,
              'facilityCronJob.startDate': new Date(),
            },
          },
        );

        // add a new job to the `Cron Job Manager` to create the Facility Folders for the current Deal
        eStoreCronJobManager.add(`Facility${eStoreData.dealId}`, facilityCreationTimer, async () => {
          await eStoreFacilityFolderCreationJob(eStoreData);
        });
        console.info('Cron task started: Create the Facility folder');
        eStoreCronJobManager.start(`Facility${eStoreData.dealId}`);
      } else {
        console.info('Cron job continues: eStore Deal Folder Cron Job continues to run for dealIdentifier: ', eStoreData.dealIdentifier);
        // increment the dealFolderCreationRetries by 1
        const response = await cronJobLogsCollection.findOneAndUpdate(
          { dealId: eStoreData.dealId },
          { $inc: { dealFolderCreationRetries: 1 } },
          { returnDocument: 'after' },
        );
        // stop the Deal Folder Cron Job after 3 retries
        // this is to prevent it from running forever
        if (response?.value?.dealFolderCreationRetries === 3) {
          console.error(`API Call failed: Unable to create a Deal Folder for ${eStoreData.dealIdentifier}`, { dealFolderResponse });
          // stop and delete the cron job - this to release the memory
          eStoreCronJobManager.deleteJob(`Deal${eStoreData.dealId}`);
          // update the record inside `cron-job-logs` collection to indicate that the cron job failed
          await cronJobLogsCollection.updateOne(
            { dealId: eStoreData.dealId },
            { $set: { dealFolderResponse, 'dealCronJob.status': ESTORE_CRON_STATUS.FAILED, 'dealCronJob.completionDate': new Date() } },
          );
        }
      }
    } else {
      console.info('Cron job continues: eStore Deal Folder Cron Job continues to run for dealIdentifier: ', eStoreData.dealIdentifier);
      // increment the dealFolderCreationRetries by 1
      const response = await cronJobLogsCollection.findOneAndUpdate(
        { dealId: eStoreData.dealId },
        { $inc: { dealFolderCreationRetries: 1 } },
        { returnDocument: 'after' },
      );
      // stop the Deal Folder Cron Job after 10 retries
      // this is to prevent it from running forever
      if (response?.value?.dealFolderCreationRetries === 10) {
        // stop and delete the cron job - this to release the memory
        eStoreCronJobManager.deleteJob(`Deal${eStoreData.dealId}`);
        // update the record inside `cron-job-logs` collection
        await cronJobLogsCollection.updateOne(
          { dealId: eStoreData.dealId },
          { $set: { 'dealCronJob.status': ESTORE_CRON_STATUS.FAILED, 'dealCronJob.completionDate': new Date() } },
        );
      }
    }
  } catch (error) {
    console.error('Unable to create the deal folder', { error });
  }
};
