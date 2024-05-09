var DTFS_PORTAL;
!(function () {
  'use strict';
  var e = {
    d: function (t, n) {
      for (var r in n) e.o(n, r) && !e.o(t, r) && Object.defineProperty(t, r, { enumerable: !0, get: n[r] });
    },
  };
  (e.g = (function () {
    if ('object' == typeof globalThis) return globalThis;
    try {
      return this || new Function('return this')();
    } catch (e) {
      if ('object' == typeof window) return window;
    }
  })()),
    (e.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (e.r = function (e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    (function () {
      var t;
      e.g.importScripts && (t = e.g.location + '');
      var n = e.g.document;
      if (!t && n && (n.currentScript && (t = n.currentScript.src), !t)) {
        var r = n.getElementsByTagName('script');
        if (r.length) for (var c = r.length - 1; c > -1 && (!t || !/^http(s?):/.test(t)); ) t = r[c--].src;
      }
      if (!t) throw new Error('Automatic publicPath is not supported in this browser');
      (t = t
        .replace(/#.*$/, '')
        .replace(/\?.*$/, '')
        .replace(/\/[^\/]+$/, '/')),
        (e.p = t);
    })();
  var t = {};
  e.r(t),
    e.d(t, {
      default: function () {
        return f;
      },
    });
  e.p;
  var n = function (e) {
      return document.getElementById(e);
    },
    r = function (e, t) {
      var r = n(e);
      r.className = t ? '' : 'display-none';
    },
    c = function (e, t) {
      var r = n(e);
      t ? r.removeAttribute('hidden') : r.setAttribute('hidden', !0);
    };
  function i(e) {
    var t = document.getElementById('additional-form-fields');
    t.className = e ? '' : 'govuk-visually-hidden';
  }
  var a = document.querySelector('[data-cy="currency-same-as-supply-contract-currency-yes"]');
  a &&
    a.addEventListener('click', function () {
      i(!1);
    }),
    (a = document.querySelector('[data-cy="currency-same-as-supply-contract-currency-no"]')) &&
      a.addEventListener('click', function () {
        i(!0);
      }),
    (a = document.querySelector('[data-cy="autoCreatePassword-true"]')) &&
      document.querySelector('[data-cy="autoCreatePassword-true"]').addEventListener('click', function () {
        r('manuallyCreatePassword', !1);
      }),
    (a = document.querySelector('[data-cy="autoCreatePassword-false"]')) &&
      a.addEventListener('click', function () {
        r('manuallyCreatePassword', !0);
      }),
    (a = document.querySelector('[data-cy="supplyContractCurrency"]')) &&
      a.addEventListener('change', function (e) {
        r('supply-contract-currency-conversion-fields', 'GBP' !== e.target.value);
      }),
    (a = document.querySelector('[data-id="criteria-11-true')) &&
      a.addEventListener('click', function () {
        c('criterion-group-additional-11', !1);
      }),
    (a = document.querySelector('[data-id="criteria-11-false"]')) &&
      a.addEventListener('click', function () {
        c('criterion-group-additional-11', !0);
      }),
    (a = document.querySelector('[data-cy="legallyDistinct-true"]')) &&
      a.addEventListener('click', function () {
        r('additional-form-fields-indemnifier', !0);
      }),
    (a = document.querySelector('[data-cy="legallyDistinct-false"]')) &&
      a.addEventListener('click', function () {
        r('additional-form-fields-indemnifier', !1);
      }),
    (a = document.querySelector('[data-cy="indemnifierCorrespondenceAddressDifferent-true"]')) &&
      a.addEventListener('click', function () {
        r('additional-form-fields-indemnifier-correspondence-address', !0);
      }),
    (a = document.querySelector('[data-cy="indemnifierCorrespondenceAddressDifferent-false"]')) &&
      a.addEventListener('click', function () {
        r('additional-form-fields-indemnifier-correspondence-address', !1);
      }),
    (a = document.querySelector('[data-cy="supplier-correspondence-address-is-different-true"]')) &&
      a.addEventListener('click', function () {
        r('additional-form-fields-supplier-correspondence', !0);
      }),
    (a = document.querySelector('[data-cy="supplier-correspondence-address-is-different-false"]')) &&
      a.addEventListener('click', function () {
        r('additional-form-fields-supplier-correspondence', !1);
      });
  var o = document.querySelectorAll("input[type='file'][data-tag='govuk-file-upload']");
  o &&
    o.forEach(function (e) {
      e.addEventListener('change', function (e) {
        var t = e.target,
          n = t.id.concat('-file-upload-button-container');
        r(n, Boolean(t.value));
      });
    });
  var d = function (e, t) {
      var n = document.createElement('option');
      (n.value = t.value), (n.textContent = t.name), t.code === t.selectedValue && (n.selected = !0), e.appendChild(n);
    },
    u = function (e, t, n) {
      if (e) {
        var r = e.target.value,
          c = document.getElementById('industry-class'),
          i = (function (e, t) {
            return e.find(function (e) {
              return e.code === t;
            }).classes;
          })(t, r);
        (c.innerHTML = ''),
          d(c, { value: '', name: 'Select value' }),
          i.forEach(function (e) {
            d(c, { value: e.code, name: e.name, selectedValue: n });
          }),
          (c.selectedIndex = '0');
      }
    },
    l = document.querySelector('#industry-sector');
  if (l) {
    var s = l.getAttribute('data-industry-sectors');
    l.addEventListener('change', function (e) {
      u(e, JSON.parse(s));
    });
  }
  var f = {
    showHideElement: c,
    changeScreenVisibilityOfElement: r,
    isNumeric: function (e) {
      return !('number' != typeof e || e !== Number(e) || !Number.isFinite(e));
    },
    decimalsCount: function (e) {
      var t = e.toString().split('.')[1];
      return t ? t.length : 0;
    },
    roundNumber: function (e, t) {
      var n = e,
        r = t;
      return t || (r = 2), (n *= Math.pow(10, r)), (n = Math.round(n)), (n /= Math.pow(10, r));
    },
    changeIndustryClasses: u,
  };
  (DTFS_PORTAL = void 0 === DTFS_PORTAL ? {} : DTFS_PORTAL).main = t;
})();
//# sourceMappingURL=main.js.map
