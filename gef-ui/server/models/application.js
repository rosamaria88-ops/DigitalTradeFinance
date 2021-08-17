import { decode } from 'html-entities';
import {
  getApplication,
  getCoverTerms,
  getEligibilityCriteria,
  getExporter,
  getFacilities,
  getUserDetails,
} from '../services/api';
import { status } from '../utils/helpers';
import { PROGRESS } from '../../constants';

export default class Application {
  static async findById(id, user, userToken) {
    try {
      const application = await getApplication(id);
      if (application.bankId !== user.bank.id) {
        return null;
      }

      application.id = id;

      const exporterPro = getExporter(application.exporterId);
      const coverTermsPro = getCoverTerms(application.coverTermsId);
      const facilitiesPro = getFacilities(id);
      const eligibilityCriteriaPro = getEligibilityCriteria();

      const all = await Promise.all([exporterPro, coverTermsPro, facilitiesPro, eligibilityCriteriaPro]);
      [application.exporter, application.coverTerms, application.facilities, application.ecs] = [...all];

      application.exporterStatus = status[application.exporter.status || PROGRESS.NOT_STARTED];
      application.coverStatus = status[application.coverTerms.status || PROGRESS.NOT_STARTED];
      application.facilitiesStatus = status[application.facilities.status || PROGRESS.NOT_STARTED];

      // Can only submit when all section statuses are set to complete
      // and the application is in Draft or CHANGES_REQUIRED
      application.canSubmit = application.exporterStatus.code === PROGRESS.COMPLETED
        && application.coverStatus.code === PROGRESS.COMPLETED
        && application.facilitiesStatus.code === PROGRESS.COMPLETED
        && ['Draft', 'CHANGES_REQUIRED'].includes(application.status)
        && user.roles.includes('maker');

      application.checkerCanSubmit = ['BANK_CHECK'].includes(application.status)
        && user._id !== application.userId // The checker is not the maker
        && user.roles.includes('checker');

      if (!['Draft'].includes(application.status)) {
        application.maker = await getUserDetails(application.userId, userToken);
      }
      if (application.checkerId) {
        application.checker = await getUserDetails(application.checkerId, userToken);
      }

      const termToEligibilityCriteria = {
        coverStart: 12,
        noticeDate: 13,
        facilityLimit: 14,
        exporterDeclaration: 15,
        dueDiligence: 16,
        facilityLetter: 17,
        facilityBaseCurrency: 18,
        facilityPaymentCurrency: 19,
      };

      application.eligibilityCriteria = application.ecs.terms.map((term) => ({
        id: termToEligibilityCriteria[term.id],
        description: decode(term.htmlText),
        descriptionList: [],
        answer: application.coverTerms.details[term.id],
      }));
      return application;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      throw err;
    }
  }
}