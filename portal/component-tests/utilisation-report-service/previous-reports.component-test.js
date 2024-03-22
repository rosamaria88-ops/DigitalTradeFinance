const pageRenderer = require('../pageRenderer');

const page = 'utilisation-report-service/previous-reports/previous-reports.njk';
const render = pageRenderer(page);

describe(page, () => {
  let wrapper;
  const navItems = [{
    text: 2023,
    href: '?targetYear=2023',
    attributes: { 'data-cy': 'side-navigation-2023' },
    active: true,
  }, {
    text: 2022,
    href: '?targetYear=2022',
    attributes: { 'data-cy': 'side-navigation-2022' },
    active: false,
  }, {
    text: 2021,
    href: '?targetYear=2021',
    attributes: { 'data-cy': 'side-navigation-2021' },
    active: false,
  }, {
    text: 2020,
    href: '?targetYear=2020',
    attributes: { 'data-cy': 'side-navigation-2020' },
    active: false,
  }];

  const reportLinks = [{
    month: 'January',
    path: 'www.abc.com',
  }, {
    month: 'February',
    path: 'www.abc.com',
  }, {
    month: 'March',
    path: 'www.abc.com',
  }, {
    month: 'May',
    path: 'www.abc.com',
  }];

  const year = 2023;

  describe('with submitted reports', () => {
    beforeEach(() => {
      wrapper = render({ navItems, reportLinks, year });
    });

    it('should render side navigation bar', () => {
      wrapper.expectElement('[data-cy="container-side-navigation"]').toExist();
    });

    it('should render side navigation items', () => {
      wrapper.expectElement('[data-cy="side-navigation-2023"]').toExist();
      wrapper.expectElement('[data-cy="side-navigation-2022"]').toExist();
      wrapper.expectElement('[data-cy="side-navigation-2021"]').toExist();
      wrapper.expectElement('[data-cy="side-navigation-2020"]').toExist();
    });

    it('should render page heading', () => {
      wrapper.expectText('[data-cy="main-heading"]').toRead('2023 GEF reports');
    });

    it('should render paragraph', () => {
      wrapper.expectText('[data-cy="paragraph"]').toRead('Reports are downloaded as CSV files.');
    });

    it('should render month links', () => {
      wrapper.expectElement('[data-cy="list-item-link-January"]').toExist();
      wrapper.expectText('[data-cy="list-item-link-January"]').toRead('January 2023');
      wrapper.expectElement('[data-cy="list-item-link-February"]').toExist();
      wrapper.expectText('[data-cy="list-item-link-February"]').toRead('February 2023');
      wrapper.expectElement('[data-cy="list-item-link-March"]').toExist();
      wrapper.expectText('[data-cy="list-item-link-March"]').toRead('March 2023');
      wrapper.expectElement('[data-cy="list-item-link-May"]').toExist();
      wrapper.expectText('[data-cy="list-item-link-May"]').toRead('May 2023');
    });
  });

  describe('with no submitted reports for target year', () => {
    beforeEach(() => {
      wrapper = render({ navItems, reportLinks: [], year });
    });

    it('should render side navigation bar', () => {
      wrapper.expectElement('[data-cy="container-side-navigation"]').toExist();
    });

    it('should render side navigation items', () => {
      wrapper.expectElement('[data-cy="side-navigation-2023"]').toExist();
      wrapper.expectElement('[data-cy="side-navigation-2022"]').toExist();
      wrapper.expectElement('[data-cy="side-navigation-2021"]').toExist();
      wrapper.expectElement('[data-cy="side-navigation-2020"]').toExist();
    });

    it('should render page heading', () => {
      wrapper.expectText('[data-cy="main-heading"]').toRead('2023 GEF reports');
    });

    it('should render paragraph', () => {
      wrapper.expectText('[data-cy="paragraph"]').toRead('No reports have been submitted.');
    });
  });

  describe('with no submitted reports for any year', () => {
    beforeEach(() => {
      wrapper = render({ navItems: [], reportLinks: [], year });
    });

    it('should render page heading', () => {
      wrapper.expectText('[data-cy="main-heading"]').toRead('Previous GEF reports');
    });

    it('should render paragraph', () => {
      wrapper.expectText('[data-cy="paragraph"]').toRead('No reports have been submitted.');
    });
  });
});
