var DTFS_PORTAL;!function(){"use strict";var e={r:function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t);var n=document.getElementById("facilityValue"),r=document.getElementById("coveredPercentage"),o=document.getElementById("ukefExposure");function u(){var e,t=n.value.replace(/,/g,"")*(r.value/100);if(function(e){return!("number"!=typeof e||e!==Number(e)||!Number.isFinite(e))}(t)){var u;u=((e=t.toString().split(".")[1])?e.length:0)>2?function(e,t){var n=e,r=t;return t||(r=2),n*=Math.pow(10,r),n=Math.round(n),n/Math.pow(10,r)}(t,2):t;var i=u.toLocaleString("en",{minimumFractionDigits:2});o.value=i}}n&&r&&[n,r].forEach((function(e){e.addEventListener("blur",(function(){u()}))})),(DTFS_PORTAL=void 0===DTFS_PORTAL?{}:DTFS_PORTAL).ukefexposure=t}();
//# sourceMappingURL=ukefexposure.js.map