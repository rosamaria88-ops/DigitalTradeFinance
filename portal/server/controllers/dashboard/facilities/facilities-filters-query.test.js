import { dashboardFacilitiesFiltersQuery } from './facilities-filters-query';
import CONSTANTS from '../../../constants';
import CONTENT_STRINGS from '../../../content-strings';
import keywordQuery from './facilities-filters-keyword-query';

describe('controllers/dashboard/facilities - filters query', () => {
  const mockUser = {
    _id: '123',
    roles: ['maker'],
    bank: { id: '9' },
  };

  it('should return deal.bank.id filter', () => {
    const mockFilters = [];

    const result = dashboardFacilitiesFiltersQuery(
      mockFilters,
      mockUser,
    );

    const expected = {
      $and: [
        { 'deal.bank.id': mockUser.bank.id },
      ],
    };

    expect(result).toEqual(expected);
  });

  it('should add multiple custom filters to the query', () => {
    const mockKeyword = 'test';
    const mockFilters = [
      {
        [CONSTANTS.FIELD_NAMES.FACILITY.TYPE]: [
          CONSTANTS.FACILITY_TYPE.CASH,
          CONSTANTS.FACILITY_TYPE.BOND,
        ],
      },
      {
        [CONSTANTS.FIELD_NAMES.FACILITY.HAS_BEEN_ISSUED]: [
          true,
        ],
      },
      {
        [CONTENT_STRINGS.DASHBOARD_FILTERS.BESPOKE_FIELD_NAMES.KEYWORD]: [
          mockKeyword,
        ],
      },
    ];

    const result = dashboardFacilitiesFiltersQuery(
      mockFilters,
      mockUser,
    );

    const expected = {
      $and: [
        { 'deal.bank.id': mockUser.bank.id },
      ],
      $or: [
        { [CONSTANTS.FIELD_NAMES.FACILITY.TYPE]: mockFilters[0].type[0] },
        { [CONSTANTS.FIELD_NAMES.FACILITY.TYPE]: mockFilters[0].type[1] },
        { [CONSTANTS.FIELD_NAMES.FACILITY.HAS_BEEN_ISSUED]: mockFilters[1].hasBeenIssued[0] },
        ...keywordQuery(mockKeyword),
      ],
    };

    expect(result).toEqual(expected);
  });
});