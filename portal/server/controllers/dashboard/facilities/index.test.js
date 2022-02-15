import {
  getAllFacilitiesData,
  getTemplateVariables,
  getDataAndTemplateVariables,
  allFacilities,
} from '.';
import mockResponse from '../../../helpers/responseMock';
import { getFlashSuccessMessage } from '../../../helpers';
import api from '../../../api';
import { dashboardFacilitiesFiltersQuery } from './facilities-filters-query';
import {
  submittedFiltersArray,
  submittedFiltersObject,
} from '../filters/helpers';
import { facilitiesTemplateFilters as templateFilters } from './template-filters';
import { selectedFilters } from './selected-filters';
import CONSTANTS from '../../../constants';
import { sanitiseBody } from './sanitise-body';

jest.mock('../../../api', () => ({
  allFacilities: jest.fn(),
}));

const mockFacilities = [
  { _id: 'mockFacility' },
  { _id: 'mockFacility2' },
];

jest.mock('../../../helpers', () => ({
  __esModule: true,
  getApiData: jest.fn(() => ({
    count: 2,
    facilities: mockFacilities,
  })),
  getFlashSuccessMessage: jest.fn(),
  requestParams: jest.fn(() => ({ userToken: 'mock-token' })),
  isSuperUser: jest.fn((user) => {
    if (user.bank.id === '*') {
      return true;
    }

    return false;
  }),
  getUserRoles: jest.fn(() => ({ isMaker: true })),
}));

describe('controllers/dashboard/facilities', () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockReq = {
      params: { page: 1 },
      body: {},
      session: {
        dashboardFilters: CONSTANTS.DASHBOARD_FILTERS_DEFAULT,
        userToken: '1234',
        user: {
          _id: 'mock-user',
          roles: ['maker', 'checker'],
          bank: { id: '9' },
        },
      },
    };

    mockRes = mockResponse();
  });

  describe('getAllFacilitiesData', () => {
    it('should calls api.allFacilities with filters query', async () => {
      await getAllFacilitiesData(
        'mock-token',
        mockReq.session.user,
        mockReq.session.dashboardFilters,
        mockReq.params.page,
        mockRes,
      );

      expect(api.allFacilities).toBeCalledTimes(1);

      const filtersArray = submittedFiltersArray(mockReq.session.dashboardFilters);

      const expectedFilters = dashboardFacilitiesFiltersQuery(
        filtersArray,
        mockReq.session.user,
      );

      expect(api.allFacilities).toHaveBeenCalledWith(
        20,
        20,
        expectedFilters,
        'mock-token',
      );
    });

    it('should return an object', async () => {
      const result = await getAllFacilitiesData(
        'mock-token',
        mockReq.session.user,
        mockReq.session.dashboardFilters,
        mockReq.params.page,
        mockRes,
      );

      const filtersArray = submittedFiltersArray(mockReq.session.dashboardFilters);

      const expected = {
        facilities: mockFacilities,
        count: mockFacilities.length,
        filtersArray,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('getTemplateVariables', () => {
    it('should return an object', () => {
      const filtersArray = submittedFiltersArray(mockReq.session.dashboardFilters);

      const result = getTemplateVariables(
        mockReq.session.user,
        mockReq.session.dashboardFilters,
        mockFacilities,
        mockFacilities.length,
        mockReq.params.page,
        filtersArray,
      );

      const expectedPages = {
        totalPages: Math.ceil(mockFacilities.length / 20),
        currentPage: parseInt(mockReq.params.page, 10),
        totalItems: mockFacilities.length,
      };

      const expectedFiltersObj = submittedFiltersObject(filtersArray);

      const expected = {
        user: mockReq.session.user,
        primaryNav: 'home',
        tab: 'facilities',
        facilities: mockFacilities,
        pages: expectedPages,
        filters: templateFilters(expectedFiltersObj),
        selectedFilters: selectedFilters(expectedFiltersObj),
      };

      expect(result).toEqual(expected);
    });
  });

  describe('getDataAndTemplateVariables', () => {
    it('should return variables from getData and templateVariables functions', async () => {
      const result = await getDataAndTemplateVariables(
        'mock-token',
        mockReq.session.user,
        mockReq.session.dashboardFilters,
        mockReq.params.page,
        mockRes,
      );

      const filtersArray = submittedFiltersArray(mockReq.session.dashboardFilters);

      const expected = getTemplateVariables(
        mockReq.session.user,
        mockReq.session.dashboardFilters,
        mockFacilities,
        mockFacilities.length,
        mockReq.params.page,
        filtersArray,
      );

      expect(result).toEqual(expected);
    });
  });

  describe('allFacilities', () => {
    describe('when there is req.body', () => {
      it('should set req.session.dashboardFilters to provided values with sanitised body', async () => {
        mockReq = {
          ...mockReq,
          body: {
            fieldA: 'test',
          },
        };

        await allFacilities(mockReq, mockRes);

        const expected = sanitiseBody(mockReq.body);

        expect(mockReq.session.dashboardFilters).toEqual(expected);
      });
    });

    it('renders the correct template', async () => {
      await allFacilities(mockReq, mockRes);

      const expectedVariables = await getDataAndTemplateVariables(
        'mock-token',
        mockReq.session.user,
        mockReq.session.dashboardFilters,
        mockReq.params.page,
        mockRes,
      );

      expect(mockRes.render).toHaveBeenCalledWith('dashboard/facilities.njk', {
        ...expectedVariables,
        successMessage: getFlashSuccessMessage(mockReq),
      });
    });
  });
});
