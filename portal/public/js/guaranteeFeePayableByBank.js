var DTFS_PORTAL;
!(function () {
  var e = document.getElementById('riskMarginFee'),
    n = document.getElementById('interestMarginFee'),
    t = document.getElementById('guaranteeFeePayableByBank'),
    a = e || n;
  a &&
    a.addEventListener('blur', function () {
      var e;
      (e = (0.9 * a.value).toLocaleString('en', { minimumFractionDigits: 4 })), (t.value = e);
    }),
    ((DTFS_PORTAL = void 0 === DTFS_PORTAL ? {} : DTFS_PORTAL).guaranteeFeePayableByBank = {});
})();
//# sourceMappingURL=guaranteeFeePayableByBank.js.map
