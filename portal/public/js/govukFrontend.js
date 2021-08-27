var DTFS;(DTFS=void 0===DTFS?{}:DTFS).govukFrontend=(()=>{var t={917:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>o});const o=(0,n(4).initAll)()},4:function(t,e,n){!function(t){"use strict";function e(t,e){if(window.NodeList.prototype.forEach)return t.forEach(e);for(var n=0;n<t.length;n++)e.call(window,t[n],n,t)}function o(t){this.$module=t,this.moduleId=t.getAttribute("id"),this.$sections=t.querySelectorAll(".govuk-accordion__section"),this.$openAllButton="",this.browserSupportsSessionStorage=i.checkForSessionStorage(),this.controlsClass="govuk-accordion__controls",this.openAllClass="govuk-accordion__open-all",this.iconClass="govuk-accordion__icon",this.sectionHeaderClass="govuk-accordion__section-header",this.sectionHeaderFocusedClass="govuk-accordion__section-header--focused",this.sectionHeadingClass="govuk-accordion__section-heading",this.sectionSummaryClass="govuk-accordion__section-summary",this.sectionButtonClass="govuk-accordion__section-button",this.sectionExpandedClass="govuk-accordion__section--expanded"}(function(t){var e,n,o,i;"defineProperty"in Object&&function(){try{return Object.defineProperty({},"test",{value:42}),!0}catch(t){return!1}}()||(e=Object.defineProperty,n=Object.prototype.hasOwnProperty("__defineGetter__"),o="Getters & setters cannot be defined on this javascript engine",i="A property cannot both have accessors and be writable or have a value",Object.defineProperty=function(t,r,s){if(e&&(t===window||t===document||t===Element.prototype||t instanceof Element))return e(t,r,s);if(null===t||!(t instanceof Object||"object"==typeof t))throw new TypeError("Object.defineProperty called on non-object");if(!(s instanceof Object))throw new TypeError("Property description must be an object");var a=String(r),c="value"in s||"writable"in s,l="get"in s&&typeof s.get,u="set"in s&&typeof s.set;if(l){if("function"!==l)throw new TypeError("Getter must be a function");if(!n)throw new TypeError(o);if(c)throw new TypeError(i);Object.__defineGetter__.call(t,a,s.get)}else t[a]=s.value;if(u){if("function"!==u)throw new TypeError("Setter must be a function");if(!n)throw new TypeError(o);if(c)throw new TypeError(i);Object.__defineSetter__.call(t,a,s.set)}return"value"in s&&(t[a]=s.value),t})}).call("object"==typeof window&&window||"object"==typeof self&&self||"object"==typeof n.g&&n.g||{}),function(t){"bind"in Function.prototype||Object.defineProperty(Function.prototype,"bind",{value:function(t){var e,n=Array,o=Object,i=o.prototype,r=n.prototype,s=function(){},a=i.toString,c="function"==typeof Symbol&&"symbol"==typeof Symbol.toStringTag,l=Function.prototype.toString,u=function(t){try{return l.call(t),!0}catch(t){return!1}},d="[object Function]",h="[object GeneratorFunction]";e=function(t){if("function"!=typeof t)return!1;if(c)return u(t);var e=a.call(t);return e===d||e===h};var p=r.slice,f=r.concat,b=r.push,m=Math.max,y=this;if(!e(y))throw new TypeError("Function.prototype.bind called on incompatible "+y);for(var v,g=p.call(arguments,1),w=function(){if(this instanceof v){var e=y.apply(this,f.call(g,p.call(arguments)));return o(e)===e?e:this}return y.apply(t,f.call(g,p.call(arguments)))},E=m(0,y.length-g.length),A=[],k=0;k<E;k++)b.call(A,"$"+k);return v=Function("binder","return function ("+A.join(",")+"){ return binder.apply(this, arguments); }")(w),y.prototype&&(s.prototype=y.prototype,v.prototype=new s,s.prototype=null),v}})}.call("object"==typeof window&&window||"object"==typeof self&&self||"object"==typeof n.g&&n.g||{}),function(t){var e,n,o;"DOMTokenList"in this&&(!("classList"in(e=document.createElement("x")))||!e.classList.toggle("x",!1)&&!e.className)||("DOMTokenList"in(n=this)&&n.DOMTokenList&&(!document.createElementNS||!document.createElementNS("http://www.w3.org/2000/svg","svg")||document.createElementNS("http://www.w3.org/2000/svg","svg").classList instanceof DOMTokenList)||(n.DOMTokenList=function(){var e=!0,n=function(t,n,o,i){Object.defineProperty?Object.defineProperty(t,n,{configurable:!1===e||!!i,get:o}):t.__defineGetter__(n,o)};try{n({},"support")}catch(t){e=!1}return function(e,o){var i=this,r=[],s={},a=0,c=0,l=function(t){n(i,t,(function(){return d(),r[t]}),!1)},u=function(){if(a>=c)for(;c<a;++c)l(c)},d=function(){var t,n,i=arguments,c=/\s+/;if(i.length)for(n=0;n<i.length;++n)if(c.test(i[n]))throw(t=new SyntaxError('String "'+i[n]+'" contains an invalid character')).code=5,t.name="InvalidCharacterError",t;for(""===(r="object"==typeof e[o]?(""+e[o].baseVal).replace(/^\s+|\s+$/g,"").split(c):(""+e[o]).replace(/^\s+|\s+$/g,"").split(c))[0]&&(r=[]),s={},n=0;n<r.length;++n)s[r[n]]=!0;a=r.length,u()};return d(),n(i,"length",(function(){return d(),a})),i.toLocaleString=i.toString=function(){return d(),r.join(" ")},i.item=function(t){return d(),r[t]},i.contains=function(t){return d(),!!s[t]},i.add=function(){d.apply(i,t=arguments);for(var t,n,c=0,l=t.length;c<l;++c)n=t[c],s[n]||(r.push(n),s[n]=!0);a!==r.length&&(a=r.length>>>0,"object"==typeof e[o]?e[o].baseVal=r.join(" "):e[o]=r.join(" "),u())},i.remove=function(){d.apply(i,t=arguments);for(var t,n={},c=0,l=[];c<t.length;++c)n[t[c]]=!0,delete s[t[c]];for(c=0;c<r.length;++c)n[r[c]]||l.push(r[c]);r=l,a=l.length>>>0,"object"==typeof e[o]?e[o].baseVal=r.join(" "):e[o]=r.join(" "),u()},i.toggle=function(e,n){return d.apply(i,[e]),t!==n?n?(i.add(e),!0):(i.remove(e),!1):s[e]?(i.remove(e),!1):(i.add(e),!0)},i}}()),"classList"in(o=document.createElement("span"))&&(o.classList.toggle("x",!1),o.classList.contains("x")&&(o.classList.constructor.prototype.toggle=function(e){var n=arguments[1];if(n===t){var o=!this.contains(e);return this[o?"add":"remove"](e),o}return this[(n=!!n)?"add":"remove"](e),n})),function(){var t=document.createElement("span");if("classList"in t&&(t.classList.add("a","b"),!t.classList.contains("b"))){var e=t.classList.constructor.prototype.add;t.classList.constructor.prototype.add=function(){for(var t=arguments,n=arguments.length,o=0;o<n;o++)e.call(this,t[o])}}}(),function(){var t=document.createElement("span");if("classList"in t&&(t.classList.add("a"),t.classList.add("b"),t.classList.remove("a","b"),t.classList.contains("b"))){var e=t.classList.constructor.prototype.remove;t.classList.constructor.prototype.remove=function(){for(var t=arguments,n=arguments.length,o=0;o<n;o++)e.call(this,t[o])}}}())}.call("object"==typeof window&&window||"object"==typeof self&&self||"object"==typeof n.g&&n.g||{}),function(t){"Document"in this||"undefined"==typeof WorkerGlobalScope&&"function"!=typeof importScripts&&(this.HTMLDocument?this.Document=this.HTMLDocument:(this.Document=this.HTMLDocument=document.constructor=new Function("return function Document() {}")(),this.Document.prototype=document))}.call("object"==typeof window&&window||"object"==typeof self&&self||"object"==typeof n.g&&n.g||{}),function(t){"Element"in this&&"HTMLElement"in this||function(){if(!window.Element||window.HTMLElement){window.Element=window.HTMLElement=new Function("return function Element() {}")();var t,e=document.appendChild(document.createElement("body")),n=e.appendChild(document.createElement("iframe")).contentWindow.document,o=Element.prototype=n.appendChild(n.createElement("*")),i={},r=function(t,e){var n,o,s,a=t.childNodes||[],c=-1;if(1===t.nodeType&&t.constructor!==Element)for(n in t.constructor=Element,i)o=i[n],t[n]=o;for(;s=e&&a[++c];)r(s,e);return t},s=document.getElementsByTagName("*"),a=document.createElement,c=100;o.attachEvent("onpropertychange",(function(t){for(var e,n=t.propertyName,r=!i.hasOwnProperty(n),a=o[n],c=i[n],l=-1;e=s[++l];)1===e.nodeType&&(r||e[n]===c)&&(e[n]=a);i[n]=a})),o.constructor=Element,o.hasAttribute||(o.hasAttribute=function(t){return null!==this.getAttribute(t)}),l()||(document.onreadystatechange=l,t=setInterval(l,25)),document.createElement=function(t){var e=a(String(t).toLowerCase());return r(e)},document.removeChild(e)}else window.HTMLElement=window.Element;function l(){return c--||clearTimeout(t),!(!document.body||document.body.prototype||!/(complete|interactive)/.test(document.readyState)||(r(document,!0),t&&document.body.prototype&&clearTimeout(t),!document.body.prototype))}}()}.call("object"==typeof window&&window||"object"==typeof self&&self||"object"==typeof n.g&&n.g||{}),function(t){var e;"document"in this&&"classList"in document.documentElement&&"Element"in this&&"classList"in Element.prototype&&((e=document.createElement("span")).classList.add("a","b"),e.classList.contains("b"))||function(t){var e=!0,n=function(t,n,o,i){Object.defineProperty?Object.defineProperty(t,n,{configurable:!1===e||!!i,get:o}):t.__defineGetter__(n,o)};try{n({},"support")}catch(t){e=!1}var o=function(t,i,r){n(t.prototype,i,(function(){var t,s=this,a="__defineGetter__DEFINE_PROPERTY"+i;if(s[a])return t;if(s[a]=!0,!1===e){for(var c,l=o.mirror||document.createElement("div"),u=l.childNodes,d=u.length,h=0;h<d;++h)if(u[h]._R===s){c=u[h];break}c||(c=l.appendChild(document.createElement("div"))),t=DOMTokenList.call(c,s,r)}else t=new DOMTokenList(s,r);return n(s,i,(function(){return t})),delete s[a],t}),!0)};o(t.Element,"classList","className"),o(t.HTMLElement,"classList","className"),o(t.HTMLLinkElement,"relList","rel"),o(t.HTMLAnchorElement,"relList","rel"),o(t.HTMLAreaElement,"relList","rel")}(this)}.call("object"==typeof window&&window||"object"==typeof self&&self||"object"==typeof n.g&&n.g||{}),o.prototype.init=function(){if(this.$module){this.initControls(),this.initSectionHeaders();var t=this.checkIfAllSectionsOpen();this.updateOpenAllButton(t)}},o.prototype.initControls=function(){this.$openAllButton=document.createElement("button"),this.$openAllButton.setAttribute("type","button"),this.$openAllButton.innerHTML='Open all <span class="govuk-visually-hidden">sections</span>',this.$openAllButton.setAttribute("class",this.openAllClass),this.$openAllButton.setAttribute("aria-expanded","false"),this.$openAllButton.setAttribute("type","button");var t=document.createElement("div");t.setAttribute("class",this.controlsClass),t.appendChild(this.$openAllButton),this.$module.insertBefore(t,this.$module.firstChild),this.$openAllButton.addEventListener("click",this.onOpenOrCloseAllToggle.bind(this))},o.prototype.initSectionHeaders=function(){e(this.$sections,function(t,e){var n=t.querySelector("."+this.sectionHeaderClass);this.initHeaderAttributes(n,e),this.setExpanded(this.isExpanded(t),t),n.addEventListener("click",this.onSectionToggle.bind(this,t)),this.setInitialState(t)}.bind(this))},o.prototype.initHeaderAttributes=function(t,e){var n=this,o=t.querySelector("."+this.sectionButtonClass),i=t.querySelector("."+this.sectionHeadingClass),r=t.querySelector("."+this.sectionSummaryClass),s=document.createElement("button");s.setAttribute("type","button"),s.setAttribute("id",this.moduleId+"-heading-"+(e+1)),s.setAttribute("aria-controls",this.moduleId+"-content-"+(e+1));for(var a=0;a<o.attributes.length;a++){var c=o.attributes.item(a);s.setAttribute(c.nodeName,c.nodeValue)}s.addEventListener("focusin",(function(e){t.classList.contains(n.sectionHeaderFocusedClass)||(t.className+=" "+n.sectionHeaderFocusedClass)})),s.addEventListener("blur",(function(e){t.classList.remove(n.sectionHeaderFocusedClass)})),null!=r&&s.setAttribute("aria-describedby",this.moduleId+"-summary-"+(e+1)),s.innerHTML=o.innerHTML,i.removeChild(o),i.appendChild(s);var l=document.createElement("span");l.className=this.iconClass,l.setAttribute("aria-hidden","true"),s.appendChild(l)},o.prototype.onSectionToggle=function(t){var e=this.isExpanded(t);this.setExpanded(!e,t),this.storeState(t)},o.prototype.onOpenOrCloseAllToggle=function(){var t=this,n=this.$sections,o=!this.checkIfAllSectionsOpen();e(n,(function(e){t.setExpanded(o,e),t.storeState(e)})),t.updateOpenAllButton(o)},o.prototype.setExpanded=function(t,e){e.querySelector("."+this.sectionButtonClass).setAttribute("aria-expanded",t),t?e.classList.add(this.sectionExpandedClass):e.classList.remove(this.sectionExpandedClass);var n=this.checkIfAllSectionsOpen();this.updateOpenAllButton(n)},o.prototype.isExpanded=function(t){return t.classList.contains(this.sectionExpandedClass)},o.prototype.checkIfAllSectionsOpen=function(){return this.$sections.length===this.$module.querySelectorAll("."+this.sectionExpandedClass).length},o.prototype.updateOpenAllButton=function(t){var e=t?"Close all":"Open all";e+='<span class="govuk-visually-hidden"> sections</span>',this.$openAllButton.setAttribute("aria-expanded",t),this.$openAllButton.innerHTML=e};var i={checkForSessionStorage:function(){var t,e="this is the test string";try{return window.sessionStorage.setItem(e,e),t=window.sessionStorage.getItem(e)===e.toString(),window.sessionStorage.removeItem(e),t}catch(t){"undefined"!=typeof console&&void 0!==console.log||console.log("Notice: sessionStorage not available.")}}};o.prototype.storeState=function(t){if(this.browserSupportsSessionStorage){var e=t.querySelector("."+this.sectionButtonClass);if(e){var n=e.getAttribute("aria-controls"),o=e.getAttribute("aria-expanded");void 0!==n||"undefined"!=typeof console&&void 0!==console.log||console.error(new Error("No aria controls present in accordion section heading.")),void 0!==o||"undefined"!=typeof console&&void 0!==console.log||console.error(new Error("No aria expanded present in accordion section heading.")),n&&o&&window.sessionStorage.setItem(n,o)}}},o.prototype.setInitialState=function(t){if(this.browserSupportsSessionStorage){var e=t.querySelector("."+this.sectionButtonClass);if(e){var n=e.getAttribute("aria-controls"),o=n?window.sessionStorage.getItem(n):null;null!==o&&this.setExpanded("true"===o,t)}}},function(t){"Window"in this||"undefined"==typeof WorkerGlobalScope&&"function"!=typeof importScripts&&function(t){t.constructor?t.Window=t.constructor:(t.Window=t.constructor=new Function("return function Window() {}")()).prototype=this}(this)}.call("object"==typeof window&&window||"object"==typeof self&&self||"object"==typeof n.g&&n.g||{}),function(t){(function(t){if(!("Event"in t))return!1;if("function"==typeof t.Event)return!0;try{return new Event("click"),!0}catch(t){return!1}})(this)||function(){var e={click:1,dblclick:1,keyup:1,keypress:1,keydown:1,mousedown:1,mouseup:1,mousemove:1,mouseover:1,mouseenter:1,mouseleave:1,mouseout:1,storage:1,storagecommit:1,textinput:1};if("undefined"!=typeof document&&"undefined"!=typeof window){var n=window.Event&&window.Event.prototype||null;window.Event=Window.prototype.Event=function(e,n){if(!e)throw new Error("Not enough arguments");var o;if("createEvent"in document){o=document.createEvent("Event");var i=!(!n||n.bubbles===t)&&n.bubbles,r=!(!n||n.cancelable===t)&&n.cancelable;return o.initEvent(e,i,r),o}return(o=document.createEventObject()).type=e,o.bubbles=!(!n||n.bubbles===t)&&n.bubbles,o.cancelable=!(!n||n.cancelable===t)&&n.cancelable,o},n&&Object.defineProperty(window.Event,"prototype",{configurable:!1,enumerable:!1,writable:!0,value:n}),"createEvent"in document||(window.addEventListener=Window.prototype.addEventListener=Document.prototype.addEventListener=Element.prototype.addEventListener=function(){var t=this,n=arguments[0],i=arguments[1];if(t===window&&n in e)throw new Error("In IE8 the event: "+n+" is not available on the window object. Please see https://github.com/Financial-Times/polyfill-service/issues/317 for more information.");t._events||(t._events={}),t._events[n]||(t._events[n]=function(e){var n,i=t._events[e.type].list,r=i.slice(),s=-1,a=r.length;for(e.preventDefault=function(){!1!==e.cancelable&&(e.returnValue=!1)},e.stopPropagation=function(){e.cancelBubble=!0},e.stopImmediatePropagation=function(){e.cancelBubble=!0,e.cancelImmediate=!0},e.currentTarget=t,e.relatedTarget=e.fromElement||null,e.target=e.target||e.srcElement||t,e.timeStamp=(new Date).getTime(),e.clientX&&(e.pageX=e.clientX+document.documentElement.scrollLeft,e.pageY=e.clientY+document.documentElement.scrollTop);++s<a&&!e.cancelImmediate;)s in r&&-1!==o(i,n=r[s])&&"function"==typeof n&&n.call(t,e)},t._events[n].list=[],t.attachEvent&&t.attachEvent("on"+n,t._events[n])),t._events[n].list.push(i)},window.removeEventListener=Window.prototype.removeEventListener=Document.prototype.removeEventListener=Element.prototype.removeEventListener=function(){var t,e=this,n=arguments[0],i=arguments[1];e._events&&e._events[n]&&e._events[n].list&&-1!==(t=o(e._events[n].list,i))&&(e._events[n].list.splice(t,1),e._events[n].list.length||(e.detachEvent&&e.detachEvent("on"+n,e._events[n]),delete e._events[n]))},window.dispatchEvent=Window.prototype.dispatchEvent=Document.prototype.dispatchEvent=Element.prototype.dispatchEvent=function(t){if(!arguments.length)throw new Error("Not enough arguments");if(!t||"string"!=typeof t.type)throw new Error("DOM Events Exception 0");var e=this,n=t.type;try{if(!t.bubbles){t.cancelBubble=!0;var o=function(t){t.cancelBubble=!0,(e||window).detachEvent("on"+n,o)};this.attachEvent("on"+n,o)}this.fireEvent("on"+n,t)}catch(o){t.target=e;do{t.currentTarget=e,"_events"in e&&"function"==typeof e._events[n]&&e._events[n].call(e,t),"function"==typeof e["on"+n]&&e["on"+n].call(e,t),e=9===e.nodeType?e.parentWindow:e.parentNode}while(e&&!t.cancelBubble)}return!0},document.attachEvent("onreadystatechange",(function(){"complete"===document.readyState&&document.dispatchEvent(new Event("DOMContentLoaded",{bubbles:!0}))})))}function o(t,e){for(var n=-1,o=t.length;++n<o;)if(n in t&&t[n]===e)return n;return-1}}()}.call("object"==typeof window&&window||"object"==typeof self&&self||"object"==typeof n.g&&n.g||{});function r(t){this.$module=t,this.debounceFormSubmitTimer=null}r.prototype.handleKeyDown=function(t){var e=t.target;"button"===e.getAttribute("role")&&32===t.keyCode&&(t.preventDefault(),e.click())},r.prototype.debounce=function(t){if("true"===t.target.getAttribute("data-prevent-double-click"))return this.debounceFormSubmitTimer?(t.preventDefault(),!1):void(this.debounceFormSubmitTimer=setTimeout(function(){this.debounceFormSubmitTimer=null}.bind(this),1e3))},r.prototype.init=function(){this.$module.addEventListener("keydown",this.handleKeyDown),this.$module.addEventListener("click",this.debounce)};function s(t){this.$module=t}function a(t){this.$module=t,this.$textarea=t.querySelector(".govuk-js-character-count"),this.$textarea&&(this.$countMessage=t.querySelector('[id="'+this.$textarea.id+'-info"]'))}function c(t){this.$module=t,this.$inputs=t.querySelectorAll('input[type="checkbox"]')}function l(t){this.$module=t}function u(t){this.$module=t}function d(t){this.$module=t,this.$menuButton=t&&t.querySelector(".govuk-js-header-toggle"),this.$menu=this.$menuButton&&t.querySelector("#"+this.$menuButton.getAttribute("aria-controls"))}function h(t){this.$module=t,this.$inputs=t.querySelectorAll('input[type="radio"]')}function p(t){this.$module=t,this.$tabs=t.querySelectorAll(".govuk-tabs__tab"),this.keys={left:37,right:39,up:38,down:40},this.jsHiddenClass="govuk-tabs__panel--hidden"}s.prototype.init=function(){this.$module&&("boolean"==typeof this.$module.open||this.polyfillDetails())},s.prototype.polyfillDetails=function(){var t,e=this.$module,n=this.$summary=e.getElementsByTagName("summary").item(0),o=this.$content=e.getElementsByTagName("div").item(0);n&&o&&(o.id||(o.id="details-content-"+(t=(new Date).getTime(),void 0!==window.performance&&"function"==typeof window.performance.now&&(t+=window.performance.now()),"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){var n=(t+16*Math.random())%16|0;return t=Math.floor(t/16),("x"===e?n:3&n|8).toString(16)})))),e.setAttribute("role","group"),n.setAttribute("role","button"),n.setAttribute("aria-controls",o.id),n.tabIndex=0,1==(null!==e.getAttribute("open"))?(n.setAttribute("aria-expanded","true"),o.setAttribute("aria-hidden","false")):(n.setAttribute("aria-expanded","false"),o.setAttribute("aria-hidden","true"),o.style.display="none"),this.polyfillHandleInputs(n,this.polyfillSetAttributes.bind(this)))},s.prototype.polyfillSetAttributes=function(){var t=this.$module,e=this.$summary,n=this.$content,o="true"===e.getAttribute("aria-expanded"),i="true"===n.getAttribute("aria-hidden");return e.setAttribute("aria-expanded",o?"false":"true"),n.setAttribute("aria-hidden",i?"false":"true"),n.style.display=o?"none":"",null!==t.getAttribute("open")?t.removeAttribute("open"):t.setAttribute("open","open"),!0},s.prototype.polyfillHandleInputs=function(t,e){t.addEventListener("keypress",(function(t){var n=t.target;13!==t.keyCode&&32!==t.keyCode||"summary"===n.nodeName.toLowerCase()&&(t.preventDefault(),n.click?n.click():e(t))})),t.addEventListener("keyup",(function(t){var e=t.target;32===t.keyCode&&"summary"===e.nodeName.toLowerCase()&&t.preventDefault()})),t.addEventListener("click",e)},a.prototype.defaults={characterCountAttribute:"data-maxlength",wordCountAttribute:"data-maxwords"},a.prototype.init=function(){var t=this.$module,e=this.$textarea,n=this.$countMessage;if(e&&n){e.insertAdjacentElement("afterend",n),this.options=this.getDataset(t);var o=this.defaults.characterCountAttribute;this.options.maxwords&&(o=this.defaults.wordCountAttribute),this.maxLength=t.getAttribute(o),this.maxLength&&(t.removeAttribute("maxlength"),"onpageshow"in window?window.addEventListener("pageshow",this.sync.bind(this)):window.addEventListener("DOMContentLoaded",this.sync.bind(this)),this.sync())}},a.prototype.sync=function(){this.bindChangeEvents(),this.updateCountMessage()},a.prototype.getDataset=function(t){var e={},n=t.attributes;if(n)for(var o=0;o<n.length;o++){var i=n[o],r=i.name.match(/^data-(.+)/);r&&(e[r[1]]=i.value)}return e},a.prototype.count=function(t){return this.options.maxwords?(t.match(/\S+/g)||[]).length:t.length},a.prototype.bindChangeEvents=function(){var t=this.$textarea;t.addEventListener("keyup",this.checkIfValueChanged.bind(this)),t.addEventListener("focus",this.handleFocus.bind(this)),t.addEventListener("blur",this.handleBlur.bind(this))},a.prototype.checkIfValueChanged=function(){this.$textarea.oldValue||(this.$textarea.oldValue=""),this.$textarea.value!==this.$textarea.oldValue&&(this.$textarea.oldValue=this.$textarea.value,this.updateCountMessage())},a.prototype.updateCountMessage=function(){var t=this.$textarea,e=this.options,n=this.$countMessage,o=this.count(t.value),i=this.maxLength,r=i-o;i*(e.threshold?e.threshold:0)/100>o?(n.classList.add("govuk-character-count__message--disabled"),n.setAttribute("aria-hidden",!0)):(n.classList.remove("govuk-character-count__message--disabled"),n.removeAttribute("aria-hidden")),r<0?(t.classList.add("govuk-textarea--error"),n.classList.remove("govuk-hint"),n.classList.add("govuk-error-message")):(t.classList.remove("govuk-textarea--error"),n.classList.remove("govuk-error-message"),n.classList.add("govuk-hint"));var s,a,c="character";e.maxwords&&(c="word"),c+=-1===r||1===r?"":"s",s=r<0?"too many":"remaining",a=Math.abs(r),n.innerHTML="You have "+a+" "+c+" "+s},a.prototype.handleFocus=function(){this.valueChecker=setInterval(this.checkIfValueChanged.bind(this),1e3)},a.prototype.handleBlur=function(){clearInterval(this.valueChecker)},c.prototype.init=function(){var t=this.$module;e(this.$inputs,(function(e){var n=e.getAttribute("data-aria-controls");n&&t.querySelector("#"+n)&&(e.setAttribute("aria-controls",n),e.removeAttribute("data-aria-controls"))})),"onpageshow"in window?window.addEventListener("pageshow",this.syncAllConditionalReveals.bind(this)):window.addEventListener("DOMContentLoaded",this.syncAllConditionalReveals.bind(this)),this.syncAllConditionalReveals(),t.addEventListener("click",this.handleClick.bind(this))},c.prototype.syncAllConditionalReveals=function(){e(this.$inputs,this.syncConditionalRevealWithInputState.bind(this))},c.prototype.syncConditionalRevealWithInputState=function(t){var e=this.$module.querySelector("#"+t.getAttribute("aria-controls"));if(e&&e.classList.contains("govuk-checkboxes__conditional")){var n=t.checked;t.setAttribute("aria-expanded",n),e.classList.toggle("govuk-checkboxes__conditional--hidden",!n)}},c.prototype.unCheckAllInputsExcept=function(t){e(document.querySelectorAll('input[type="checkbox"][name="'+t.name+'"]'),(function(e){t.form===e.form&&e!==t&&(e.checked=!1)})),this.syncAllConditionalReveals()},c.prototype.unCheckExclusiveInputs=function(t){e(document.querySelectorAll('input[data-behaviour="exclusive"][type="checkbox"][name="'+t.name+'"]'),(function(e){t.form===e.form&&(e.checked=!1)})),this.syncAllConditionalReveals()},c.prototype.handleClick=function(t){var e=t.target;"checkbox"===e.type&&(e.getAttribute("aria-controls")&&this.syncConditionalRevealWithInputState(e),e.checked&&("exclusive"===e.getAttribute("data-behaviour")?this.unCheckAllInputsExcept(e):this.unCheckExclusiveInputs(e)))},function(t){"document"in this&&"matches"in document.documentElement||(Element.prototype.matches=Element.prototype.webkitMatchesSelector||Element.prototype.oMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.mozMatchesSelector||function(t){for(var e=this,n=(e.document||e.ownerDocument).querySelectorAll(t),o=0;n[o]&&n[o]!==e;)++o;return!!n[o]})}.call("object"==typeof window&&window||"object"==typeof self&&self||"object"==typeof n.g&&n.g||{}),function(t){"document"in this&&"closest"in document.documentElement||(Element.prototype.closest=function(t){for(var e=this;e;){if(e.matches(t))return e;e="SVGElement"in window&&e instanceof SVGElement?e.parentNode:e.parentElement}return null})}.call("object"==typeof window&&window||"object"==typeof self&&self||"object"==typeof n.g&&n.g||{}),l.prototype.init=function(){var t=this.$module;t&&(t.focus(),t.addEventListener("click",this.handleClick.bind(this)))},l.prototype.handleClick=function(t){var e=t.target;this.focusTarget(e)&&t.preventDefault()},l.prototype.focusTarget=function(t){if("A"!==t.tagName||!1===t.href)return!1;var e=this.getFragmentFromUrl(t.href),n=document.getElementById(e);if(!n)return!1;var o=this.getAssociatedLegendOrLabel(n);return!!o&&(o.scrollIntoView(),n.focus({preventScroll:!0}),!0)},l.prototype.getFragmentFromUrl=function(t){return-1!==t.indexOf("#")&&t.split("#").pop()},l.prototype.getAssociatedLegendOrLabel=function(t){var e=t.closest("fieldset");if(e){var n=e.getElementsByTagName("legend");if(n.length){var o=n[0];if("checkbox"===t.type||"radio"===t.type)return o;var i=o.getBoundingClientRect().top,r=t.getBoundingClientRect();if(r.height&&window.innerHeight&&r.top+r.height-i<window.innerHeight/2)return o}}return document.querySelector("label[for='"+t.getAttribute("id")+"']")||t.closest("label")},u.prototype.init=function(){this.$module&&this.setFocus()},u.prototype.setFocus=function(){var t=this.$module;"true"!==t.getAttribute("data-disable-auto-focus")&&"alert"===t.getAttribute("role")&&(t.getAttribute("tabindex")||(t.setAttribute("tabindex","-1"),t.addEventListener("blur",(function(){t.removeAttribute("tabindex")}))),t.focus())},d.prototype.init=function(){this.$module&&this.$menuButton&&this.$menu&&(this.syncState(this.$menu.classList.contains("govuk-header__navigation--open")),this.$menuButton.addEventListener("click",this.handleMenuButtonClick.bind(this)))},d.prototype.syncState=function(t){this.$menuButton.classList.toggle("govuk-header__menu-button--open",t),this.$menuButton.setAttribute("aria-expanded",t)},d.prototype.handleMenuButtonClick=function(){var t=this.$menu.classList.toggle("govuk-header__navigation--open");this.syncState(t)},h.prototype.init=function(){var t=this.$module;e(this.$inputs,(function(e){var n=e.getAttribute("data-aria-controls");n&&t.querySelector("#"+n)&&(e.setAttribute("aria-controls",n),e.removeAttribute("data-aria-controls"))})),"onpageshow"in window?window.addEventListener("pageshow",this.syncAllConditionalReveals.bind(this)):window.addEventListener("DOMContentLoaded",this.syncAllConditionalReveals.bind(this)),this.syncAllConditionalReveals(),t.addEventListener("click",this.handleClick.bind(this))},h.prototype.syncAllConditionalReveals=function(){e(this.$inputs,this.syncConditionalRevealWithInputState.bind(this))},h.prototype.syncConditionalRevealWithInputState=function(t){var e=document.querySelector("#"+t.getAttribute("aria-controls"));if(e&&e.classList.contains("govuk-radios__conditional")){var n=t.checked;t.setAttribute("aria-expanded",n),e.classList.toggle("govuk-radios__conditional--hidden",!n)}},h.prototype.handleClick=function(t){var n=t.target;"radio"===n.type&&e(document.querySelectorAll('input[type="radio"][aria-controls]'),function(t){var e=t.form===n.form;t.name===n.name&&e&&this.syncConditionalRevealWithInputState(t)}.bind(this))},function(t){"document"in this&&"nextElementSibling"in document.documentElement||Object.defineProperty(Element.prototype,"nextElementSibling",{get:function(){for(var t=this.nextSibling;t&&1!==t.nodeType;)t=t.nextSibling;return t}})}.call("object"==typeof window&&window||"object"==typeof self&&self||"object"==typeof n.g&&n.g||{}),function(t){"document"in this&&"previousElementSibling"in document.documentElement||Object.defineProperty(Element.prototype,"previousElementSibling",{get:function(){for(var t=this.previousSibling;t&&1!==t.nodeType;)t=t.previousSibling;return t}})}.call("object"==typeof window&&window||"object"==typeof self&&self||"object"==typeof n.g&&n.g||{}),p.prototype.init=function(){"function"==typeof window.matchMedia?this.setupResponsiveChecks():this.setup()},p.prototype.setupResponsiveChecks=function(){this.mql=window.matchMedia("(min-width: 40.0625em)"),this.mql.addListener(this.checkMode.bind(this)),this.checkMode()},p.prototype.checkMode=function(){this.mql.matches?this.setup():this.teardown()},p.prototype.setup=function(){var t=this.$module,n=this.$tabs,o=t.querySelector(".govuk-tabs__list"),i=t.querySelectorAll(".govuk-tabs__list-item");if(n&&o&&i){o.setAttribute("role","tablist"),e(i,(function(t){t.setAttribute("role","presentation")})),e(n,function(t){this.setAttributes(t),t.boundTabClick=this.onTabClick.bind(this),t.boundTabKeydown=this.onTabKeydown.bind(this),t.addEventListener("click",t.boundTabClick,!0),t.addEventListener("keydown",t.boundTabKeydown,!0),this.hideTab(t)}.bind(this));var r=this.getTab(window.location.hash)||this.$tabs[0];this.showTab(r),t.boundOnHashChange=this.onHashChange.bind(this),window.addEventListener("hashchange",t.boundOnHashChange,!0)}},p.prototype.teardown=function(){var t=this.$module,n=this.$tabs,o=t.querySelector(".govuk-tabs__list"),i=t.querySelectorAll(".govuk-tabs__list-item");n&&o&&i&&(o.removeAttribute("role"),e(i,(function(t){t.removeAttribute("role","presentation")})),e(n,function(t){t.removeEventListener("click",t.boundTabClick,!0),t.removeEventListener("keydown",t.boundTabKeydown,!0),this.unsetAttributes(t)}.bind(this)),window.removeEventListener("hashchange",t.boundOnHashChange,!0))},p.prototype.onHashChange=function(t){var e=window.location.hash,n=this.getTab(e);if(n)if(this.changingHash)this.changingHash=!1;else{var o=this.getCurrentTab();this.hideTab(o),this.showTab(n),n.focus()}},p.prototype.hideTab=function(t){this.unhighlightTab(t),this.hidePanel(t)},p.prototype.showTab=function(t){this.highlightTab(t),this.showPanel(t)},p.prototype.getTab=function(t){return this.$module.querySelector('.govuk-tabs__tab[href="'+t+'"]')},p.prototype.setAttributes=function(t){var e=this.getHref(t).slice(1);t.setAttribute("id","tab_"+e),t.setAttribute("role","tab"),t.setAttribute("aria-controls",e),t.setAttribute("aria-selected","false"),t.setAttribute("tabindex","-1");var n=this.getPanel(t);n.setAttribute("role","tabpanel"),n.setAttribute("aria-labelledby",t.id),n.classList.add(this.jsHiddenClass)},p.prototype.unsetAttributes=function(t){t.removeAttribute("id"),t.removeAttribute("role"),t.removeAttribute("aria-controls"),t.removeAttribute("aria-selected"),t.removeAttribute("tabindex");var e=this.getPanel(t);e.removeAttribute("role"),e.removeAttribute("aria-labelledby"),e.classList.remove(this.jsHiddenClass)},p.prototype.onTabClick=function(t){if(!t.target.classList.contains("govuk-tabs__tab"))return!1;t.preventDefault();var e=t.target,n=this.getCurrentTab();this.hideTab(n),this.showTab(e),this.createHistoryEntry(e)},p.prototype.createHistoryEntry=function(t){var e=this.getPanel(t),n=e.id;e.id="",this.changingHash=!0,window.location.hash=this.getHref(t).slice(1),e.id=n},p.prototype.onTabKeydown=function(t){switch(t.keyCode){case this.keys.left:case this.keys.up:this.activatePreviousTab(),t.preventDefault();break;case this.keys.right:case this.keys.down:this.activateNextTab(),t.preventDefault()}},p.prototype.activateNextTab=function(){var t=this.getCurrentTab(),e=t.parentNode.nextElementSibling;if(e)var n=e.querySelector(".govuk-tabs__tab");n&&(this.hideTab(t),this.showTab(n),n.focus(),this.createHistoryEntry(n))},p.prototype.activatePreviousTab=function(){var t=this.getCurrentTab(),e=t.parentNode.previousElementSibling;if(e)var n=e.querySelector(".govuk-tabs__tab");n&&(this.hideTab(t),this.showTab(n),n.focus(),this.createHistoryEntry(n))},p.prototype.getPanel=function(t){return this.$module.querySelector(this.getHref(t))},p.prototype.showPanel=function(t){this.getPanel(t).classList.remove(this.jsHiddenClass)},p.prototype.hidePanel=function(t){this.getPanel(t).classList.add(this.jsHiddenClass)},p.prototype.unhighlightTab=function(t){t.setAttribute("aria-selected","false"),t.parentNode.classList.remove("govuk-tabs__list-item--selected"),t.setAttribute("tabindex","-1")},p.prototype.highlightTab=function(t){t.setAttribute("aria-selected","true"),t.parentNode.classList.add("govuk-tabs__list-item--selected"),t.setAttribute("tabindex","0")},p.prototype.getCurrentTab=function(){return this.$module.querySelector(".govuk-tabs__list-item--selected .govuk-tabs__tab")},p.prototype.getHref=function(t){var e=t.getAttribute("href");return e.slice(e.indexOf("#"),e.length)},t.initAll=function(t){var n=void 0!==(t=void 0!==t?t:{}).scope?t.scope:document;e(n.querySelectorAll('[data-module="govuk-button"]'),(function(t){new r(t).init()})),e(n.querySelectorAll('[data-module="govuk-accordion"]'),(function(t){new o(t).init()})),e(n.querySelectorAll('[data-module="govuk-details"]'),(function(t){new s(t).init()})),e(n.querySelectorAll('[data-module="govuk-character-count"]'),(function(t){new a(t).init()})),e(n.querySelectorAll('[data-module="govuk-checkboxes"]'),(function(t){new c(t).init()})),new l(n.querySelector('[data-module="govuk-error-summary"]')).init(),new d(n.querySelector('[data-module="govuk-header"]')).init(),e(n.querySelectorAll('[data-module="govuk-notification-banner"]'),(function(t){new u(t).init()})),e(n.querySelectorAll('[data-module="govuk-radios"]'),(function(t){new h(t).init()})),e(n.querySelectorAll('[data-module="govuk-tabs"]'),(function(t){new p(t).init()}))},t.Accordion=o,t.Button=r,t.Details=s,t.CharacterCount=a,t.Checkboxes=c,t.ErrorSummary=l,t.Header=d,t.Radios=h,t.Tabs=p}(e)}},e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={exports:{}};return t[o].call(i.exports,i,i.exports,n),i.exports}return n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var o in e)n.o(e,o)&&!n.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n(917)})();
//# sourceMappingURL=govukFrontend.js.map