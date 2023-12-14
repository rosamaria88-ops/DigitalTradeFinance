/* eslint-disable no-underscore-dangle */
const componentRenderer = require('../../../component-tests/componentRenderer');

const component = '../templates/deals/_macros/deals-table-search-form.njk';

const render = componentRenderer(component);

describe(component, () => {
  let wrapper;
  const params = {};

  beforeEach(() => {
    wrapper = render(params);
  });

  it('should render search input', () => {
    wrapper.expectElement('[data-cy="search-input"]').toExist();
  });

  it('should render search submit button', () => {
    wrapper.expectElement('[data-cy="submit-button"]').toExist();
    wrapper.expectText('[data-cy="submit-button"]').toRead('Search deals');
  });
});
