const { ShareServiceClient, StorageSharedKeyCredential } = require('@azure/storage-file-share');
const isPortReachable = require('is-port-reachable');

const AZURE_WORKFLOW_FILESHARE_CONFIG = {
  STORAGE_ACCOUNT: process.env.AZURE_WORKFLOW_STORAGE_ACCOUNT,
  STORAGE_ACCESS_KEY: process.env.AZURE_WORKFLOW_STORAGE_ACCESS_KEY,
  FILESHARE_NAME: process.env.AZURE_WORKFLOW_FILESHARE_NAME,
};

const fetchTest = async () => {
  const { STORAGE_ACCOUNT } = AZURE_WORKFLOW_FILESHARE_CONFIG;
  const url = `${STORAGE_ACCOUNT}.file.core.windows.net`;
  const port443 = await isPortReachable(443, { host: url });
  const port80 = await isPortReachable(80, { host: url });
  const port445 = await isPortReachable(445, { host: url });
  const port10101 = await isPortReachable(10101, { host: url });
  return {
    url, port80, port443, port445, port10101,
  };
};

const getCredentials = async () => {
  const {
    STORAGE_ACCOUNT, STORAGE_ACCESS_KEY,
  } = AZURE_WORKFLOW_FILESHARE_CONFIG;

  console.log({ STORAGE_ACCOUNT, STORAGE_ACCESS_KEY });
  const credentials = await new StorageSharedKeyCredential(STORAGE_ACCOUNT, STORAGE_ACCESS_KEY);

  // return credentials.computeHMACSHA256(stringToSign);
  return credentials;
};

const getShareClient = async () => {
  const credentials = await getCredentials();
  const { STORAGE_ACCOUNT, FILESHARE_NAME } = AZURE_WORKFLOW_FILESHARE_CONFIG;
  console.log({ STORAGE_ACCOUNT, FILESHARE_NAME });
  const serviceClient = new ShareServiceClient(
    `https://${STORAGE_ACCOUNT}.file.core.windows.net`,
    credentials,
  );

  /*
  if (process.env.AZURE_LOG_LEVEL) {
    console.log('get Share props');
    const shareProps = await serviceClient.getProperties();
    console.log({ shareProps });
  }
  */

  let i = 1;
  const shareList = serviceClient.listShares();
  console.log('LIST SHARES', { shareList });
  // eslint-disable-next-line no-restricted-syntax
  for await (const share of shareList) {
    // eslint-disable-next-line no-plusplus
    console.log(`\nSHARE ${i++}: ${share.name}`);
  }

  const shareClient = await serviceClient.getShareClient(FILESHARE_NAME);
  console.log('getShareClient', { shareClient });

  await shareClient.create().catch(({ details }) => {
    console.log({ details });
    if (!details) return;
    if (details.errorCode === 'ShareAlreadyExists') return;
    throw new Error(details.message);
  });

  return shareClient;
};

const getDirectory = async (folderPaths = 'fileshare_test') => {
  const shareClient = await getShareClient();

  const directoryClient = shareClient.getDirectoryClient(folderPaths);

  await directoryClient.create().catch(async ({ details }) => {
    console.log('getDirectoryClient', { details });
    if (!details) return false;
    if (details.errorCode === 'ResourceAlreadyExists') return false;
    if (details.errorCode === 'ParentNotFound') {
      const parentFolder = folderPaths.replace(/(\/[^/]*)\/?$/, ''); // remove last folder from string
      await getDirectory(parentFolder);
      return false;
    }

    return {
      errorCount: 1,
      error: {
        errorCode: details.errorCode,
        message: details.message,
      },
    };
  });
  return directoryClient;
};


const shareTest = async () => {
  const ports = await fetchTest();
  const shareDirectory = await getDirectory();
  console.log('test', { shareDirectory });
  const {
    accountName, name, path, url, shareName,
  } = shareDirectory;
  return {
    accountName,
    name,
    path,
    url,
    shareName,
    ports,
  };
};

module.exports = shareTest;
