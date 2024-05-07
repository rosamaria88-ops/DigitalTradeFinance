let DTFS_PORTAL;
void 0 !== MOJFrontend.FilterToggleButton &&
  new MOJFrontend.FilterToggleButton({
    bigModeMediaQuery: '(min-width: 48.063em)',
    startHidden: !0,
    toggleButton: {
      container: $('.moj-action-bar__filter'),
      showText: 'Show filter',
      hideText: 'Hide filter',
      classes: 'govuk-button--secondary',
      attributes: { 'data-cy': 'show-hide-filters-toggle-button' },
    },
    filter: { container: $('.moj-filter') },
  }),
  ((DTFS_PORTAL = void 0 === DTFS_PORTAL ? {} : DTFS_PORTAL).mojFilters = {});
// # sourceMappingURL=mojFilters.js.map
