var DTFS_GEF;
!(function () {
  var e = new (function () {
    var e = document.getElementById('correspondence'),
      n = document.getElementById('conditional-correspondence'),
      c = function (e) {
        n.className = e ? 'govuk-visually-hidden' : '';
      };
    return e.checked ? c(!1) : c(!0), { toggle: c };
  })();
  document.querySelector('[data-cy="correspondence-yes"]').addEventListener('click', function () {
    e.toggle(!1);
  }),
    document.querySelector('[data-cy="correspondence-no"]').addEventListener('click', function () {
      e.toggle(!0);
    }),
    ((DTFS_GEF = void 0 === DTFS_GEF ? {} : DTFS_GEF).correspondenceAddress = {});
})();
//# sourceMappingURL=correspondenceAddress.js.map
