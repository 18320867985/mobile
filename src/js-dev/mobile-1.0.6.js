/*
 *	移动端 公共类库
 * 作者： hqs
 */

(function(global, factory) {

	//  cmd commonjs
	if(typeof module === "object" && typeof module.exports === "object") {
		module.exports = factory(global);
	}

	// amd requirejs
	else if(typeof define === "function" && define.amd) {
		define(function() {
			return factory(global);
		});
	}

	// cmd seajs
	else if(typeof define === "function" && define.cmd) {
		define(function(require, exports, module) {
			module.exports = factory(global);
		});

	} else {
		factory(global);
	}

})(typeof window !== "undefined" ? window : this, function(window) {

	"use strict"

	// 冲突Mobile兼容
	var _mobile = window.mobile = window.m;
	var _$ = window.$;

	// 创建mobile对象
	var Mobile = window.$ = window.m = window.mobile = function(selector, content) {

		if(typeof selector === "function" && arguments.length === 1) {
			Mobile.ready(selector);
			return;
		};
		return new Mobile.fn.init(selector, content);
	};

	// 版本号
	Mobile.version = "1.0.6";

	// 可计算值 的列表
	Mobile.numberList = ["left", "top", "right", "bottom", "width", "height"];

	// 私有函数
	var _block = ["body", "div", "p", "table", "tr", "thead", "tbody", "tfoot", "h1", "h2", "h3", "h4", "h5", "h6",
		"article",
		"aside", "details", "figcaption", "figure", "footer", "header", "hgroup", "main", "menu", "nav", "section",
		"summary",
		"ul", "li", "ol", "dl", "dt", "dd", "fieldset"
	]
	var _inlineBlock = ["img", "audio", "canvas", "progress", "video", "text-area", "select", "input", "button"];

	// 查找元素显示类型
	function _getElementType(nodeName) {
		var _type = "inline";

		// block
		Mobile.each(_block, function(i, v) {
			if(v === nodeName) {
				_type = "block";
				return false;
			}
		});

		// inlineblock
		Mobile.each(_inlineBlock, function(i, v) {
			if(v === nodeName) {
				_type = "inline-block";
				return false;
			}
		});

		return _type;

	}

	// 递归查找父元素
	function _searchParents(el, fn) {

		if(el.parentElement) {
			if(fn(el.parentElement)) {
				return el.parentElement;
			}
		}

		if((el.nodeName || "").toLowerCase() === "html") {
			return;
		}

		return _searchParents(el.parentElement, fn);

	}

	function isArraylike(obj) {
		var length = obj.length,
			type = Mobile.type(obj);

		if(type === "function" || Mobile.isWindow(obj)) {
			return false;
		}

		if(obj.nodeType === 1 && length) {
			return true;
		}

		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && (length - 1) in obj;
	};
	// prototype
	Mobile.fn = Mobile.prototype = {

		init: function(selector, content) {

			var arrs = [];
			this.length = 0; // init length=0;
			if(!content) {

				// 字符串
				if(typeof selector === "string") {
					if(selector.trim().length === 0) {
						return this;
					}
					var els = document.querySelectorAll(selector);
					Array.prototype.push.apply(this, els);
				} else if(typeof selector === "object") {

					// 遍历数组型对象
					if(selector.hasOwnProperty("length") && selector.length > 0) {
						Mobile.each(selector, function(i, v) {
							arrs.push(v);
						});
					} else if(selector.nodeType === Node.ELEMENT_NODE || selector.nodeType === Node.DOCUMENT_NODE || selector ===
						window) {
						// 单例对象 
						arrs.push(selector);
					}

					Array.prototype.push.apply(this, arrs);

				}

			} else {

				if(typeof content === "string" && typeof selector === "string") {

					if(content.trim().length === 0) {
						return this;
					}
					if(selector.trim().length === 0) {
						return this;
					}

					var p = document.querySelectorAll(content);
					Mobile.each(p, function() {
						var childElements = this.querySelectorAll(selector);
						for(var i = 0; i < childElements.length; i++) {
							arrs.push(childElements[i])
						}
					});
					Array.prototype.push.apply(this, arrs);

				} else if(typeof content === "object" && typeof selector === "string") {
					if(selector.trim().length === 0) {
						return this;
					}
					// 遍历数组型对象
					if(content.hasOwnProperty("length") && content.length > 0) {

						Mobile.each(content, function() {
							var childElements = this.querySelectorAll(selector);
							for(var i = 0; i < childElements.length; i++) {
								arrs.push(childElements[i]);
							}

						});
						Array.prototype.push.apply(this, arrs);

					} else if(content.nodeType === Node.ELEMENT_NODE || content.nodeType === Node.DOCUMENT_NODE) {
						var childElements = content.querySelectorAll(selector);
						Array.prototype.push.apply(this, childElements);
					}

				}

			}
			return this;
		},

	}

	// 将init函数作为实例化的mobile原型。 
	Mobile.fn.init.prototype = Mobile.fn;

	Mobile.extend = Mobile.fn.extend = function(obj) {

		// 		if (typeof obj === "object") {
		// 			for (var i in obj) {
		// 				this[i] = obj[i];
		// 			}
		// 		}
		// 
		// 		return this;

		var src, copyIsArray, copy, name, options, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if(typeof target === "boolean") {
			deep = target;

			// skip the boolean and the target
			target = arguments[i] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if(typeof target !== "object" && !Mobile.isFunction(target)) {
			target = {};
		}

		// extend Mobile itself if only one argument is passed
		if(i === length) {
			target = this;
			i--;
		}

		for(; i < length; i++) {
			// Only deal with non-null/undefined values
			if((options = arguments[i]) != null) {
				// Extend the base object
				for(name in options) {
					src = target[name];
					copy = options[name];

					// Prevent never-ending loop
					if(target === copy) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if(deep && copy && (Mobile.isPlainObject(copy) || (copyIsArray = Mobile.isArray(copy)))) {
						if(copyIsArray) {
							copyIsArray = false;
							clone = src && Mobile.isArray(src) ? src : [];

						} else {
							clone = src && Mobile.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = Mobile.extend(deep, clone, copy);

						// Don't bring in undefined values
					} else if(copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	}

	/*extend 静态方法*/
	Mobile.extend({

		each: function(els, fn) {
			if(!els) {
				throw new Error("els property type must is Array or Object");
			}
			for(var i = 0; i < els.length; i++) {
				//try {
				if(typeof fn === "function") {
					var bl = fn.call(els[i], i, els[i]);
					if(bl === false) {
						break;
					}
				}
			}
		},

		eachObj: function(obj, callback, args) {
			var value,
				i = 0,
				length = obj.length,
				isArray = isArraylike(obj);

			if(args) {
				if(isArray) {
					for(; i < length; i++) {
						value = callback.apply(obj[i], args);

						if(value === false) {
							break;
						}
					}
				} else {
					for(i in obj) {
						value = callback.apply(obj[i], args);

						if(value === false) {
							break;
						}
					}
				}

				// A special, fast, case for the most common use of each
			} else {
				if(isArray) {
					for(; i < length; i++) {
						value = callback.call(obj[i], i, obj[i]);

						if(value === false) {
							break;
						}
					}
				} else {
					for(i in obj) {
						value = callback.call(obj[i], i, obj[i]);

						if(value === false) {
							break;
						}
					}
				}
			}

			return obj;
		},

		ready: function(fn) {

			if(typeof fn === "function") {
				window.addEventListener("load", fn);

			}
			return;
		},

		// 列表项和子项的匹配	
		isEqual: function(list, item) {
			list = list || [];
			for(var i = 0; i < list.length; i++) {

				if(list[i] === item) {
					return true;
				}
			}

			return false;

		},

		// html字符串转dom对象
		htmlStringToDOM: function(txt) {

			var df2 = document.createDocumentFragment();
			var df = document.createDocumentFragment();
			var div = document.createElement("div");
			div.innerHTML = txt;
			df.appendChild(div);
			var _nodes = df.querySelector("div").childNodes;
			for(var i = _nodes.length; i > 0; i--) {
				df2.insertBefore(_nodes[i - 1], df2.childNodes[0]);
			}
			df = null;
			return df2;

		},

		checkSelector: function(el, txt) {
			txt = typeof txt === "string" ? txt : "";
			if(txt.trim() === "") {
				return false;
			}
			var regId = /\#[a-zA-Z_][\w|-]*[^\.|^#|\[]{0,}/g;
			var regClass = /\.[a-zA-Z_][\w|-]*[^\.|^#|\[]{0,}/g;
			var regTag = /^[a-zA-Z][\w|-]*[^\.|^#|\[]{0,}|[\]][a-zA-Z][\w|-]*[^\.|^#|\[]{0,}/g;
			var regAttr = /\[[a-zA-Z][\w-=]*\]/g;

			var idList = txt.match(regId) || [];
			idList = rep(idList, "#", "");
			var isIdBl = isId(el, idList, txt);
			//alert(isIdBl)

			var classList = txt.match(regClass) || [];
			classList = rep(classList, ".", "");
			var isClassBl = isclass(el, classList, txt);
			//alert(isClassBl)

			var tagList = txt.match(regTag) || [];
			tagList = rep(tagList, "]", "")
			var isTagBl = istag(el, tagList, txt);
			//alert(isTagBl)

			var attrList = txt.match(regAttr) || [];
			attrList = rep(attrList, "[", "");
			attrList = rep(attrList, "]", "");
			var isAttrBl = isAttr(el, attrList, txt);
			//alert(attrList)

			function rep(list, old, now) {
				var arr = [];
				for(var i = 0; i < list.length; i++) {
					arr.push(list[i].replace(old, now));
				}

				return arr;
			}

			function isId(el, idList, searchTxt) {

				if(searchTxt.search(/#/) === -1) {
					return true;
				} else if(searchTxt.search(/#/) !== -1 && idList.length === 0) {
					return false;
				}

				// 上条件不符合  向下执行
				var id = el.id || "";
				for(var i = 0; i < idList.length; i++) {
					if(idList[i] == id) {
						return true;
					}
				}
				return false;

			}

			function isclass(el, idList, searchTxt) {
				if(searchTxt.search(/\./) === -1) {
					return true;
				} else if(searchTxt.search(/\./) !== -1 && idList.length === 0) {
					return false;
				}

				// 上条件不符合  向下执行
				var _class = el.classList || "";

				for(var i = 0; i < idList.length; i++) {
					if(!_class.contains(idList[i])) {
						return false;
					}
				}
				return true;

			}

			function istag(el, idList, searchTxt) {
				if(searchTxt.search(/^[a-zA-Z]|[\]][a-zA-Z]/) === -1) {
					return true;
				} else if(searchTxt.search(/^[a-zA-Z]|[\]][a-zA-Z]/) !== -1 && idList.length === 0) {
					return false;
				}

				// 上条件不符合  向下执行
				var _tag = (el.nodeName || "").toLowerCase();

				for(var i = 0; i < idList.length; i++) {
					if(idList[i].trim() !== _tag) {
						return false;
					}
				}
				return true;

			}

			function isAttr(el, idList, searchTxt) {

				if(searchTxt.search(/\[.*\]/) === -1) {
					return true;
				} else if(searchTxt.search(/\[.*\]/) !== -1 && idList.length === 0) {
					return false;
				}

				// 上条件不符合  向下执行
				//var _tag = el.getat
				var _reg2 = /=/g;
				for(var i = 0; i < idList.length; i++) {

					if(_reg2.test(idList[i])) {
						//alert(idList[i]);
						var arr2 = idList[i].split("=");
						if((el.getAttribute(arr2[0]) || "").trim() !== (arr2[1] || "").trim()) {
							return false;
						}
					} else {

						if(!el.hasAttribute(idList[i])) {
							return false;
						}
					}

				}
				return true;

			}

			return isIdBl && isClassBl && isTagBl && isAttrBl;
		},

		trim: function(txt) {
			var str = "";
			txt = typeof txt === "string" ? txt : "";
			str = txt.replace(/^\s*|\s*$/img, "");
			return str;
		},

		round: function(value, ratio) {

			if(arguments.length === 1) {

				if(typeof value === "number") {
					return Math.round(value);
				}

			} else if(arguments.length === 2) {
				if(typeof value === "number" && typeof ratio === "number") {

					var _v = Math.floor(value);
					_v = _v + ratio;

					if(value > _v) {
						return Math.ceil(value);
					} else {
						return Math.floor(value);
					}

				}

			}

			return null;
		},

		// 检查是否为移动端
		isMobile: function() {

			var userAgentInfo = navigator.userAgent.toString().toLowerCase();
			var Agents = ["Android", "iPhone",
				"SymbianOS", "Windows Phone",
				"iPad", "iPod"
			];
			//console.log(userAgentInfo)
			var flag = false;
			for(var v = 0; v < Agents.length; v++) {
				if(userAgentInfo.indexOf(Agents[v].toLowerCase()) > 0) {
					flag = true;
					break;
				}
			}
			return flag;
		},

		/* jsonToDate 
		 * /Date(1492048799952)/ 或 1492048799952
		 * 	转化为指定格式的String 的时间日期
		 	月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
			 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
			 例子： 
			 (new Date()).Format("yyyy-MM-dd HH:mm:ss.S") ==> 2006-07-02 08:09:04.423 
			 (new Date()).Format("yyyy-M-d H:m:s.S")      ==> 2006-7-2 8:9:4.18
		 * */
		jsonToDate: function(value, fmt) {
			fmt = typeof fmt !== "string" ? "yyyy-MM-dd" : fmt;
			var txts = value.toString().replace("/Date(", "").replace(")/", "");
			var times = parseInt(txts);
			times = isNaN(times) ? new Date(1970, 0, 1, 0, 0, 1) : times;

			var dt = new Date(Number(times.toString()));
			var o = {
				"M+": dt.getMonth() + 1, //月份 
				"d+": dt.getDate(), //日 
				"H+": dt.getHours(), //小时 
				"m+": dt.getMinutes(), //分 
				"s+": dt.getSeconds(), //秒 
				"q+": Math.floor((dt.getMonth() + 3) / 3), //季度 
				"S": dt.getMilliseconds() //毫秒 
			};
			if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (dt.getFullYear() + "").substr(4 - RegExp.$1.length));
			for(var k in o)
				if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" +
					o[k]).substr(("" + o[k]).length)));
			return fmt;

		},

		isFunction: function(obj) {
			return Mobile.type(obj) === "function";
		},

		isArray: Array.isArray || function(obj) {
			return Mobile.type(obj) === "array";
		},

		isWindow: function(obj) {
			/* jshint eqeqeq: false */
			return obj != null && obj == obj.window;
		},

		isNumeric: function(obj) {
			// parseFloat NaNs numeric-cast false positives (null|true|false|"")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			return obj - parseFloat(obj) >= 0;
		},

		isEmptyObject: function(obj) {
			var name;
			for(name in obj) {
				return false;
			}
			return true;
		},

		isPlainObject: function(obj) {
			var key;

			// Must be an Object.
			// Because of IE, we also have to check the presence of the constructor property.
			// Make sure that DOM nodes and window objects don't pass through, as well
			if(!obj || Mobile.type(obj) !== "object" || obj.nodeType || Mobile.isWindow(obj)) {
				return false;
			}

			try {
				// Not own constructor property must be Object
				if(obj.constructor &&
					!hasOwn.call(obj, "constructor") &&
					!hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
					return false;
				}
			} catch(e) {
				// IE8,9 Will throw exceptions on certain host objects #9897
				return false;
			}

			// Support: IE<9
			// Handle iteration over inherited properties before own properties.
			if(support.ownLast) {
				for(key in obj) {
					return hasOwn.call(obj, key);
				}
			}

			// Own properties are enumerated firstly, so to speed up,
			// if last one is own, then all properties are own.
			for(key in obj) {}

			return key === undefined || hasOwn.call(obj, key);
		},

		type: function(obj) {
			var class2type = {};
			var toString = class2type.toString;
			if(obj == null) {
				return obj + "";
			}
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[toString.call(obj)] || "object" :
				typeof obj;
		},

	});

	/*extend instantiation function 实例方法*/
	Mobile.fn.extend({

		//each
		each: function(fn) {
			Mobile.each(this, fn);
		},

		// css
		css: function(attr, value) {

			// get  返回第一个一个值
			if(arguments.length === 1 && typeof attr === "string") {

				var _css = "";
				Mobile.each(this, function(i, v) {

					if(window.getComputedStyle) {
						_css = window.getComputedStyle(v, null)[attr.trim()];
						if(Mobile.isEqual(Mobile.numberList, attr.trim())) {
							_css = parseFloat(_css) || 0;
						}
					}
					// ie8
					else if(v.currentStyle) {
						_css = v.currentStyle[attr];
					} else {
						_css = v.style[attr];
					}

					return false;

				});
				return _css;
			}

			// set
			if(arguments.length === 2) {

				Mobile.each(this, function() {
					if(Mobile.isEqual(Mobile.numberList, attr.trim())) {
						this.style[attr.trim()] = Number(value) ? Number(value).toString() + "px" : value;
					} else {
						this.style[attr.trim()] = value;
					}

				});

			}

			//set 对象的值
			if(arguments.length === 1 && typeof attr === "object") {
				Mobile.each(this, function(i, v) {
					for(var _attr in attr) {
						if(Mobile.isEqual(Mobile.numberList, _attr.trim())) {
							this.style[_attr] = Number(attr[_attr]) ? Number(attr[_attr]).toString() + "px" : attr[_attr];
						} else {
							this.style[_attr] = attr[_attr];
						}

					}
				});

			}

			return this;
		},

		// find
		find: function(selector) {
			var arr = [];
			var obj = m(this);
			for(var i = 0; i < obj.length; i++) {
				var _arr = obj[i].querySelectorAll(selector);
				Mobile.each(_arr, function(i, v) {
					arr.push(v);
				})
				delete obj[i];
			}
			delete obj.length;
			Array.prototype.push.apply(obj, arr);
			return obj;
		},

		// text
		text: function(value) {

			//set 对象的值
			var _text = "";
			if(arguments.length === 0) {
				Mobile.each(this, function() {
					_text += this.innerText;

				});
				return _text;
			}
			if(arguments.length === 1) {
				Mobile.each(this, function() {
					this.innerText = value;
				});
			}
			return this;
		},

		// val
		val: function(value) {

			//set 对象的值
			var _val = "";
			if(arguments.length === 0) {
				Mobile.each(this, function() {
					_val += this.value;

				});
				return _val;
			}
			if(arguments.length === 1) {
				Mobile.each(this, function() {
					this.value = value;
				});
			}
			return this;
		},

		// html
		html: function(value) {

			//set 对象的值
			var _html = "";
			if(arguments.length === 0) {
				Mobile.each(this, function() {
					_html += this.innerHTML;
				});
				return _html;
			}
			if(arguments.length === 1) {
				Mobile.each(this, function() {
					this.innerHTML = value;
				});
			}
			return this;
		},

		// attr
		attr: function(attr, value) {

			// 返回第一个属性值
			if(arguments.length === 1 && typeof attr === "string") {
				var _attr = undefined;
				Mobile.each(this, function() {
					_attr = this.getAttribute(attr);
					if(_attr === null) {
						_attr = undefined;
					}
					return false;
				});
				return _attr;
			}

			if(arguments.length === 2) {

				Mobile.each(this, function() {
					this.setAttribute(attr, value.toString());
				});

			}
			return this;
		},

		// hasAttr
		hasAttr: function(attr) {

			// 是否含有元素的属性
			var _attr = false;
			if(arguments.length === 1 && typeof attr === "string") {

				Mobile.each(this, function() {
					_attr = this.hasAttribute(attr);
					return false;
				});
				return _attr;
			}

		},

		// removeAttr
		removeAttr: function(attr) {

			// 返回第一个属性值
			if(arguments.length === 1 && typeof attr === "string") {

				Mobile.each(this, function() {
					this.removeAttribute(attr);
				});
			}

			return this;
		},

		// addClass
		addClass: function(className) {

			if(typeof className === "string") {
				className = className.split(/\s+/);

			} else {

				return this;
			}

			if(arguments.length === 1) {

				Mobile.each(this, function() {
					for(var y = 0; y < className.length; y++) {
						if(className[y]) {
							this.classList.add(className[y]);
						}

					}
				});

			}

			return this;
		},

		// toggleClass
		toggleClass: function(className) {

			if(typeof className === "string") {
				className = className.split(/\s+/);

			} else {

				return this;
			}

			if(arguments.length === 1) {

				Mobile.each(this, function() {
					for(var y = 0; y < className.length; y++) {
						if(className[y]) {
							if(this.classList.contains(className[y])) {
								this.classList.remove(className[y]);
							} else {
								this.classList.add(className[y]);
							}

						}

					}
				});

			}

			return this;
		},

		//  hasclass
		hasClass: function(className) {
			var ishasClass = false;
			if(arguments.length === 1) {

				Mobile.each(this, function() {
					ishasClass = this.classList.contains(className);
					return false;
				});

			}

			return ishasClass;
		},

		// removeClass
		removeClass: function(className) {

			if(typeof className === "string") {
				className = className.split(/\s+/);

			} else {

				return this;
			}

			if(arguments.length === 1) {

				Mobile.each(this, function() {
					for(var y = 0; y < className.length; y++) {
						if(className[y]) {
							this.classList.remove(className[y]);
						}

					}

				});

			}
			return this;
		},

		// parent 
		parent: function() {
			var arr = [];
			var obj = m(this);
			for(var i = 0; i < obj.length; i++) {
				var _arr = obj[i].parentElement;
				if(_arr) {
					arr.push(_arr)
				}
				delete obj[i];
			}
			delete obj.length;
			Array.prototype.push.apply(obj, arr);
			return obj;
		},

		// parents 
		parents: function(selector) {
			selector = typeof selector === "string" ? selector : "";
			var arr = [];
			var obj = m(this);
			for(var i = 0; i < obj.length; i++) {

				var p = _searchParents(obj[i], function(elm) {
					return Mobile.checkSelector(elm, selector);
				});

				delete obj[i];
				if(p) {
					arr.push(p);

				}

			};
			delete obj.length;
			Array.prototype.push.apply(obj, arr);
			return obj;
		},

		// closest 
		closest: function(selector) {
			selector = typeof selector === "string" ? selector : "";
			var arr = [];
			var obj = m(this);
			for(var i = 0; i < obj.length; i++) {
				var p;
				if(Mobile.checkSelector(obj[i], selector)) {
					arr.push(obj[i]);
				} else {
					p = _searchParents(obj[i], function(elm) {
						return Mobile.checkSelector(elm, selector);
					});
				}
				delete obj[i];
				if(p) {
					arr.push(p);
				}
			};
			delete obj.length;
			Array.prototype.push.apply(obj, arr);
			return obj;
		},

		// eq 
		eq: function(index) {
			if(typeof index !== "number") {
				throw Error("index property must is number type")
			}
			var arr = [];
			var obj = m(this);
			for(var i = 0; i < obj.length; i++) {
				if(i === index) {
					arr.push(obj[i])
				}
				delete obj[i];
			}
			delete obj.length;

			Array.prototype.push.apply(obj, arr);
			return obj;
		},

		//  first
		first: function() {

			var arr = [];
			var obj = m(this);
			for(var i = 0; i < obj.length; i++) {
				if(i === 0) {
					arr.push(obj[i])
				}
				delete obj[i];
			}
			delete obj.length;
			Array.prototype.push.apply(obj, arr);
			return obj;
		},

		//  prev
		prev: function() {
			var arr = [];
			var obj = m(this);
			Mobile.each(obj, function(i, v) {
				var _prev = v.previousElementSibling;
				if(_prev) {
					arr.push(_prev)
				}
				delete v[i];
			});
			delete obj.length;
			Array.prototype.push.apply(obj, arr);
			return obj;
		},

		//  next
		next: function() {
			var arr = [];
			var obj = m(this);
			Mobile.each(obj, function(i, v) {
				var _next = v.nextElementSibling;
				if(_next) {
					arr.push(_next)
				}
				delete v[i];
			});
			delete obj.length;
			Array.prototype.push.apply(obj, arr);
			return obj;
		},

		//  siblings
		siblings: function() {
			var arr = [];
			var obj = m(this);
			Mobile.each(obj, function(i, v) {
				var _children = v.parentElement.children;
				var _index = m(v).index();

				for(var y = 0; y < _children.length; y++) {
					if(y !== _index) {
						arr.push(_children[y]);
					}
				}
				delete v[i];
			});
			delete obj.length;
			Array.prototype.push.apply(obj, arr);
			return obj;
		},

		//  last
		last: function() {

			var arr = [];
			var obj = m(this);
			for(var i = 0; i < obj.length; i++) {
				var _length = (obj.length > 0) ? obj.length - 1 : 0;
				if(i === _length) {
					arr.push(obj[i])
				}
				delete obj[i];
			}
			delete obj.length;
			Array.prototype.push.apply(obj, arr);
			return obj;
		},

		//  heigth
		height: function() {

			if(arguments.length === 0) {
				var _h = 0;
				Mobile.each(this, function(i, v) {

					// window

					if(this === window) {
						_h = window.innerHeight || window.document.documentElement.clientHeight || window.document.body.clientHeight;
					} else if(this === document) {
						_h = m(document.documentElement).css("height"); //document.documentElement.offsetHeight;
					} else {
						_h = m(this).css("height");
					}
					_h = parseFloat(_h);

					return false;

				});
				return _h;
			}

			// set
			else if(arguments.length === 1) {
				var _value = arguments[0]
				Mobile.each(this, function() {
					m(this).css("height", _value);

				});
			}
			return this;
		},

		//  outerHeight
		outerHeight: function() {

			if(arguments.length === 0) {
				var _h = 0;
				Mobile.each(this, function(i, v) {

					// window

					if(this === window) {
						_h = window.innerHeight || window.document.documentElement.clientHeight || window.document.body.clientHeight;
					} else if(this === document) {
						_h = m(document.documentElement).eq(0) && m(document.documentElement).eq(0)[0].offsetHeight; //document.documentElement.offsetHeight;
					} else {
						_h = m(this).eq(0) && m(this).eq(0)[0].offsetHeight;
					}
					_h = parseFloat(_h);

					return false;

				});
				return _h;
			}

			// set
			else if(arguments.length === 1) {
				var _value = arguments[0]
				Mobile.each(this, function() {
					m(this).css("height", _value);

				});
			}
			return this;
		},

		//  outWidth
		outerWidth: function() {

			if(arguments.length === 0) {
				var _w = 0;
				Mobile.each(this, function() {

					// window
					if(this === window) {
						_w = window.innerWidth || window.document.documentElement.clientWidth || window.document.body.clientWidth;
					} else if(this === document) {
						_w = m(document.documentElement).eq(0) && m(document.documentElement).eq(0)[0].offsetWidth; //document.documentElement.offsetWidth;

					} else {
						_w = m(this).eq(0) && m(this).eq(0)[0].offsetWidth;

					}
					_w = parseFloat(_w);
					return false;

				});

				return _w;

			}

			// set
			else if(arguments.length === 1) {
				var _value = arguments[0]
				Mobile.each(this, function() {
					m(this).css("width", _value);

				});
			}

			return this;
		},
		//  width
		width: function() {

			// get
			if(arguments.length === 0) {
				var _w = 0;
				Mobile.each(this, function() {

					// window
					if(this === window) {

						_w = window.innerWidth || window.document.documentElement.clientWidth || window.document.body.clientWidth;
					} else if(this === document) {
						_w = m(document.documentElement).css("width"); //document.documentElement.offsetWidth;

					} else {
						_w = m(this).css("width");
					}
					_w = parseFloat(_w);
					return false;

				});

				return _w;

			}

			// set
			else if(arguments.length === 1) {
				var _value = arguments[0]
				Mobile.each(this, function() {
					m(this).css("width", _value);

				});
			}

			return this;
		},

		// clientTop   目前高级浏览器支持都不一样   以后版本全部支持
		clientTop: function() {
			var _top = 0;
			Mobile.each(this, function() {
				_top = this.getBoundingClientRect().top;
				return false;
			});
			return _top;
		},

		// clientLeft 目前高级浏览器支持都不一样   以后版本全部支持
		clientLeft: function() {
			var _left = 0;
			Mobile.each(this, function() {
				_left = this.getBoundingClientRect().left;
				return false;
			});
			return _left;
		},

		// offsetTop
		offsetTop: function() {
			var _top = 0;
			Mobile.each(this, function() {
				_top = this.offsetTop;
				return false;
			});
			return _top;
		},

		// offsetLeft
		offsetLeft: function() {
			var _left = 0;
			Mobile.each(this, function() {
				_left = this.offsetLeft;

			});
			return _left;
		},

		// offset
		offset: function() {
			var obj = {};
			Mobile.each(this, function() {
				obj.left = this.offsetLeft;
				obj.top = this.offsetTop;

			});
			return obj;
		},

		// index
		index: function(obj) {
			var _index = -1;
			if(arguments.length === 0) {
				Mobile.each(this, function(i, v) {
					if(v.parentElement) {
						var els = v.parentElement.children;
						for(var i = 0; i < els.length; i++) {
							if(els[i].isEqualNode(v)) {
								_index = i;
							}
						}
					}

					return false;
				});
			}

			return _index;
		},

		//  remove
		remove: function(obj) {
			var arr = [];
			var $this = this;
			Mobile.each(this, function(i, v) {
				if(v.parentElement) {
					var els = this.parentElement;
					var _indexObj = els.removeChild(this);
					arr.push(_indexObj);
				}
				delete $this[i]
			});

			Array.prototype.push.apply(this, arr);
			return this;
		},

		//  append
		append: function(obj) {
			if(typeof obj === "object" && obj.length && obj.length > 0) {
				Mobile.each(this, function() {
					for(var i = 0; i < obj.length; i++) {
						this.appendChild(obj[i]);
					}
				});
			} else if(typeof obj === "string") {
				Mobile.each(this, function() {
					this.innerHTML += obj;

				});

			} else {
				Mobile.each(this, function() {
					this.appendChild(obj);
				});
			}

			return this;
		},

		//  prepend
		prepend: function(obj) {
			if(typeof obj === "object" && obj.length && obj.length > 0) {
				Mobile.each(this, function() {
					for(var i = obj.length; i > 0; i--) {
						this.insertBefore(obj[i - 1], this.childNodes[0]);
					}
				});
			} else if(typeof obj === "string") {
				var els = Mobile.htmlStringToDOM(obj);
				Mobile.each(this, function() {
					this.insertBefore(els, this.childNodes[0]);
				});

			} else {
				Mobile.each(this, function() {
					this.insertBefore(obj, this.childNodes[0]);
				});
			}

			return this;
		},

		//  clone
		clone: function(obj) {
			var _obj;
			Mobile.each(this, function() {
				_obj = this.cloneNode(true);
				return false;
			});
			return _obj;
		},

	});

	/*animate*/
	Mobile.fn.extend({

		// show
		show: function() {

			Mobile.each(this, function(i, el) {
				clearInterval(this.clearTimeId);
				this.isshow = true;
				var _showType = this.showValue || "none";
				var _nodeName = this.nodeName.toLowerCase();
				if(_showType === "none") {
					_showType = _getElementType(_nodeName);
				}

				this.style.display = _showType;
				this.style.opacity = 1;

			});
			return this;

		},

		// hide
		hide: function() {

			Mobile.each(this, function(i, el) {
				clearInterval(this.clearTimeId);
				this.isshow = false;
				var _v = m(this).css("display") || "none";
				this.showValue = _v;
				this.style.display = "none";
				this.style.opacity = 0;

			});
			return this;
		},

		// toggle
		toggle: function() {

			Mobile.each(this, function() {

				var _v = m(this).css("display") || "none";
				if(_v.trim() != "none") {
					m(this).hide();
				} else {
					m(this).show();
				}
			});
			return this;
		},

		// fadeIn
		fadeIn: function(time) {

			Mobile.each(this, function(i, el) {

				clearInterval(this.clearTimeId);
				var _showType = "";
				this.isshow = true;
				if(!this.firstclick) {
					this.firstclick = true;
					_showType = m(this).css("display") || "none";
					if(_showType === "none") {
						this.style.opacity = 0;
					} else {
						this.style.opacity = 1;
					}

				} else {
					_showType = this.showValue || "none";
					this.style.opacity = parseFloat(m(this).css("opacity")) || 0;

				}

				var _nodeName = this.nodeName.toLowerCase();
				var _opacity = parseFloat(m(this).css("opacity")) || 0;
				if(_showType == "none") {
					_showType = _getElementType(_nodeName);
				}

				this.style.display = _showType;
				this.showValue = _showType;
				time = typeof time === "number" ? time : 400;
				var opt = 1000;
				var fx = 30;
				var t = time / fx;
				var speed = opt / t;
				this.clearTimeId = setInterval(function() {
					var v = parseFloat(el.style.opacity) || 0;
					v = v * 1000;
					el.style.opacity = (speed + v) / 1000;
					v = (parseFloat(el.style.opacity) || 0) * 1000;

					if((v + speed) > opt) {
						el.style.opacity = opt / 1000;
						el.style.opacity = 1;
						el.style.display = _showType;
						clearInterval(this.clearTimeId);
					}
				}.bind(this), fx);

			});
			return this;

		},

		// fadeOut
		fadeOut: function(time) {

			Mobile.each(this, function(i, el) {
				clearInterval(this.clearTimeId);
				this.firstclick = true;
				this.isshow = false;
				var _v = m(this).css("display") || "none";
				if(_v != "none") {
					this.style.opacity = parseFloat(el.style.opacity) || 1;
				}
				this.showValue = _v;
				time = typeof time === "number" ? time : 400;
				var opt = 1000;
				var fx = 30;
				var t = time / fx;
				var speed = opt / t;
				this.clearTimeId = setInterval(function() {
					var v = parseFloat(el.style.opacity) || 0;
					v = v * 1000;
					el.style.opacity = (v - speed) / 1000;
					v = (parseFloat(el.style.opacity) || 0) * 1000;
					if((v - speed) < 0) {
						el.style.opacity = 0;
						el.style.display = "none";
						clearInterval(this.clearTimeId);
					}
				}.bind(this), fx);
			});
			return this;
		},

		// fadeToggle
		fadeToggle: function(time) {

			Mobile.each(this, function() {
				var _v = m(this).css("display") || "none";
				if(typeof this.isshow != "undefined") {
					if(this.isshow) {
						m(this).fadeOut(time);
						this.isshow = false;
					} else {
						m(this).fadeIn(time);
						this.isshow = true;
					}

				} else {
					if(_v != "none") {
						if(!this.firstclick) {
							m(this).fadeOut(time);
							this.isshow = false;
						} else {
							m(this).fadeIn(time);
							this.isshow = true;
						}
					} else {
						if(this.firstclick) {
							m(this).fadeOut(time);
							this.isshow = false;
						} else {
							m(this).fadeIn(time);
							this.isshow = true;
						}
					}

				}
			});
			return this;
		},

		//  windowTop
		windowTop: function(y, time) {

			// get
			if(arguments.length === 0) {
				return parseFloat(window.pageYOffset) || 0;
			}

			// set
			time = typeof time === "number" ? time : 400;
			y = typeof y === "number" ? y : parseFloat(y);
			y = isNaN(y) ? 0 : y;
			var fx = 20;
			var speed = 20;
			Mobile.each(this, function() {
				this.clearTimeId = this.clearTimeId || 0;
				clearInterval(this.clearTimeId);

				if(this !== window) {
					throw new Error("element must is window");
				}
				var speed1 = time / fx;
				var windowStartTop = parseFloat(window.pageYOffset) || 0;
				var speed2 = Math.abs(windowStartTop - y);
				speed = speed2 / speed1;

				if(windowStartTop > y) {
					this.clearTimeId = setInterval(function() {
						windowStartTop = (windowStartTop - speed);
						window.scrollTo(0, windowStartTop);
						if((windowStartTop - speed) < y) {
							window.scrollTo(0, y);
							clearInterval(this.clearTimeId);
						}

					}, fx);

				} else {
					if(windowStartTop === y) {
						return;
					}
					this.clearTimeId = setInterval(function() {
						windowStartTop = (windowStartTop + speed);
						window.scrollTo(0, windowStartTop);
						if((windowStartTop + speed) > y) {
							window.scrollTo(0, y);
							clearInterval(this.clearTimeId);
						}

					}, fx);
				}

				return false;
			});
			return this;
		},

		//  scrollTop
		scrollTop: function(size) {

			// get
			if(arguments.length === 0) {
				var _size = 0;
				Mobile.each(this, function() {
					if(this === window || this === document) {
						_size = window.pageYOffset || 0;
					} else {
						_size = this.scrollTop;
					}
					return false;
				});
				return _size;
			} else {
				Mobile.each(this, function() {
					if(this === window || this === document) {
						window.scrollTo(0, parseFloat(size));

					} else {
						this.scrollTop = parseFloat(size);
					}
				});

				// set
				return this;
			}
		},

		// transition
		transition: function(option, time, ease, delay, fn) {

			ease = typeof ease === "string" ? ease : "ease";
			delay = typeof delay === "number" ? delay : 0;
			var _transition = "all " + time / 1000 + "s  " + ease + " " + (delay / 1000) + "s";

			if(typeof option === "string") {

				if(arguments.length === 1) {
					_transition = option;
				} else if(arguments.length > 1) {
					_transition = option + " " + time / 1000 + "s  " + ease + " " + (delay / 1000) + "s";
				}

				Mobile.each(this, function() {
					this.style.MozTransition = _transition;
					this.style.msTransition = _transition;
					this.style.webkitTransition = _transition;
					this.style.OTransition = _transition;
					this.style.transition = _transition;

				});

				return this;
			}

			// option is object	
			if(typeof option != "object") {
				return;
			}
			Mobile.each(this, function(i, el) {
				time = typeof time === "number" ? time : 400;
				el.setTimeout = el.setTimeout || 0; // 第一次执行
				el.isEnd = el.isEnd || false; // 动画是否完毕

				if(el.isEnd === false) {

					// 第一次执行
					if(!el.isStart) {
						el.isStart = true;
						el.one = option; // 记录的第一次对象属性
						el.setTimeout = time + el.setTimeout + delay;
						el.style.MozTransition = _transition;
						el.style.msTransition = _transition;
						el.style.webkitTransition = _transition;
						el.style.OTransition = _transition;
						el.style.transition = _transition;
						for(var name in option) {
							el.style[name] = option[name];
						}

						//  第一次执行回调函数
						if(typeof fn === "function") {
							var clearTimeId2 = setTimeout(function() {
								fn(el);
								clearTimeout(clearTimeId2);
							}, time + delay)
						}

					} else {
						var clearTimeId = setTimeout(function() {

							el.style.MozTransition = _transition;
							el.style.msTransition = _transition;
							el.style.webkitTransition = _transition;
							el.style.OTransition = _transition;
							el.style.transition = _transition;

							for(var name in option) {
								el.style[name] = option[name];
							}
							//  执行回调函数
							if(typeof fn === "function") {
								var clearTimeId2 = setTimeout(function() {
									fn(el);
									clearTimeout(clearTimeId2);
								}, time + delay)
							}
							clearTimeout(clearTimeId);
						}, el.setTimeout);

						el.setTimeout = time + el.setTimeout + delay;

					}
				}

			});

			return this;
		},

		// transitionEnd
		transitionEnd: function(isReset, fn) {

			// 是否回复到第一次的状态
			//isReset = typeof isReset === "boolean" ? isReset : false;
			var $arguments = arguments;
			Mobile.each(this, function(i, el) {

				// 第一次执行
				el.setTimeout = el.setTimeout || 0;

				// 动画是否完毕
				el.isEnd = true;
				//console.log("========end=======")
				//	console.log(this.isEnd)

				// 动画是否完毕 回调函数
				var clearTimeId = setTimeout(function() {
					el.isEnd = false;
					el.setTimeout = 0;
					el.isStart = false;

					if(typeof isReset === "function") {
						isReset(el);
					} else if(typeof isReset === "boolean" && isReset === true) {

						for(var name in el.one) {
							el.style[name] = el.one[name];
						}
						var _v = "none";
						el.style.MozTransition = _v;
						el.style.msTransition = _v;
						el.style.webkitTransition = _v;
						el.style.OTransition = _v;
						el.style.transition = _v;
					}

					if(typeof fn === "function") {
						fn(el);
					}

				}, el.setTimeout + 20);

			});
		},

		// addAnimate
		addAnimate: function(name, duration, easing, delay, count, direction) {
			duration = typeof duration === "number" && duration !== 0 ? (duration / 1000) : 0.4;
			easing = typeof easing === "string" ? easing : "ease";
			delay = typeof delay === "number" && delay !== 0 ? (delay / 1000) : 0;
			count = count || 1;
			direction = typeof direction === "string" ? direction : "normal";

			var _animate = name + " " + duration + "s" + " " + easing + " " + delay + "s" + " " + count + " " + direction;
			Mobile.each(this, function(i, el) {
				this.style.webkitAnimation = _animate;
				this.style.msAnimation = _animate;
				this.style.MozAnimation = _animate;
				this.style.OAnimation = _animate;
				this.style.animate = _animate;
			});

			return this;

		},

		// removeAnimate
		removeAnimate: function(name) {
			var _v = "none";
			Mobile.each(this, function(i, el) {
				this.style.webkitAnimation = _v
				this.style.msAnimation = _v
				this.style.MozAnimation = _v
				this.style.OAnimation = _v
				this.style.animate = _v
			});
			return this;
		},

		// animateRuning
		animateRuning: function() {
			var run = "running";
			Mobile.each(this, function(i, el) {
				this.style.webkitAnimationPlayState = run;
				this.style.msAnimationPlayState = run;
				this.style.MozAnimationPlayState = run;
				this.style.OAnimationPlayState = run;
				this.style.animationPlayState = run;
			});
			return this;
		},

		// animateRuning
		animatePaused: function() {
			var paused = "paused";
			Mobile.each(this, function(i, el) {
				this.style.webkitAnimationPlayState = paused;
				this.style.msAnimationPlayState = paused;
				this.style.MozAnimationPlayState = paused;
				this.style.OAnimationPlayState = paused;
				this.style.animationPlayState = paused;

			});
			return this;
		},

		// animationFillMode
		animationFillMode: function(mode) {
			var mode = typeof mode === "string" ? mode : "forwards";
			Mobile.each(this, function(i, el) {
				this.style.webkitAnimationFillMode = mode;
				this.style.msAnimationFillMode = mode;
				this.style.MozAnimationFillMode = mode;
				this.style.OAnimationFillMode = mode;
				this.style.AnimationFillMode = mode;

			});
			return this;
		},

		// animateToggle
		animatePalyToggle: function() {

			Mobile.each(this, function(i, el) {
				var _state = m(this).css("animation-play-state") || "";

				if(_state.trim() === "paused") {
					m(this).animateRuning();
				} else {
					m(this).animatePaused();
				}

			});
			return this;
		},

	});

	// bind enevt 绑定事件
	Mobile.fn.extend({
		on: function(type) {

			var $this = this;
			var isonebind = $this.length > 0 && $this.bindOneElementEvent ? true : false; // m(el).one()只绑定一次事件

			// 正常绑定事件
			if(arguments.length >= 2 && typeof arguments[1] === "function") {
				var handler = arguments[1];
				var bl = typeof arguments[2] === "boolean" ? arguments[2] : false;

				function f(event) {
					handler.call(this, event);

					// m(el).one()只绑定一次事件
					if(isonebind) {
						m(this).off(type, f, bl);
						m.events.on(type, f);
						$this.bindOneElementEvent = false;
					}
				}

				Mobile.each(this, function() {
					if(this.addEventListener) {
						this.addEventListener(type, f, bl);
					}
					//ie8
					//					else if(this.attachEvent) {
					//						this.attachEvent("on" + type, f, bl)
					//					} else {
					//						this["on" + type] =f /*直接赋给事件*/
					//					}
				});

				m.events.on(type, f);
			}

			// 正常绑定事件传object值
			if(arguments.length >= 3 && typeof arguments[1] === "object" && typeof arguments[2] === "function") {
				var obj = arguments[1]
				var handler = arguments[2];
				var bl = typeof arguments[3] === "boolean" ? arguments[3] : false;

				function f(event) {
					event.data = obj;
					handler.call(this, event);

					// m(el).one()只绑定一次事件
					if(isonebind) {
						m(this).off(type, f, bl);
						m.events.on(type, f);
						$this.bindOneElementEvent = false;
					}
				}

				Mobile.each(this, function() {
					if(this.addEventListener) {
						this.addEventListener(type, f, bl);
					}

				});

				m.events.on(type, f);
			}

			// 委托绑定事件
			if(arguments.length >= 3 && typeof arguments[1] === "string" && typeof arguments[2] === "function") {
				var el = arguments[1].trim();
				var handler = arguments[2];
				var bl = typeof arguments[3] === "boolean" ? arguments[3] : false;

				function f(event) {
					if(Mobile.checkSelector(event.target, el)) {
						handler.call(event.target, event);

						// m(el).one()只绑定一次事件
						if(isonebind) {
							m(this).off(type, f, bl);
							m.events.on(type, f);
							$this.bindOneElementEvent = false;
						}
					}
				}
				Mobile.each(this, function() {
					if(this.addEventListener) {
						this.addEventListener(type, f, bl);
					}
				});

				m.events.on(type, f);
			}

			// 委托绑定事件传object值
			if(arguments.length >= 4 && typeof arguments[1] === "string" && typeof arguments[2] === "object" && typeof arguments[
					3] === "function") {
				var el = arguments[1].trim();
				var obj = arguments[2];
				var handler = arguments[3];
				var bl = typeof arguments[4] === "boolean" ? arguments[4] : false;

				function f(event) {
					if(Mobile.checkSelector(event.target, el)) {
						event.data = obj;
						handler.call(event.target, event);

						// m(el).one()只绑定一次事件
						if(isonebind) {
							m(this).off(type, f, bl);
							m.events.on(type, f);
							$this.bindOneElementEvent = false;
						}
					}

				}
				Mobile.each(this, function() {
					if(this.addEventListener) {
						this.addEventListener(type, f, bl);
					}
				});

				m.events.on(type, f);
			}

			return this;

		},

		off: function(type, handler) {

			if(arguments.length === 1) {
				Mobile.each(this, function() {
					for(var i = m.events.props[type].length - 1; i >= 0; i--) {

						if(this.removeEventListener) {
							this.removeEventListener(type, m.events.props[type][i], false);
						} else {
							this.deattachEvent("on" + type, m.events.props[type][i]);
						}

						Mobile.events.off(type, m.events.props[type][i]);
					}
				});

				return;
			}
			Mobile.each(this, function() {
				if(this.removeEventListener)
					this.removeEventListener(type, handler, false);
				else if(this.deattachEvent) { /*IE*/
					this.deattachEvent('on' + type, handler);
				} else {

					// 直接赋给事件
					this["on" + type] = null;

				}
				Mobile.events.off(type, handler);
			});

			return this;

		},

		// 自定义事件
		trigger: function(type, obj) {

			Mobile.each(this, function() {
				obj = obj || {};
				var btnEvent = document.createEvent("CustomEvent");
				btnEvent.initCustomEvent(type, true, false, obj);
				this.dispatchEvent(btnEvent);
			});

		},

		emit: function(type, obj) {
			Mobile.each(this, function() {
				m(this).trigger(type, obj);
			});
		},

		one: function() {
			var args = arguments;
			var $this = this;

			//  只绑定一次事件
			this.bindOneElementEvent = true;
			Mobile.each($this, function(i, v) {
				m(this).on.apply($this, args);

			});
		},

		// click
		click: function(fn, bl) {

			if(arguments.length === 0) {
				Mobile.each(this, function() {
					this.click(); // 原生触发
				});
				return this;
			}

			bl = bl || false;
			Mobile.each(this, function() {
				m(this).on("click", fn, bl);
			});
		},

		// dblclick
		dblclick: function(fn, bl) {
			bl = bl || false;
			Mobile.each(this, function() {
				m(this).on("dblclick", fn, bl);
			});
		},
		//  blur
		blur: function(fn, bl) {
			if(arguments.length === 0) {
				$(this).each(function() {
					this.blur(); // 原生触发

				});
				return this;
			}

			bl = bl || false;
			Mobile.each(this, function() {
				m(this).on("blur", fn, bl);
			});
		},

		// focus
		focus: function(fn, bl) {
			if(arguments.length === 0) {
				$(this).each(function() {
					this.focus(); // 原生触发

				});
				return this;
			}
			bl = bl || false;
			Mobile.each(this, function() {
				m(this).on("focus", fn, bl);
			});
		},

		// touchstart
		touchstart: function(fn, bl) {
			bl = bl || false;
			Mobile.each(this, function() {
				m(this).on("touchstart", fn, bl);
			});
		},

		// touchmove
		touchmove: function(fn, bl) {
			bl = bl || false;
			Mobile.each(this, function() {
				m(this).on("touchmove", fn, bl);
			});
		},

		// touchend
		touchend: function(fn, bl) {
			bl = bl || false;
			Mobile.each(this, function() {
				m(this).on("touchend", fn, bl);
			});
		},

		// touchcancel
		touchcancel: function(fn, bl) {
			bl = bl || false;
			Mobile.each(this, function() {
				m(this).on("touchcancel", fn, bl);
			});
		},

		// touchend 和 touchcancel 同时绑定事件
		touchendcancel: function(fn, bl) {
			bl = bl || false;
			Mobile.each(this, function() {
				m(this).on("touchend", fn, bl);
				m(this).on("touchcancel", fn, bl);
			});
		},

		// window canel 绑定事件
		windowcancel: function(fn) {
			var $this = this[0] || {};
			m(window).on("touchstart", function(event) {

				m(event.target).one("touchend", function(event) {
					fn.call($this, event);

				});

			});
		},

		// tap
		tap: function() {
			var args = arguments;
			var fn = function() {};
			var deletage = "";
			var bl = false;

			Mobile.each(this, function(i, v) {

				var isMOve = true; // 判断是否往上拖动
				var isMOveFirst = true;

				var startX = 0;
				var startY = 0;
				var isDeleDageTarget = true; // 是否是委托事件

				function start(event) {
					event.preventDefault();
					isMOve = true;
					isMOveFirst = true;
					var touch = event.changedTouches[0];
					startX = touch.clientX;
					startY = touch.clientY;
				}

				function move(event) {
					event.preventDefault();
					var touch = event.changedTouches[0];
					var nowX = touch.clientX;
					var nowY = touch.clientY;
					var _x = Math.abs(nowX - startX);
					var _y = Math.abs(nowY - startY);
					if((_x > 1 || _y > 1) && isMOveFirst) {
						isMOve = false;
						isMOveFirst = false;
					}
				}

				function end(event) {
					event.preventDefault();
					var _target;
					if(isDeleDageTarget) {
						_target = this;
					} else {
						_target = event.target;
					}
					if(isMOve) {
						if(typeof fn === "function") {
							fn.call(_target, event);
						}
					}
				}

				// 使用事件	
				if(args.length >= 1 && typeof args[0] === "function") {
					fn = args[0];
					bl = args[1] || false;
					isDeleDageTarget = true;

					m(this).on("touchstart", start, bl);
					m(this).on("touchmove", move, bl);
					m(this).on("touchend", end, bl);
				}

				// 使用委托事件	
				else if(args.length >= 2 && typeof args[0] === "string" && typeof args[1] === "function") {
					deletage = args[0];
					fn = args[1];
					bl = args[2] || false;
					isDeleDageTarget = false;

					m(this).on("touchstart", deletage, start, bl);
					m(this).on("touchmove", deletage, move, bl);
					m(this).on("touchend", deletage, end, bl);
				}

				// 使用事件data		
				else if(args.length >= 2 && typeof args[0] === "object" && typeof args[1] === "function") {
					fn = args[1];
					bl = args[2] || false;
					var obj = args[0]
					isDeleDageTarget = true;
					m(this).on("touchstart", obj, start, bl);
					m(this).on("touchmove", obj, move, bl);
					m(this).on("touchend", obj, end, bl);
				}

				// 使用委托事件传值data	
				else if(args.length >= 3 && typeof args[0] === "string" && typeof args[1] === "object" && typeof args[2] ===
					"function") {
					deletage = args[0];
					var obj = args[1]
					fn = args[2];
					bl = args[3] || false;
					isDeleDageTarget = false;

					m(this).on("touchstart", deletage, obj, start, bl);
					m(this).on("touchmove", deletage, obj, move, bl);
					m(this).on("touchend", deletage, obj, end, bl);
				}

			});
		},

		// scroll
		scroll: function(fn, bl) {
			bl = bl || false;
			Mobile.each(this, function() {
				m(this).on("scroll", fn, bl);
			});
		},

		// resize
		resize: function(fn, bl) {
			bl = bl || false;
			Mobile.each(this, function() {
				m(this).on("resize", fn, bl);
			});
		},

		// change
		change: function(fn, bl) {
			bl = bl || false;
			Mobile.each(this, function() {
				m(this).on("change", fn, bl);
			});
		},

		// keyup
		keyup: function(fn, bl) {
			bl = bl || false;
			Mobile.each(this, function() {
				m(this).on("keyup", fn, bl);
			});
		},

		// keyup
		keydown: function(fn, bl) {
			bl = bl || false;
			Mobile.each(this, function() {
				m(this).on("keydown", fn, bl);
			});
		},

		// keypress
		keypress: function(fn, bl) {
			bl = bl || false;
			Mobile.each(this, function() {
				m(this).on("keypress", fn, bl);
			});
		},
	});

	/***添加自定义事件的函数***/
	Mobile.extend({
		events: {
			props: {},

			// bind events
			on: function(eventName, fn) {
				this.props[eventName] = this.props[eventName] || [];
				this.props[eventName].push(fn);
			},
			off: function(eventName, fn) {
				if(arguments.length === 1) {

					this.props[eventName] = [];

				} else if(arguments.length === 2) {
					var $events = this.props[eventName] || [];
					for(var i = 0; i < $events.length; i++) {
						if($events[i] === fn) {
							$events.splice(i, 1);
							break;
						}

					}

				}

			},

			/*执行自定的函数*/
			// 			emit: function(eventName, data) {
			// 				if (this.props[eventName]) {
			// 					for (var i = 0; i < this.props[eventName].length; i++) {
			// 						this.props[eventName][i](data);
			// 					}
			// 
			// 				}
			// 		}
		}
	});

	// transform 
	Mobile.fn.extend({

		// setTransform
		setTransform: function(transforName, value) {

			Mobile.each(this, function() {
				if(!this.transform) {
					this.transform = {};
				}
				this.transform[transforName] = value;
				var result = '';

				for(var item in this.transform) {
					switch(item) {
						case 'rotate':
						case 'rotateX':
						case 'rotateY':
						case 'rotateZ':
						case 'skewX':
						case 'skewY':
						case 'skewZ':
							result += item + '(' + parseFloat(this.transform[item]) + 'deg)  ';
							break;
						case 'skew':
							var arrs = this.transform[item].split(",");
							if(arrs.length === 2) {
								result += item + '(' + parseFloat(arrs[0]) + 'deg,' + parseFloat(arrs[1]) + 'deg)  ';
							} else {
								result += item + '(' + parseFloat(arrs) + 'deg,' + 0 + 'deg)  ';
							}
							break;

						case 'scaleX':
						case 'scaleY':
						case 'scaleZ':
							result += item + '(' + parseFloat(this.transform[item]) + ')  ';
							break;

						case 'scale':
							var arrs = this.transform[item].split(",");

							if(arrs.length === 2) {
								result += item + '(' + parseFloat(arrs[0]) + ',' + parseFloat(arrs[1]) + ')  ';
							} else {
								result += item + '(' + parseFloat(arrs) + ',' + parseFloat(arrs) + ')  ';
							}
							break;

						case 'translateX':
						case 'translateY':
						case 'translateZ':
							result += item + '(' + parseFloat(this.transform[item]) + 'px)  ';
							break;
						case 'translate':
							var arrs = this.transform[item].split(",");

							if(arrs.length === 2) {
								result += item + '(' + parseFloat(arrs[0]) + 'px,' + parseFloat(arrs[1]) + 'px)  ';
							} else {
								result += item + '(' + parseFloat(arrs) + 'px,' + 0 + 'px)  ';
							}
							break;

					};

				};

				this.style.WebkitTransform = result;
				this.style.MozTransform = result;
				this.style.msTransform = result;
				this.style.OTransform = result;
				this.style.transform = result;

			});

			return this;
		},

		// getTransform
		getTransform: function(transforName) {

			var result = 0;
			Mobile.each(this, function() {
				if(!this.transform) {
					this.transform = {};
				}

				//读
				if(typeof this.transform[transforName] == 'undefined') {
					if(transforName == 'scale' || transforName == 'scaleX' || transforName == 'scaleY') {
						result = 1
						if(transforName === "scale") {
							result = [1, 1];
						}

					} else {
						result = 0;
						if(transforName === "skew" || transforName === "translate") {
							result = [0, 0];
						}
					}

				} else {
					if(transforName === "skew" || transforName === "translate" || transforName === "scale") {
						var strs = this.transform[transforName].split(",");
						var arrs = [];
						for(var y = 0; y < strs.length; y++) {
							var v = parseFloat(strs[y]);
							if(transforName === "scale") {
								v = isNaN(v) ? 1 : v;

							} else {
								v = isNaN(v) ? 0 : v;
							}

							arrs.push(v);
						}

						if(arrs.length === 1) {
							if(transforName === "scale") {
								arrs.push(arrs[0]);
							} else {
								arrs.push(0);
							}
						}
						result = arrs;

					} else {
						result = parseFloat(this.transform[transforName]);
					}

				}

			});

			return result;
		},

	});

	/* ajax  start*/

	;(function($) {

		var isString = function(obj) {
			return typeof obj == 'string'
		};

		function returnTrue() {
			return true;
		}

		function returnFalse() {
			return false;
		}
		var specialEvents = {};
		$.Event = function(type, props) {
			if(!isString(type)) props = type, type = props.type
			var event = document.createEvent(specialEvents[type] || 'Events'),
				bubbles = true
			if(props)
				for(var name in props)(name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])
			event.initEvent(type, bubbles, true)
			return compatible(event)
		};

		function compatible(event, source) {
			if(source || !event.isDefaultPrevented) {
				source || (source = event)

				$.eachObj(eventMethods, function(name, predicate) {
					var sourceMethod = source[name]
					event[name] = function() {
						this[predicate] = returnTrue
						return sourceMethod && sourceMethod.apply(source, arguments)
					}
					event[predicate] = returnFalse
				})

				event.timeStamp || (event.timeStamp = Date.now())

				if(source.defaultPrevented !== undefined ? source.defaultPrevented :
					'returnValue' in source ? source.returnValue === false :
					source.getPreventDefault && source.getPreventDefault())
					event.isDefaultPrevented = returnTrue
			}
			return event;
		};

		var eventMethods = {
			preventDefault: 'isDefaultPrevented',
			stopImmediatePropagation: 'isImmediatePropagationStopped',
			stopPropagation: 'isPropagationStopped'
		};

		var jsonpID = +new Date(),
			document = window.document,
			key,
			name,
			rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
			scriptTypeRE = /^(?:text|application)\/javascript/i,
			xmlTypeRE = /^(?:text|application)\/xml/i,
			jsonType = 'application/json',
			htmlType = 'text/html',
			blankRE = /^\s*$/,
			originAnchor = document.createElement('a');
			originAnchor.href = window.location.href;

		// trigger a custom event and return false if it was cancelled
		function triggerAndReturn(context, eventName, data) {
			var event = $.Event(eventName)
			$(context).trigger(event, data);
			return  !event.isDefaultPrevented()
		}

		// trigger an Ajax "global" event
		function triggerGlobal(settings, context, eventName, data) {
			if(settings.global) return triggerAndReturn(context || document, eventName, data)
		}

		// Number of active Ajax requests
		$.active = 0

		function ajaxStart(settings) {
			if(settings.global && $.active++ === 0) triggerGlobal(settings, null, 'ajaxStart')
		}

		function ajaxStop(settings) {
			if(settings.global && !(--$.active)) triggerGlobal(settings, null, 'ajaxStop')
		}

		// triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
		function ajaxBeforeSend(xhr, settings) {
			var context = settings.context
			if(settings.beforeSend.call(context, xhr, settings) === false ||
				triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false)
				return false

			triggerGlobal(settings, context, 'ajaxSend', [xhr, settings])
		}

		function ajaxSuccess(data, xhr, settings, deferred) {
			var context = settings.context,
				status = 'success'
			settings.success.call(context, data, status, xhr)
			if(deferred) deferred.resolveWith(context, [data, status, xhr])
			triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data])
			ajaxComplete(status, xhr, settings)
		}
		// type: "timeout", "error", "abort", "parsererror"
		function ajaxError(error, type, xhr, settings, deferred) {
			var context = settings.context
			settings.error.call(context, xhr, type, error)
			if(deferred) deferred.rejectWith(context, [xhr, type, error])
			triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error || type])
			ajaxComplete(type, xhr, settings)
		}
		// status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
		function ajaxComplete(status, xhr, settings) {
			var context = settings.context
			settings.complete.call(context, xhr, status)
			triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings])
			ajaxStop(settings)
		}

		function ajaxDataFilter(data, type, settings) {
			if(settings.dataFilter == empty) return data
			var context = settings.context
			return settings.dataFilter.call(context, data, type)
		}

		// Empty function, used as default callback
		function empty() {}

		$.ajaxJSONP = function(options, deferred) {
			if(!('type' in options)) return $.ajax(options)

			var _callbackName = options.jsonpCallback,
				callbackName = ($.isFunction(_callbackName) ?
					_callbackName() : _callbackName) || ('Mobile' + (jsonpID++)),
				script = document.createElement('script'),
				originalCallback = window[callbackName],
				responseData,
				abort = function(errorType) {
					$(script).triggerHandler('error', errorType || 'abort')
				},
				xhr = {
					abort: abort
				},
				abortTimeout

			if(deferred) deferred.promise(xhr)

			$(script).on('load error', function(e, errorType) {
				clearTimeout(abortTimeout)
				$(script).off().remove()

				if(e.type == 'error' || !responseData) {
					ajaxError(null, errorType || 'error', xhr, options, deferred)
				} else {
					ajaxSuccess(responseData[0], xhr, options, deferred)
				}

				window[callbackName] = originalCallback
				if(responseData && $.isFunction(originalCallback))
					originalCallback(responseData[0])

				originalCallback = responseData = undefined
			})

			if(ajaxBeforeSend(xhr, options) === false) {
				abort('abort')
				return xhr
			}

			window[callbackName] = function() {
				responseData = arguments
			}

			script.src = options.url.replace(/\?(.+)=\?/, '?$1=' + callbackName)
			document.head.appendChild(script)

			if(options.timeout > 0) abortTimeout = setTimeout(function() {
				abort('timeout')
			}, options.timeout)

			return xhr
		}

		$.ajaxSettings = {
			// Default type of request
			type: 'GET',
			// Callback that is executed before request
			beforeSend: empty,
			// Callback that is executed if the request succeeds
			success: empty,
			// Callback that is executed the the server drops error
			error: empty,
			// Callback that is executed on request complete (both: error and success)
			complete: empty,
			// The context for the callbacks
			context: null,
			// Whether to trigger "global" Ajax events
			global: true,
			// Transport
			xhr: function() {
				return new window.XMLHttpRequest()
			},
			// MIME types mapping
			// IIS returns Javascript as "application/x-javascript"
			accepts: {
				script: 'text/javascript, application/javascript, application/x-javascript',
				json: jsonType,
				xml: 'application/xml, text/xml',
				html: htmlType,
				text: 'text/plain'
			},
			// Whether the request is to another domain
			crossDomain: false,
			// Default timeout
			timeout: 0,
			// Whether data should be serialized to string
			processData: true,
			// Whether the browser should be allowed to cache GET responses
			cache: true,
			//Used to handle the raw response data of XMLHttpRequest.
			//This is a pre-filtering function to sanitize the response.
			//The sanitized response should be returned
			dataFilter: empty
		}

		function mimeToDataType(mime) {
			if(mime) mime = mime.split(';', 2)[0]
			return mime && (mime == htmlType ? 'html' :
				mime == jsonType ? 'json' :
				scriptTypeRE.test(mime) ? 'script' :
				xmlTypeRE.test(mime) && 'xml') || 'text'
		}

		function appendQuery(url, query) {
			if(query == '') return url
			return(url + '&' + query).replace(/[&?]{1,2}/, '?')
		}

		// serialize payload and append it to the URL for GET requests
		function serializeData(options) {
			if(options.processData && options.data && $.type(options.data) != "string")
				options.data = $.param(options.data, options.traditional)
			if(options.data && (!options.type || options.type.toUpperCase() == 'GET' || 'jsonp' == options.dataType))
				options.url = appendQuery(options.url, options.data), options.data = undefined
		}

		$.ajax = function(options) {
			var settings = $.extend({}, options || {}),
				deferred = $.Deferred && $.Deferred(),
				urlAnchor, hashIndex
			for(key in $.ajaxSettings)
				if(settings[key] === undefined) settings[key] = $.ajaxSettings[key]

			ajaxStart(settings)

			if(!settings.crossDomain) {
				urlAnchor = document.createElement('a')
				urlAnchor.href = settings.url
				// cleans up URL for .href (IE only), see https://github.com/madrobby/Mobile/pull/1049
				urlAnchor.href = urlAnchor.href
				settings.crossDomain = (originAnchor.protocol + '//' + originAnchor.host) !== (urlAnchor.protocol + '//' + urlAnchor.host)
			}

			if(!settings.url) settings.url = window.location.toString()
			if((hashIndex = settings.url.indexOf('#')) > -1) settings.url = settings.url.slice(0, hashIndex)
			serializeData(settings)

			var dataType = settings.dataType,
				hasPlaceholder = /\?.+=\?/.test(settings.url)
			if(hasPlaceholder) dataType = 'jsonp'

			if(settings.cache === false || (
					(!options || options.cache !== true) &&
					('script' == dataType || 'jsonp' == dataType)
				))
				settings.url = appendQuery(settings.url, '_=' + Date.now())

			if('jsonp' == dataType) {
				if(!hasPlaceholder)
					settings.url = appendQuery(settings.url,
						settings.jsonp ? (settings.jsonp + '=?') : settings.jsonp === false ? '' : 'callback=?')
				return $.ajaxJSONP(settings, deferred)
			}

			var mime = settings.accepts[dataType],
				headers = {},
				setHeader = function(name, value) {
					headers[name.toLowerCase()] = [name, value]
				},
				protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
				xhr = settings.xhr(),
				nativeSetHeader = xhr.setRequestHeader,
				abortTimeout

			if(deferred) deferred.promise(xhr)

			if(!settings.crossDomain) setHeader('X-Requested-With', 'XMLHttpRequest')
			setHeader('Accept', mime || '*/*')
			if(mime = settings.mimeType || mime) {
				if(mime.indexOf(',') > -1) mime = mime.split(',', 2)[0]
				xhr.overrideMimeType && xhr.overrideMimeType(mime)
			}
			if(settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET'))
				setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded')

			if(settings.headers)
				for(name in settings.headers) setHeader(name, settings.headers[name])
			xhr.setRequestHeader = setHeader

			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4) {
					xhr.onreadystatechange = empty
					clearTimeout(abortTimeout)
					var result, error = false
					if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {
						dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'))

						if(xhr.responseType == 'arraybuffer' || xhr.responseType == 'blob')
							result = xhr.response
						else {
							result = xhr.responseText

							try {
								// http://perfectionkills.com/global-eval-what-are-the-options/
								// sanitize response accordingly if data filter callback provided
								result = ajaxDataFilter(result, dataType, settings)
								if(dataType == 'script')(1, eval)(result)
								else if(dataType == 'xml') result = xhr.responseXML
								else if(dataType == 'json') result = blankRE.test(result) ? null : JSON.parse(result)
								
							} catch(e) {
								error = e
							}

							if(error) return ajaxError(error, 'parsererror', xhr, settings, deferred)
						}

						ajaxSuccess(result, xhr, settings, deferred)
					} else {
						ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings, deferred)
					}
				}
			}

			if(ajaxBeforeSend(xhr, settings) === false) {
				xhr.abort()
				ajaxError(null, 'abort', xhr, settings, deferred)
				return xhr
			}

			var async = 'async' in settings ? settings.async : true
			xhr.open(settings.type, settings.url, async, settings.username, settings.password)

			if(settings.xhrFields)
				for(name in settings.xhrFields) xhr[name] = settings.xhrFields[name]

			for(name in headers) nativeSetHeader.apply(xhr, headers[name])

			if(settings.timeout > 0) abortTimeout = setTimeout(function() {
				xhr.onreadystatechange = empty
				xhr.abort()
				ajaxError(null, 'timeout', xhr, settings, deferred)
			}, settings.timeout)

			// avoid sending empty string (#319)
			xhr.send(settings.data ? settings.data : null)
			return xhr
		}

		// handle optional data/success arguments
		function parseArguments(url, data, success, dataType) {
			if($.isFunction(data)) dataType = success, success = data, data = undefined
			if(!$.isFunction(success)) dataType = success, success = undefined
			return {
				url: url,
				data: data,
				success: success,
				dataType: dataType
			}
		}

		$.get = function( /* url, data, success, dataType */ ) {
			return $.ajax(parseArguments.apply(null, arguments))
		}

		$.post = function( /* url, data, success, dataType */ ) {
			var options = parseArguments.apply(null, arguments)
			options.type = 'POST'
			return $.ajax(options)
		}

		$.getJSON = function( /* url, data, success */ ) {
			var options = parseArguments.apply(null, arguments)
			options.dataType = 'json'
			return $.ajax(options)
		}

		$.fn.load = function(url, data, success) {
			if(!this.length) return this
			var self = this,
				parts = url.split(/\s/),
				selector,
				options = parseArguments(url, data, success),
				callback = options.success
			if(parts.length > 1) options.url = parts[0], selector = parts[1]
			options.success = function(response) {
				self.html(selector ?
					$('<div>').html(response.replace(rscript, "")).find(selector) :
					response)
				callback && callback.apply(self, arguments)
			}
			$.ajax(options)
			return this
		}

		var escape = encodeURIComponent

		function serialize(params, obj, traditional, scope) {
			var type, array = $.isArray(obj),
				hash = $.isPlainObject(obj)
			$.eachObj(obj, function(key, value) {
				type = $.type(value)
				if(scope) key = traditional ? scope :
					scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']'
				// handle data in serializeArray() format
				if(!scope && array) params.add(value.name, value.value)
				// recurse into nested objects
				else if(type == "array" || (!traditional && type == "object"))
					serialize(params, value, traditional, key)
				else params.add(key, value)
			})
		}

		$.param = function(obj, traditional) {
			var params = []
			params.add = function(key, value) {
				if($.isFunction(value)) value = value()
				if(value == null) value = ""
				this.push(escape(key) + '=' + escape(value))
			}
			serialize(params, obj, traditional)
			return params.join('&').replace(/%20/g, '+')
		}
	})(m);

	/*ajax-end*/

	return mobile;

});