const pageRenderer = require('../../../../component-tests/componentRenderer');

const page = '../templates/case/parties/_macros/parties-key-value-grid-row.njk';
const render = pageRenderer(page);

describe(page, () => {
  let wrapper;
  const params = {
    key: 'my key',
    value: 'my value',
    dataCy: 'datacy',
  };

  beforeEach(() => {
    wrapper = render(params);
  });

  it('should render key value pair', () => {
    wrapper.expectText(`[data-cy="${params.dataCy}"]`).toRead(params.value);
  });
});
