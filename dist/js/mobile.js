!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.mobileui={})}(this,function(t){var c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(){window.mobile=window.m,window.$;var l=window.$=window.m=window.mobile=function(t,e){if("function"!=typeof t||1!==arguments.length)return new l.fn.init(t,e);l.ready(t)};l.version="1.0.0",l.numberList=["left","top","right","bottom","width","height"];var t,e=["body","div","p","table","tr","thead","tbody","tfoot","h1","h2","h3","h4","h5","h6","article","aside","details","figcaption","figure","footer","header","hgroup","main","menu","nav","section","summary","ul","li","ol","dl","dt","dd","fieldset"],o=["img","audio","canvas","progress","video","text-area","select","input","button"];function s(n){var i="inline";return l.each(e,function(t,e){if(e===n)return!(i="block")}),l.each(o,function(t,e){if(e===n)return!(i="inline-block")}),i}function r(t,e){return t.parentElement&&e(t.parentElement)?t.parentElement:"html"!==(t.nodeName||"").toLowerCase()?r(t.parentElement,e):void 0}function n(t,e,n,i){var o,s,r;"object"===(void 0===n?"undefined":c(n))&&2<i.length?(o=i[2],3<=i.length&&(s=i[3],r=i[4]||null)):"function"==typeof n&&(o=n,2<i.length&&(s=i[2],r=i[3]||null)),l.ajax({type:e,url:t,data:"object"===(void 0===n?"undefined":c(n))?n:null,success:o,error:s,progress:r})}l.fn=l.prototype={init:function(n,t){var i=[];if(this.length=0,t){if("string"==typeof t&&"string"==typeof n){if(0===t.trim().length)return this;if(0===n.trim().length)return this;var e=document.querySelectorAll(t);l.each(e,function(){for(var t=this.querySelectorAll(n),e=0;e<t.length;e++)i.push(t[e])}),Array.prototype.push.apply(this,i)}else if("object"===(void 0===t?"undefined":c(t))&&"string"==typeof n){if(0===n.trim().length)return this;if(t.length&&0<t.length)l.each(t,function(){for(var t=this.querySelectorAll(n),e=0;e<t.length;e++)i.push(t[e])}),Array.prototype.push.apply(this,i);else if(t.nodeType===Node.ELEMENT_NODE||t.nodeType===Node.DOCUMENT_NODE){var o=t.querySelectorAll(n);Array.prototype.push.apply(this,o)}}}else if("string"==typeof n){if(0===n.trim().length)return this;var s=document.querySelectorAll(n);Array.prototype.push.apply(this,s)}else"object"===(void 0===n?"undefined":c(n))&&(n.length&&0<n.length?l.each(n,function(t,e){i.push(e)}):0===i.length&&i.push(n),Array.prototype.push.apply(this,i));return this}},l.fn.init.prototype=l.fn,l.extend=l.fn.extend=function(t){if("object"===(void 0===t?"undefined":c(t)))for(var e in t)this[e]=t[e];return this},l.fn.extend({each:function(t){l.each(this,t)},css:function(i,t){if(1===arguments.length&&"string"==typeof i){var n="";return l.each(this,function(t,e){return window.getComputedStyle?(n=window.getComputedStyle(e,null)[i.trim()],l.isEqual(l.numberList,i.trim())&&(n=parseFloat(n)||0)):n=e.currentStyle?e.currentStyle[i]:e.style[i],!1}),n}return 2===arguments.length&&l.each(this,function(){l.isEqual(l.numberList,i.trim())?this.style[i.trim()]=Number(t)?Number(t).toString()+"px":t:this.style[i.trim()]=t}),1===arguments.length&&"object"===(void 0===i?"undefined":c(i))&&l.each(this,function(t,e){for(var n in i)l.isEqual(l.numberList,n.trim())?this.style[n]=Number(i[n])?Number(i[n]).toString()+"px":i[n]:this.style[n]=i[n]}),this},find:function(t){for(var n=[],e=m(this),i=0;i<e.length;i++){var o=e[i].querySelectorAll(t);l.each(o,function(t,e){n.push(e)}),delete e[i]}return delete e.length,Array.prototype.push.apply(e,n),e},text:function(t){var e="";return 0===arguments.length?(l.each(this,function(){e+=this.innerText}),e):(1===arguments.length&&l.each(this,function(){this.innerText=t}),this)},val:function(t){var e="";return 0===arguments.length?(l.each(this,function(){e+=this.value}),e):(1===arguments.length&&l.each(this,function(){this.value=t}),this)},html:function(t){var e="";return 0===arguments.length?(l.each(this,function(){e+=this.innerHTML}),e):(1===arguments.length&&l.each(this,function(){this.innerHTML=t}),this)},attr:function(t,e){var n;return 1===arguments.length&&"string"==typeof t?(l.each(this,function(){return n=this.getAttribute(t),!1}),n):(2===arguments.length&&l.each(this,function(){this.setAttribute(t,e.toString())}),this)},hasAttr:function(t){var e=!1;if(1===arguments.length&&"string"==typeof t)return l.each(this,function(){return e=this.hasAttribute(t),!1}),e},removeAttr:function(t){return 1===arguments.length&&"string"==typeof t&&l.each(this,function(){this.removeAttribute(t)}),this},addClass:function(t){return 1===arguments.length&&l.each(this,function(){this.classList.add(t)}),this},removeClass:function(t){return 1===arguments.length&&l.each(this,function(){this.classList.remove(t)}),this},parent:function(){for(var t=[],e=0;e<this.length;e++){var n=this[e].parentElement;n&&t.push(n),delete this[e]}return delete this.length,Array.prototype.push.apply(this,t),this},parents:function(e){e="string"==typeof e?e:"";for(var t=[],n=0;n<this.length;n++){var i=r(this[n],function(t){return l.checkSelector(t,e)});delete this[n],i&&t.push(i)}return delete this.length,Array.prototype.push.apply(this,t),this},closest:function(e){e="string"==typeof e?e:"";for(var t=[],n=0;n<this.length;n++){var i;l.checkSelector(this[n],e)?t.push(this[n]):i=r(this[n],function(t){return l.checkSelector(t,e)}),delete this[n],i&&t.push(i)}return delete this.length,Array.prototype.push.apply(this,t),this},eq:function(t){if("number"!=typeof t)throw Error("index property must is number type");for(var e=[],n=0;n<this.length;n++)n===t&&e.push(this[n]),delete this[n];return delete this.length,Array.prototype.push.apply(this,e),this},first:function(){for(var t=[],e=0;e<this.length;e++)0===e&&t.push(this[e]),delete this[e];return delete this.length,Array.prototype.push.apply(this,t),this},prev:function(){var i=[];return l.each(this,function(t,e){var n=this.previousElementSibling;n&&i.push(n),delete this[t]}),delete this.length,Array.prototype.push.apply(this,i),this},next:function(){var i=[];return l.each(this,function(t,e){var n=this.nextElementSibling;n&&i.push(n),delete this[t]}),delete this.length,Array.prototype.push.apply(this,i),this},siblings:function(){var s=[];return l.each(this,function(t,e){for(var n=this.parentElement.children,i=m(n).index(m(this)),o=0;o<n.length;o++)o!==i&&s.push(n[o]);delete this[t]}),delete this.length,Array.prototype.push.apply(this,s),this},last:function(){for(var t=[],e=0;e<this.length;e++){e===(0<this.length?this.length-1:0)&&t.push(this[e]),delete this[e]}return delete this.length,Array.prototype.push.apply(this,t),this},height:function(){if(0===arguments.length){var n=0;return l.each(this,function(t,e){return n=this===window?window.innerHeight||window.document.documentElement.clientHeight||window.document.body.clientHeight:this===document?m(document.documentElement).css("height"):m(this).css("height"),n=parseFloat(n),!1}),n}if(1===arguments.length){var t=arguments[0];l.each(this,function(){m(this).css("height",t)})}return this},outerHeight:function(){if(0===arguments.length){var n=0;return l.each(this,function(t,e){return n=this===window?window.innerHeight||window.document.documentElement.clientHeight||window.document.body.clientHeight:this===document?m(document.documentElement).eq(0)&&m(document.documentElement).eq(0)[0].offsetHeight:m(this).eq(0)&&m(this).eq(0)[0].offsetHeight,n=parseFloat(n),!1}),n}if(1===arguments.length){var t=arguments[0];l.each(this,function(){m(this).css("height",t)})}return this},outerWidth:function(){if(0===arguments.length){var t=0;return l.each(this,function(){return t=this===window?window.innerWidth||window.document.documentElement.clientWidth||window.document.body.clientWidth:this===document?m(document.documentElement).eq(0)&&m(document.documentElement).eq(0)[0].offsetWidth:m(this).eq(0)&&m(this).eq(0)[0].offsetWidth,t=parseFloat(t),!1}),t}if(1===arguments.length){var e=arguments[0];l.each(this,function(){m(this).css("width",e)})}return this},width:function(){if(0===arguments.length){var t=0;return l.each(this,function(){return t=this===window?window.innerWidth||window.document.documentElement.clientWidth||window.document.body.clientWidth:this===document?m(document.documentElement).css("width"):m(this).css("width"),t=parseFloat(t),!1}),t}if(1===arguments.length){var e=arguments[0];l.each(this,function(){m(this).css("width",e)})}return this},clientTop:function(){var t=0;return l.each(this,function(){return t=this.getBoundingClientRect().top,!1}),t},clientLeft:function(){var t=0;return l.each(this,function(){return t=this.getBoundingClientRect().left,!1}),t},offsetTop:function(){var t=0;return l.each(this,function(){return t=this.offsetTop,!1}),t},offsetLeft:function(){var t=0;return l.each(this,function(){t=this.offsetLeft}),t},offset:function(){var t={};return l.each(this,function(){t.left=this.offsetLeft,t.top=this.offsetTop}),t},index:function(n){var i=-1;return 0===arguments.length?l.each(this,function(t,e){if(e.parentElement){var n=e.parentElement.children;for(t=0;t<n.length;t++)n[t].isEqualNode(e)&&(i=t)}return!1}):1===arguments.length&&l.each(this,function(t,e){n=n.length&&0<n.length?n[0]:n,e.isEqualNode(n)&&(i=t)}),i},remove:function(t){var i=[],o=this;return l.each(this,function(t,e){if(e.parentElement){var n=this.parentElement.removeChild(this);i.push(n)}delete o[t]}),Array.prototype.push.apply(this,i),this},append:function(e){return"object"===(void 0===e?"undefined":c(e))&&e.length&&0<e.length?l.each(this,function(){for(var t=0;t<e.length;t++)this.appendChild(e[t])}):"string"==typeof e?l.each(this,function(){this.innerHTML+=e}):l.each(this,function(){this.appendChild(e)}),this},prepend:function(e){if("object"===(void 0===e?"undefined":c(e))&&e.length&&0<e.length)l.each(this,function(){for(var t=e.length;0<t;t--)this.insertBefore(e[t-1],this.childNodes[0])});else if("string"==typeof e){var t=l.htmlStringToDOM(e);l.each(this,function(){this.insertBefore(t,this.childNodes[0])})}else l.each(this,function(){this.insertBefore(e,this.childNodes[0])});return this},clone:function(t){var e;return l.each(this,function(){return e=this.cloneNode(!0),!1}),e}}),l.fn.extend({show:function(){return l.each(this,function(t,e){var n=this.showValue||"none",i=this.nodeName.toLowerCase();"none"==n&&(n=s(i)),this.style.display=n,this.style.opacity=1}),this},hide:function(){return l.each(this,function(t,e){var n=m(this).css("display")||"none";this.showValue=n,this.style.display="none",this.style.opacity=0}),this},toggle:function(){return l.each(this,function(){"none"!=(m(this).css("display")||"none").trim()?m(this).hide():m(this).show()}),this},fadeIn:function(){return l.each(this,function(t,e){var n=this.showValue||"none",i=this.nodeName.toLowerCase();"none"==n&&(n=s(i)),this.style.display=n,this.style.opacity=0;var o=setInterval(function(){var t=parseFloat(e.style.opacity)||0;t*=1e3,e.style.opacity=(75+t)/1e3,1e3<(t=1e3*(parseFloat(e.style.opacity)||0))+75&&(e.style.opacity=1,e.style.opacity=1,e.style.display=n,clearInterval(o))},30)}),this},fadeOut:function(){return l.each(this,function(t,e){var n=m(this).css("display")||"none";this.showValue=n,this.style.opacity=1;var i=setInterval(function(){var t=parseFloat(e.style.opacity)||0;t*=1e3,e.style.opacity=(t-75)/1e3,(t=1e3*(parseFloat(e.style.opacity)||0))-75<0&&(e.style.opacity=0,e.style.display="none",clearInterval(i))},30)}),this},fadeToggle:function(){return l.each(this,function(){"none"!=(m(this).css("display")||"none").trim()?m(this).fadeOut():m(this).fadeIn()}),this},windowTop:function(i,o){if(0===arguments.length)return parseFloat(window.pageYOffset)||0;o="number"==typeof o?o:400,i="number"==typeof i?i:parseFloat(i),i=isNaN(i)?0:i;var s=20;return l.each(this,function(){if(this.clearTimeId=this.clearTimeId||0,clearInterval(this.clearTimeId),this!==window)throw new Error("element must is window");var t=o/20,e=parseFloat(window.pageYOffset)||0,n=Math.abs(e-i);if(s=n/t,i<e)this.clearTimeId=setInterval(function(){e-=s,window.scrollTo(0,e),e-s<i&&(window.scrollTo(0,i),clearInterval(this.clearTimeId))},20);else{if(e===i)return;this.clearTimeId=setInterval(function(){e+=s,window.scrollTo(0,e),i<e+s&&(window.scrollTo(0,i),clearInterval(this.clearTimeId))},20)}return!1}),this},scrollTop:function(t){if(0===arguments.length){var e=0;return l.each(this,function(){return e=this===window||this===document?window.pageYOffset||0:this.scrollTop,!1}),e}return l.each(this,function(){this===window||this===document?window.scrollTo(0,parseFloat(t)):this.scrollTop=parseFloat(t)}),this},transition:function(s,r,t,a,h){var c="all "+r/1e3+"s  "+(t="string"==typeof t?t:"ease")+" "+(a="number"==typeof a?a:0)/1e3+"s";return"string"==typeof s?(c=s+" "+r/1e3+"s  "+t+" "+a/1e3+"s",l.each(this,function(){this.style.MozTransition=c,this.style.msTransition=c,this.style.webkitTransition=c,this.style.OTransition=c,this.style.transition=c})):l.each(this,function(t,n){if(r="number"==typeof r?r:400,n.setTimeout=n.setTimeout||0,n.isEnd=n.isEnd||!1,!1===n.isEnd)if(n.isStart){var i=setTimeout(function(){for(var t in n.style.MozTransition=c,n.style.msTransition=c,n.style.webkitTransition=c,n.style.OTransition=c,n.style.transition=c,s)n.style[t]=s[t];if("function"==typeof h)var e=setTimeout(function(){h(n),clearTimeout(e)},r+a);clearTimeout(i)},n.setTimeout);n.setTimeout=r+n.setTimeout+a}else{for(var e in n.isStart=!0,n.one=s,n.setTimeout=r+n.setTimeout+a,n.style.MozTransition=c,n.style.msTransition=c,n.style.webkitTransition=c,n.style.OTransition=c,n.style.transition=c,s)n.style[e]=s[e];if("function"==typeof h)var o=setTimeout(function(){h(n),clearTimeout(o)},r+a)}}),this},transitionEnd:function(i,o){l.each(this,function(t,n){n.setTimeout=n.setTimeout||0,n.isEnd=!0;setTimeout(function(){if(n.isEnd=!1,n.setTimeout=0,n.isStart=!1,"function"==typeof i)i(n);else if("boolean"==typeof i&&!0===i){for(var t in n.one)n.style[t]=n.one[t];var e="none";n.style.MozTransition=e,n.style.msTransition=e,n.style.webkitTransition=e,n.style.OTransition=e,n.style.transition=e}"function"==typeof o&&o(n)},n.setTimeout+20)})},addAnimate:function(t,e,n,i,o,s){var r=t+" "+(e="number"==typeof e&&0!==e?e/1e3:.4)+"s "+(n="string"==typeof n?n:"ease")+" "+(i="number"==typeof i&&0!==i?i/1e3:0)+"s "+(o=o||1)+" "+(s="string"==typeof s?s:"normal");return l.each(this,function(t,e){this.style.webkitAnimation=r,this.style.msAnimation=r,this.style.MozAnimation=r,this.style.OAnimation=r,this.style.animate=r}),this},removeAnimate:function(t){var n="none";return l.each(this,function(t,e){this.style.webkitAnimation=n,this.style.msAnimation=n,this.style.MozAnimation=n,this.style.OAnimation=n,this.style.animate=n}),this},animateRuning:function(){var n="running";return l.each(this,function(t,e){this.style.webkitAnimationPlayState=n,this.style.msAnimationPlayState=n,this.style.MozAnimationPlayState=n,this.style.OAnimationPlayState=n,this.style.animationPlayState=n}),this},animatePaused:function(){var n="paused";return l.each(this,function(t,e){this.style.webkitAnimationPlayState=n,this.style.msAnimationPlayState=n,this.style.MozAnimationPlayState=n,this.style.OAnimationPlayState=n,this.style.animationPlayState=n}),this},animationFillMode:function(n){n="string"==typeof n?n:"forwards";return l.each(this,function(t,e){this.style.webkitAnimationFillMode=n,this.style.msAnimationFillMode=n,this.style.MozAnimationFillMode=n,this.style.OAnimationFillMode=n,this.style.AnimationFillMode=n}),this},animatePalyToggle:function(){return l.each(this,function(t,e){"paused"===(m(this).css("animation-play-state")||"").trim()?m(this).animateRuning():m(this).animatePaused()}),this}}),l.fn.extend({on:function(t){if(2<=arguments.length&&"function"==typeof arguments[1]){var e=arguments[1],n="boolean"==typeof arguments[2]&&arguments[2];l.each(this,function(){this.addEventListener?this.addEventListener(t,e,n):this.attachEvent?this.attachEvent("on"+t,e,n):this["on"+t]=e}),m.events.on(t,e)}if(3<=arguments.length&&"string"==typeof arguments[1]&&"function"==typeof arguments[2]){var i=arguments[1].trim();e=arguments[2],n="boolean"==typeof arguments[3]&&arguments[3];l.each(this,function(){this.addEventListener&&this.addEventListener(t,function(t){l.checkSelector(t.target,i)&&e.call(t.target,t)},n)}),m.events.on(t,e)}return this},off:function(e,t){if(1!==arguments.length)return l.each(this,function(){this.removeEventListener?this.removeEventListener(e,t,!1):this.deattachEvent?this.deattachEvent("on"+e,t):this["on"+e]=null,l.events.off(e,t)}),this;l.each(this,function(){for(var t=m.events.props[e].length-1;0<=t;t--)this.removeEventListener?this.removeEventListener(e,m.events.props[e][t],!1):this.deattachEvent("on"+e,m.events.props[e][t]),l.events.off(e,m.events.props[e][t])})},trigger:function(e,n){l.each(this,function(){n=n||{};var t=document.createEvent("CustomEvent");t.initCustomEvent(e,!0,!1,n),this.dispatchEvent(t)})},emit:function(t,e){l.each(this,function(){m(this).trigger(t,e)})},click:function(t,e){e=e||!1,l.each(this,function(){m(this).on("click",t,e)})},touchstart:function(t,e){e=e||!1,l.each(this,function(){m(this).on("touchstart",t,e)})},touchend:function(t,e){e=e||!1,l.each(this,function(){m(this).on("touchend",t,e)})},touchmove:function(t,e){e=e||!1,l.each(this,function(){m(this).on("touchmove",t,e)})},touchcancel:function(t,e){e=e||!1,l.each(this,function(){m(this).on("touchcancel",t,e)})},tap:function(t,e){e=e||!1,l.each(this,function(){m(this).on("touchstart",t,e)})},scroll:function(t,e){e=e||!1,l.each(this,function(){m(this).on("scroll",t,e)})},resize:function(t,e){e=e||!1,l.each(this,function(){m(this).on("resize",t,e)})},change:function(t,e){e=e||!1,l.each(this,function(){m(this).on("change",t,e)})},blur:function(t,e){0!==arguments.length?(e=e||!1,l.each(this,function(){m(this).on("blur",t,e)})):$(this).each(function(){this.blur()})},focus:function(t,e){0!==arguments.length?(e=e||!1,l.each(this,function(){m(this).on("focus",t,e)})):$(this).each(function(){this.focus()})},keyup:function(t,e){e=e||!1,l.each(this,function(){m(this).on("keyup",t,e)})},keydown:function(t,e){e=e||!1,l.each(this,function(){m(this).on("keydown",t,e)})},keypress:function(t,e){e=e||!1,l.each(this,function(){m(this).on("keypress",t,e)})}}),l.extend({createXHR:function(){if(window.XMLHttpRequest)return new XMLHttpRequest;if(!window.ActiveXObject)throw new Error("浏览器不支持XHR对象！");for(var t=0,e=["MSXML2.XMLHttp","Microsoft.XMLHTTP"].length;t<e;t++)try{return new ActiveXObject(version[t])}catch(t){}},ajax:function(e){(e=e||{}).type="string"==typeof e.type?e.type.toUpperCase():"GET",e.url="string"==typeof e.url?e.url:"",e.async="boolean"!=typeof e.async||e.async,e.data="object"===c(e.data)?e.data:{},e.success=e.success||function(){},e.error=e.error||function(){},e.contentType=e.contentType||"application/x-www-form-urlencoded;charset=utf-8",e.progress=e.progress||{};var n=l.createXHR();"number"==typeof e.timeout&&(n.timeout=e.timeout),n.xhrFields=e.xhrFields||{};var t=function(t){var e=[];for(var n in t)if("object"===c(t[n])){var i=t[n];if(t[n].constructor!==Array)for(var o in i){var s=n+"["+o+"]",r=i[o];e.push(encodeURIComponent(s)+"="+encodeURIComponent(r))}else for(var o in i){var a=i[o];if("object"===(void 0===a?"undefined":c(a))&&a.constructor!==Array)for(var h in a)s=n+"["+o+"]["+h+"]",r=a[h],e.push(encodeURIComponent(s)+"="+encodeURIComponent(r))}}else e.push(encodeURIComponent(n)+"="+encodeURIComponent(t[n]));return e.join("&")||""}(e.data);"POST"===e.type.toUpperCase()||"PUT"===e.type.toUpperCase()||"DELETE"===e.type.toUpperCase()?(e.url=-1===e.url.indexOf("?")?e.url+"?_="+Math.random():e.url+"&_="+Math.random(),n.open(e.type,e.url,e.async),n.setRequestHeader("Content-Type",e.contentType),n.send(t)):"GET"===e.type.toUpperCase()&&(0<t.length&&(t="&"+t),e.url=-1===e.url.indexOf("?")?e.url+"?_="+Math.random()+t:e.url+"&_="+Math.random()+t,n.open(e.type,e.url,e.async),n.send(null)),n.onreadystatechange=function(){if(4===n.readyState)if(200<=n.status&&n.status<300||304===n.status){if("function"==typeof e.success)try{e.success(JSON.parse(n.responseText),n.status,n.statusText)}catch(t){e.success(n.responseText,n.status,n.statusText)}}else"function"==typeof e.error&&e.error(n.status,n.statusText)}},get:function(t,e){n(t,"get",e,arguments)},post:function(t,e){n(t,"post",e,arguments)},put:function(t,e){n(t,"put",e,arguments)},delete:function(t,e){n(t,"delete",e,arguments)},jsonp:function(t,e){var n;"function"==typeof e?n=e:3<=arguments.length&&(n=arguments[2]);var i="mobile"+(new Date).getTime().toString().trim();window[i]=function(t){"function"==typeof n&&n(t)};var o=[],s="";if("object"===(void 0===e?"undefined":c(e))){for(var r in e)o.push(encodeURIComponent(r)+"="+encodeURIComponent(e[r]));s=o&&o.join("&")}0<s.length&&(s="&"+s),t=-1===t.indexOf("?")?t+"?callback="+i+s:t+"&callback="+i+s;var a=document.createElement("script");a.setAttribute("id",i),a.setAttribute("src",t),a.setAttribute("type","text/javascript"),document.body.appendChild(a)},isCORS:function(){return void 0===t&&(t=l.createXHR()),void 0!==t.withCredentials}}),l.extend({each:function(t,e){if(!t)throw new Error("els property type must is Array or Object");for(var n=0;n<t.length;n++){if("function"==typeof e)if(!1===e.call(t[n],n,t[n]))break}},ready:function(t){"function"==typeof t&&window.addEventListener("load",t)},isEqual:function(t,e){t=t||[];for(var n=0;n<t.length;n++)if(t[n]===e)return!0;return!1},htmlStringToDOM:function(t){var e=document.createDocumentFragment(),n=document.createDocumentFragment(),i=document.createElement("div");i.innerHTML=t,n.appendChild(i);for(var o=n.querySelector("div").childNodes,s=o.length;0<s;s--)e.insertBefore(o[s-1],e.childNodes[0]);return n=null,e},checkSelector:function(t,e){if(""===(e="string"==typeof e?e:"").trim())return!1;var n=e.match(/\#[a-zA-Z_][\w|-]*[^\.|^#|\[]{0,}/g)||[],i=function(t,e,n){{if(-1===n.search(/#/))return!0;if(-1!==n.search(/#/)&&0===e.length)return!1}for(var i=t.id||"",o=0;o<e.length;o++)if(e[o]==i)return!0;return!1}(t,n=l(n,"#",""),e),o=e.match(/\.[a-zA-Z_][\w|-]*[^\.|^#|\[]{0,}/g)||[],s=function(t,e,n){{if(-1===n.search(/\./))return!0;if(-1!==n.search(/\./)&&0===e.length)return!1}for(var i=t.classList||"",o=0;o<e.length;o++)if(!i.contains(e[o]))return!1;return!0}(t,o=l(o,".",""),e),r=e.match(/^[a-zA-Z][\w|-]*[^\.|^#|\[]{0,}|[\]][a-zA-Z][\w|-]*[^\.|^#|\[]{0,}/g)||[],a=function(t,e,n){{if(-1===n.search(/^[a-zA-Z]|[\]][a-zA-Z]/))return!0;if(-1!==n.search(/^[a-zA-Z]|[\]][a-zA-Z]/)&&0===e.length)return!1}for(var i=(t.nodeName||"").toLowerCase(),o=0;o<e.length;o++)if(e[o].trim()!==i)return!1;return!0}(t,r=l(r,"]",""),e),h=e.match(/\[[a-zA-Z][\w-=]*\]/g)||[],c=function(t,e,n){{if(-1===n.search(/\[.*\]/))return!0;if(-1!==n.search(/\[.*\]/)&&0===e.length)return!1}for(var i=/=/g,o=0;o<e.length;o++)if(i.test(e[o])){var s=e[o].split("=");if((t.getAttribute(s[0])||"").trim()!==(s[1]||"").trim())return!1}else if(!t.hasAttribute(e[o]))return!1;return!0}(t,h=l(h=l(h,"[",""),"]",""),e);function l(t,e,n){for(var i=[],o=0;o<t.length;o++)i.push(t[o].replace(e,n));return i}return i&&s&&a&&c},trim:function(t){return(t="string"==typeof t?t:"").replace(/^\s*|\s*$/gim,"")},round:function(t,e){if(1===arguments.length){if("number"==typeof t)return Math.round(t)}else if(2===arguments.length&&"number"==typeof t&&"number"==typeof e){var n=Math.floor(t);return(n+=e)<t?Math.ceil(t):Math.floor(t)}return null}}),l.extend({events:{props:{},on:function(t,e){this.props[t]=this.props[t]||[],this.props[t].push(e)},off:function(t,e){if(1===arguments.length)this.props[t]=[];else if(2===arguments.length)for(var n=this.props[t]||[],i=0;i<n.length;i++)if(n[i]===e){n.splice(i,1);break}},emit:function(t,e){if(this.events[t])for(var n=0;n<this.events[t].length;n++)this.events[t][n](e)}}}),l.fn.extend({setTransform:function(i,o){return l.each(this,function(){this.transform||(this.transform={}),this.transform[i]=o;var t="";for(var e in this.transform)switch(e){case"rotate":case"rotateX":case"rotateY":case"rotateZ":case"skewX":case"skewY":case"skewZ":t+=e+"("+parseFloat(this.transform[e])+"deg)  ";break;case"skew":2===(n=this.transform[e].split(",")).length?t+=e+"("+parseFloat(n[0])+"deg,"+parseFloat(n[1])+"deg)  ":t+=e+"("+parseFloat(n)+"deg,0deg)  ";break;case"scaleX":case"scaleY":case"scaleZ":t+=e+"("+parseFloat(this.transform[e])+")  ";break;case"scale":2===(n=this.transform[e].split(",")).length?t+=e+"("+parseFloat(n[0])+","+parseFloat(n[1])+")  ":t+=e+"("+parseFloat(n)+","+parseFloat(n)+")  ";break;case"translateX":case"translateY":case"translateZ":t+=e+"("+parseFloat(this.transform[e])+"px)  ";break;case"translate":var n;2===(n=this.transform[e].split(",")).length?t+=e+"("+parseFloat(n[0])+"px,"+parseFloat(n[1])+"px)  ":t+=e+"("+parseFloat(n)+"px,0px)  "}this.style.WebkitTransform=t,this.style.MozTransform=t,this.style.msTransform=t,this.style.OTransform=t,this.style.transform=t}),this},getTransform:function(o){var s=0;return l.each(this,function(){if(this.transform||(this.transform={}),void 0===this.transform[o])"scale"==o||"scaleX"==o||"scaleY"==o?(s=1,"scale"===o&&(s=[1,1])):(s=0,"skew"!==o&&"translate"!==o||(s=[0,0]));else if("skew"===o||"translate"===o||"scale"===o){for(var t=this.transform[o].split(","),e=[],n=0;n<t.length;n++){var i=parseFloat(t[n]);i="scale"===o?isNaN(i)?1:i:isNaN(i)?0:i,e.push(i)}1===e.length&&("scale"===o?e.push(e[0]):e.push(0)),s=e}else s=parseFloat(this.transform[o])}),s}}),"object"===("undefined"==typeof module?"undefined":c(module))&&"object"===c(module.exports)&&(module.exports=l),"function"==typeof define&&define.amd&&define(function(){return l}),"function"==typeof define&&define.cmd&&define(function(t,e,n){n.exports=l})}();var e=function(){function n(c){var f=m(c).find(".mobile-scroll-topbottom-content");m(f).setTransform("translateZ",.01);var d=m(c).hasAttr("data-scrolltop"),p=m(c).hasAttr("data-scrollbottom"),y=m(c).hasAttr("data-scroll-bar");if(y){var t=document.createElement("div");t.classList.add("mobile-scroll-bar"),c.appendChild(t)}var l=0,g=0,v=0,w=0,b=0,T=0,E=0,A=!0,M=!1,S=!0,x=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,n=m(f).height(),L=m(c).height(),i=L/n,o=x*i,F=m(c).find(".mobile-scroll-bar");function k(){if(y){var t=m(f).getTransform("translateY")/m(f).height();F.setTransform("translateY",-L*t),F.transition("null",0),n=m(f).height(),L=m(c).height(),o=x*(i=L/n),(F=m(c).find(".mobile-scroll-bar")).height(o)}}y&&F.height(o),m(c).on("touchstart",function(t){t.preventDefault();var e=t.changedTouches[0];T=e.clientY,E=e.clientX,A=!0,b=m(f).getTransform("translateY"),l=(new Date).getTime(),g=b,w=0,x=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,f[0].style.transition="none",y&&(F.transition("null",0),n=m(f).height(),L=m(c).height(),o=x*(i=L/n),(F=m(c).find(".mobile-scroll-bar")).height(o))}),m(c).on("touchmove",function(t){t.preventDefault();var e=t.changedTouches[0],n=e.clientY,i=n-T,o=e.clientX;(1<Math.abs(o-E)||1<Math.abs(n-T))&&(A=!1);if(y){var s=m(f).getTransform("translateY"),r=m(f).height(),a=s/r;F.setTransform("translateY",-L*a)}Math.abs(o-E)>Math.abs(n-T)&&S&&(S=!(M=!0));if(M)return;m(this).trigger("scrolltopbottom",{el:f[0],barFun:k});var h=x-f[0].offsetHeight,c=b+i;if(0<c){var l=1-c/x;c*=l,d||(c=0),m(this).trigger("scrolltop",{el:f[0],barFun:k})}else if(c<h){var u=Math.abs(c-h),l=1-u/x;c=h-u*l,p||(c=h),m(this).trigger("scrollbottom",{el:f[0],barFun:k}),m(f).height()<x&&(c=0)}m(f).setTransform("translateY",c),v=(new Date).getTime(),w=c-g}),m(c).on("touchend",function(t){t.changedTouches[0];var e=w/(v-l);if(S=!(M=!1),A){t.stopPropagation();var n=m(t.target).closest("a").attr("href")||"javascript:;";window.location.assign(n)}var i=x-f[0].offsetHeight,o=m(f).getTransform("translateY")+200*e,s="";0<o?(o=0,s="cubic-bezier(.17,.67,.81,.9)"):o<i&&(o=i,s="cubic-bezier(.17,.67,.81,.9)",m(f).height()<x&&(o=0));if(y){var r=o,a=m(f).height(),h=r/a;F.setTransform("translateY",-m(c).height()*h),F.transition("all",500)}f[0].style.transition=".5s "+s,m(f).setTransform("translateY",o)})}m(document).touchstart(function(t){t.preventDefault()}),m(document).touchmove(function(t){t.preventDefault()}),m(document).touchend(function(t){t.preventDefault()}),m(document).touchcancel(function(t){t.preventDefault()}),m(function(){!function(){for(var t=m(".mobile-scroll-topbottom"),e=0;e<t.length;e++)n(t[e])}()})}(),n=function(){function n(t){var l=m(t).find(".mobile-scroll-list");m(l).setTransform("translateZ",.01);var h=0,u=0,f=0,d=0,p=0,y=0,g=0,v=!0,w=!1,b=!0;m(t).on("touchstart",function(t){t.preventDefault();var e=t.changedTouches[0];y=e.clientX,g=e.clientY,v=!0,p=m(l).getTransform("translateX"),h=(new Date).getTime(),u=p,l[d=0].style.transition="none"}),m(t).on("touchmove",function(t){t.preventDefault();var e=t.changedTouches[0],n=e.clientX,i=e.clientY,o=n-y;(1<Math.abs(n-y)||1<Math.abs(i-g))&&(v=!1);Math.abs(i-g)>Math.abs(n-y)&&b&&(b=!(w=!0));if(w)return;var s=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,r=s-l[0].offsetWidth,a=p+o;if(0<a){var h=1-a/s;a*=h}else if(a<r){var c=Math.abs(a-r),h=1-c/s;a=r-c*h,m(l).width()<s&&(a=0)}m(l).setTransform("translateX",a),f=(new Date).getTime(),d=a-u}),m(t).on("touchend",function(t){t.preventDefault();t.changedTouches[0];var e=d/(f-h),n=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;if(v){var i=m(t.target).closest("li");0<i.length&&(m(this).find("li").removeClass("active"),i.addClass("active"),m(this).trigger("scrollselect",i[0]));var o=m(t.target).closest("a").attr("href")||"javascript:;";window.location.assign(o)}w=!1,b=!0;var s=n-l[0].offsetWidth,r=m(l).getTransform("translateX")+50*e,a="";0<r?(r=0,a="cubic-bezier(.17,.67,.81,.9)"):r<s&&(r=s,a="cubic-bezier(.17,.67,.81,.9)",m(l).width()<n&&(r=0));l[0].style.transition=".5s "+a,m(l).setTransform("translateX",r)})}m(function(){!function(){for(var t=m(".mobile-scroll"),e=0;e<t.length;e++)n(t[e])}()})}(),i=function(){function n(t){var e=t,l=e.querySelector(".mobile-slide-list"),r=e.getAttribute("data-time")||"3000",a=m(e).hasAttr("data-auto"),u=m(e).hasAttr("data-no-loop");r=parseInt(r);var f=0,d=0,p=0,y=0,h=0,g=!0,v=!1,w=!0,b=e.querySelectorAll(".mobile-slide-radius span");m(l).setTransform("translateZ",.01),u||(l.innerHTML+=l.innerHTML);var c=e.querySelectorAll(".mobile-slide-list li");function T(t){return setInterval(function(){l.style.transition="none",u||h==c.length-1&&(h=b.length-1),m(l).setTransform("translateX",-h*document.documentElement.clientWidth),setTimeout(function(){h++,l.style.transition="0.5s ease-in-out",m(l).setTransform("translateX",-h*document.documentElement.clientWidth);for(var t=0;t<b.length;t++)b[t].className="";b[h%b.length].className="active"},20)},t)}e.addEventListener("touchstart",function(t){t.preventDefault();var e=t.changedTouches[0];g=!0,clearInterval(f),l.style.transition="none";var n=m(l).getTransform("translateX"),i=Math.round(-n/document.documentElement.clientWidth);u||(0==i?i=b.length:i==c.length-1&&(i=b.length-1));m(l).setTransform("translateX",-i*document.documentElement.clientWidth),p=e.clientX,y=e.clientY,d=m(l).getTransform("translateX")}),e.addEventListener("touchmove",function(t){t.preventDefault();var e=t.changedTouches[0],n=e.clientX,i=e.clientY,o=n-p;(1<Math.abs(n-p)||1<Math.abs(i-y))&&(g=!1);Math.abs(i-y)>Math.abs(n-p)&&w&&(w=!(v=!0));if(v)return;if(u){var s=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,r=Math.abs(l.offsetWidth*b.length-s),a=d+o;if(0<a){var h=1-a/s;a*=h}else if(Math.abs(a)>r){var c=Math.abs(a)-Math.abs(r),h=1-c/s;a=-r-c*h}m(l).setTransform("translateX",a)}u||(clearInterval(f),m(l).setTransform("translateX",d+o))}),e.addEventListener("touchend",function(t){var e=t.changedTouches[0],n=e.clientX;e.clientY;w=!(v=!1),a&&!u&&(f=T(r));if(g){t.stopPropagation();var i=m(t.target).closest("a").attr("href")||"javascript:;";window.location.assign(i)}var o=-m(l).getTransform("translateX")/document.documentElement.clientWidth;h=p<n?m.round(o,.8):m.round(o,.2);h<0?h=0:h>c.length-1&&(h=c.length-1);l.style.transition="0.5s",m(l).setTransform("translateX",-h*document.documentElement.clientWidth);for(var s=0;s<b.length;s++)b[s].classList.remove("active");b[h%b.length].classList.add("active")}),a&&!u&&(f=T(r))}window.addEventListener("load",function(){for(var t=document.querySelectorAll(".mobile-slide"),e=0;e<t.length;e++)n(t[e])})}();t.scrollTopBottom=e,t.scrollLeftRight=n,t.slide=i,Object.defineProperty(t,"__esModule",{value:!0})});