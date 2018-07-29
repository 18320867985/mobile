(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.mobileui = {})));
}(this, (function (exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

/*
 *	移动端 公共类库
 */

(function () {

	var _mobile = window.mobile = window.m;
	var _$ = window.$;

	/*创建mobile对象*/
	var Mobile = window.$ = window.m = window.mobile = function (selector, content) {

		if (typeof selector === "function" && arguments.length === 1) {
			Mobile.ready(selector);
			return;
		}
		return new Mobile.fn.init(selector, content);
	};

	Mobile.version = "1.0.0"; // 版本号
	Mobile.numberList = ["left", "top", "right", "bottom", "width", "height"]; // 可计算值 的列表

	/*私有函数*/
	var _block = ["body", "div", "p", "table", "tr", "thead", "tbody", "tfoot", "h1", "h2", "h3", "h4", "h5", "h6", "article", "aside", "details", "figcaption", "figure", "footer", "header", "hgroup", "main", "menu", "nav", "section", "summary", "ul", "li", "ol", "dl", "dt", "dd", "fieldset"];
	var _inlineBlock = ["img", "audio", "canvas", "progress", "video", "text-area", "select", "input", "button"];

	// 查找元素显示类型
	function _getElementType(nodeName) {
		var _type = "inline";

		// block
		Mobile.each(_block, function (i, v) {
			if (v === nodeName) {
				_type = "block";
				return false;
			}
		});

		// inlineblock
		Mobile.each(_inlineBlock, function (i, v) {
			if (v === nodeName) {
				_type = "inline-block";
				return false;
			}
		});

		return _type;
	}

	// 递归查找父元素
	function _searchParents(el, fn) {

		if (el.parentElement) {
			if (fn(el.parentElement)) {
				return el.parentElement;
			}
		}

		if ((el.nodeName || "").toLowerCase() === "html") {
			return;
		}

		return _searchParents(el.parentElement, fn);
	}

	// prototype
	Mobile.fn = Mobile.prototype = {

		init: function init(selector, content) {

			var arrs = [];
			this.length = 0; // init length=0;
			if (!content) {

				// 字符串
				if (typeof selector === "string") {
					if (selector.trim().length === 0) {
						return this;
					}
					var els = document.querySelectorAll(selector);
					Array.prototype.push.apply(this, els);
				} else if ((typeof selector === "undefined" ? "undefined" : _typeof(selector)) === "object") {

					// 遍历数组型对象
					if (selector.hasOwnProperty("length") && selector.length > 0) {
						Mobile.each(selector, function (i, v) {
							arrs.push(v);
						});
					} else if (selector.nodeType === Node.ELEMENT_NODE || selector.nodeType === Node.DOCUMENT_NODE || selector === window) {
						// 单例对象 
						arrs.push(selector);
					}
					Array.prototype.push.apply(this, arrs);
				}
			} else {

				if (typeof content === "string" && typeof selector === "string") {

					if (content.trim().length === 0) {
						return this;
					}
					if (selector.trim().length === 0) {
						return this;
					}

					var p = document.querySelectorAll(content);
					Mobile.each(p, function () {
						var childElements = this.querySelectorAll(selector);
						for (var i = 0; i < childElements.length; i++) {
							arrs.push(childElements[i]);
						}
					});
					Array.prototype.push.apply(this, arrs);
				} else if ((typeof content === "undefined" ? "undefined" : _typeof(content)) === "object" && typeof selector === "string") {
					if (selector.trim().length === 0) {
						return this;
					}
					// 遍历数组型对象
					if (content.hasOwnProperty("length") && content.length > 0) {

						Mobile.each(content, function () {
							var childElements = this.querySelectorAll(selector);
							for (var i = 0; i < childElements.length; i++) {
								arrs.push(childElements[i]);
							}
						});
						Array.prototype.push.apply(this, arrs);
					} else if (content.nodeType === Node.ELEMENT_NODE || content.nodeType === Node.DOCUMENT_NODE) {
						var childElements = content.querySelectorAll(selector);
						Array.prototype.push.apply(this, childElements);
					}
				}
			}
			return this;
		}

		// 将init函数作为实例化的mobile原型。 
	};Mobile.fn.init.prototype = Mobile.fn;

	Mobile.extend = Mobile.fn.extend = function (obj) {
		if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object") {
			for (var i in obj) {
				this[i] = obj[i];
			}
		}

		return this;
	};

	/*extend instantiation function 实例方法*/
	Mobile.fn.extend({

		//each
		each: function each(fn) {
			Mobile.each(this, fn);
		},

		// css
		css: function css(attr, value) {

			// get  返回第一个一个值
			if (arguments.length === 1 && typeof attr === "string") {

				var _css = "";
				Mobile.each(this, function (i, v) {

					if (window.getComputedStyle) {
						_css = window.getComputedStyle(v, null)[attr.trim()];
						if (Mobile.isEqual(Mobile.numberList, attr.trim())) {
							_css = parseFloat(_css) || 0;
						}
					}
					// ie8
					else if (v.currentStyle) {
							_css = v.currentStyle[attr];
						} else {
							_css = v.style[attr];
						}

					return false;
				});
				return _css;
			}

			// set
			if (arguments.length === 2) {

				Mobile.each(this, function () {
					if (Mobile.isEqual(Mobile.numberList, attr.trim())) {
						this.style[attr.trim()] = Number(value) ? Number(value).toString() + "px" : value;
					} else {
						this.style[attr.trim()] = value;
					}
				});
			}

			//set 对象的值
			if (arguments.length === 1 && (typeof attr === "undefined" ? "undefined" : _typeof(attr)) === "object") {
				Mobile.each(this, function (i, v) {
					for (var _attr in attr) {
						if (Mobile.isEqual(Mobile.numberList, _attr.trim())) {
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
		find: function find(selector) {
			var arr = [];
			var obj = m(this);
			for (var i = 0; i < obj.length; i++) {
				var _arr = obj[i].querySelectorAll(selector);
				Mobile.each(_arr, function (i, v) {
					arr.push(v);
				});
				delete obj[i];
			}
			delete obj.length;
			Array.prototype.push.apply(obj, arr);
			return obj;
		},

		// text
		text: function text(value) {

			//set 对象的值
			var _text = "";
			if (arguments.length === 0) {
				Mobile.each(this, function () {
					_text += this.innerText;
				});
				return _text;
			}
			if (arguments.length === 1) {
				Mobile.each(this, function () {
					this.innerText = value;
				});
			}
			return this;
		},

		// val
		val: function val(value) {

			//set 对象的值
			var _val = "";
			if (arguments.length === 0) {
				Mobile.each(this, function () {
					_val += this.value;
				});
				return _val;
			}
			if (arguments.length === 1) {
				Mobile.each(this, function () {
					this.value = value;
				});
			}
			return this;
		},

		// html
		html: function html(value) {

			//set 对象的值
			var _html = "";
			if (arguments.length === 0) {
				Mobile.each(this, function () {
					_html += this.innerHTML;
				});
				return _html;
			}
			if (arguments.length === 1) {
				Mobile.each(this, function () {
					this.innerHTML = value;
				});
			}
			return this;
		},

		// attr
		attr: function attr(_attr2, value) {

			// 返回第一个属性值
			if (arguments.length === 1 && typeof _attr2 === "string") {
				var _attr;
				Mobile.each(this, function () {
					_attr = this.getAttribute(_attr2);
					return false;
				});
				return _attr;
			}

			if (arguments.length === 2) {

				Mobile.each(this, function () {
					this.setAttribute(_attr2, value.toString());
				});
			}
			return this;
		},

		// hasAttr
		hasAttr: function hasAttr(attr) {

			// 是否含有元素的属性
			var _attr = false;
			if (arguments.length === 1 && typeof attr === "string") {

				Mobile.each(this, function () {
					_attr = this.hasAttribute(attr);
					return false;
				});
				return _attr;
			}
		},

		// removeAttr
		removeAttr: function removeAttr(attr) {

			// 返回第一个属性值
			if (arguments.length === 1 && typeof attr === "string") {

				Mobile.each(this, function () {
					this.removeAttribute(attr);
				});
			}

			return this;
		},

		// addClass
		addClass: function addClass(className) {

			if (arguments.length === 1) {

				Mobile.each(this, function () {
					this.classList.add(className);
				});
			}

			return this;
		},

		// removeClass
		removeClass: function removeClass(className) {

			if (arguments.length === 1) {

				Mobile.each(this, function () {
					this.classList.remove(className);
				});
			}
			return this;
		},

		// parent 
		parent: function parent() {
			var arr = [];
			for (var i = 0; i < this.length; i++) {
				var _arr = this[i].parentElement;
				if (_arr) {
					arr.push(_arr);
				}
				delete this[i];
			}
			delete this.length;
			Array.prototype.push.apply(this, arr);
			return this;
		},

		// parents 
		parents: function parents(selector) {
			selector = typeof selector === "string" ? selector : "";
			var arr = [];
			for (var i = 0; i < this.length; i++) {

				var p = _searchParents(this[i], function (elm) {
					var bl = false;
					bl = Mobile.checkSelector(elm, selector);
					return bl;
				});

				delete this[i];
				if (p) {
					arr.push(p);
				}
			}
			delete this.length;
			Array.prototype.push.apply(this, arr);
			return this;
		},

		// closest 
		closest: function closest(selector) {
			selector = typeof selector === "string" ? selector : "";
			var arr = [];
			for (var i = 0; i < this.length; i++) {
				var p;
				if (Mobile.checkSelector(this[i], selector)) {
					arr.push(this[i]);
				} else {
					p = _searchParents(this[i], function (elm) {
						var bl = false;
						bl = Mobile.checkSelector(elm, selector);
						return bl;
					});
				}
				delete this[i];
				if (p) {
					arr.push(p);
				}
			}
			delete this.length;
			Array.prototype.push.apply(this, arr);
			return this;
		},

		// eq 
		eq: function eq(index) {
			if (typeof index !== "number") {
				throw Error("index property must is number type");
			}
			var arr = [];
			for (var i = 0; i < this.length; i++) {
				if (i === index) {
					arr.push(this[i]);
				}
				delete this[i];
			}
			delete this.length;
			Array.prototype.push.apply(this, arr);
			return this;
		},

		//  first
		first: function first() {

			var arr = [];
			for (var i = 0; i < this.length; i++) {
				if (i === 0) {
					arr.push(this[i]);
				}
				delete this[i];
			}
			delete this.length;
			Array.prototype.push.apply(this, arr);
			return this;
		},

		//  prev
		prev: function prev() {
			var arr = [];
			Mobile.each(this, function (i, v) {
				var _prev = this.previousElementSibling;
				if (_prev) {
					arr.push(_prev);
				}
				delete this[i];
			});
			delete this.length;
			Array.prototype.push.apply(this, arr);
			return this;
		},

		//  next
		next: function next() {
			var arr = [];
			Mobile.each(this, function (i, v) {
				var _next = this.nextElementSibling;
				if (_next) {
					arr.push(_next);
				}
				delete this[i];
			});
			delete this.length;
			Array.prototype.push.apply(this, arr);
			return this;
		},

		//  siblings
		siblings: function siblings() {
			var arr = [];
			Mobile.each(this, function (i, v) {
				var _children = this.parentElement.children;
				var _index = m(_children).index(m(this));
				for (var y = 0; y < _children.length; y++) {
					if (y !== _index) {
						arr.push(_children[y]);
					}
				}
				delete this[i];
			});
			delete this.length;
			Array.prototype.push.apply(this, arr);
			return this;
		},

		//  last
		last: function last() {

			var arr = [];
			for (var i = 0; i < this.length; i++) {
				var _length = this.length > 0 ? this.length - 1 : 0;
				if (i === _length) {
					arr.push(this[i]);
				}
				delete this[i];
			}
			delete this.length;
			Array.prototype.push.apply(this, arr);
			return this;
		},

		//  heigth
		height: function height() {

			if (arguments.length === 0) {
				var _h = 0;
				Mobile.each(this, function (i, v) {

					// window

					if (this === window) {
						_h = window.innerHeight || window.document.documentElement.clientHeight || window.document.body.clientHeight;
					} else if (this === document) {
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
			else if (arguments.length === 1) {
					var _value = arguments[0];
					Mobile.each(this, function () {
						m(this).css("height", _value);
					});
				}
			return this;
		},

		//  outerHeight
		outerHeight: function outerHeight() {

			if (arguments.length === 0) {
				var _h = 0;
				Mobile.each(this, function (i, v) {

					// window

					if (this === window) {
						_h = window.innerHeight || window.document.documentElement.clientHeight || window.document.body.clientHeight;
					} else if (this === document) {
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
			else if (arguments.length === 1) {
					var _value = arguments[0];
					Mobile.each(this, function () {
						m(this).css("height", _value);
					});
				}
			return this;
		},

		//  outWidth
		outerWidth: function outerWidth() {

			if (arguments.length === 0) {
				var _w = 0;
				Mobile.each(this, function () {

					// window
					if (this === window) {
						_w = window.innerWidth || window.document.documentElement.clientWidth || window.document.body.clientWidth;
					} else if (this === document) {
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
			else if (arguments.length === 1) {
					var _value = arguments[0];
					Mobile.each(this, function () {
						m(this).css("width", _value);
					});
				}

			return this;
		},
		//  width
		width: function width() {

			// get
			if (arguments.length === 0) {
				var _w = 0;
				Mobile.each(this, function () {

					// window
					if (this === window) {

						_w = window.innerWidth || window.document.documentElement.clientWidth || window.document.body.clientWidth;
					} else if (this === document) {
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
			else if (arguments.length === 1) {
					var _value = arguments[0];
					Mobile.each(this, function () {
						m(this).css("width", _value);
					});
				}

			return this;
		},

		// clientTop   目前高级浏览器支持都不一样   以后版本全部支持
		clientTop: function clientTop() {
			var _top = 0;
			Mobile.each(this, function () {
				_top = this.getBoundingClientRect().top;
				return false;
			});
			return _top;
		},

		// clientLeft 目前高级浏览器支持都不一样   以后版本全部支持
		clientLeft: function clientLeft() {
			var _left = 0;
			Mobile.each(this, function () {
				_left = this.getBoundingClientRect().left;
				return false;
			});
			return _left;
		},

		// offsetTop
		offsetTop: function offsetTop() {
			var _top = 0;
			Mobile.each(this, function () {
				_top = this.offsetTop;
				return false;
			});
			return _top;
		},

		// offsetLeft
		offsetLeft: function offsetLeft() {
			var _left = 0;
			Mobile.each(this, function () {
				_left = this.offsetLeft;
			});
			return _left;
		},

		// offset
		offset: function offset() {
			var obj = {};
			Mobile.each(this, function () {
				obj.left = this.offsetLeft;
				obj.top = this.offsetTop;
			});
			return obj;
		},

		// index
		index: function index(obj) {
			var _index = -1;
			if (arguments.length === 0) {
				Mobile.each(this, function (i, v) {
					if (v.parentElement) {
						var els = v.parentElement.children;
						for (var i = 0; i < els.length; i++) {
							if (els[i].isEqualNode(v)) {
								_index = i;
							}
						}
					}

					return false;
				});
			} else if (arguments.length === 1) {
				Mobile.each(this, function (i, v) {
					obj = obj.length && obj.length > 0 ? obj[0] : obj;
					if (v.isEqualNode(obj)) {
						_index = i;
					}
				});
			}

			return _index;
		},

		//  remove
		remove: function remove(obj) {
			var arr = [];
			var $this = this;
			Mobile.each(this, function (i, v) {
				if (v.parentElement) {
					var els = this.parentElement;
					var _indexObj = els.removeChild(this);
					arr.push(_indexObj);
				}
				delete $this[i];
			});

			Array.prototype.push.apply(this, arr);
			return this;
		},

		//  append
		append: function append(obj) {
			if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" && obj.length && obj.length > 0) {
				Mobile.each(this, function () {
					for (var i = 0; i < obj.length; i++) {
						this.appendChild(obj[i]);
					}
				});
			} else if (typeof obj === "string") {
				Mobile.each(this, function () {
					this.innerHTML += obj;
				});
			} else {
				Mobile.each(this, function () {
					this.appendChild(obj);
				});
			}

			return this;
		},
		//  prepend
		prepend: function prepend(obj) {
			if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" && obj.length && obj.length > 0) {
				Mobile.each(this, function () {
					for (var i = obj.length; i > 0; i--) {
						this.insertBefore(obj[i - 1], this.childNodes[0]);
					}
				});
			} else if (typeof obj === "string") {
				var els = Mobile.htmlStringToDOM(obj);
				Mobile.each(this, function () {
					this.insertBefore(els, this.childNodes[0]);
				});
			} else {
				Mobile.each(this, function () {
					this.insertBefore(obj, this.childNodes[0]);
				});
			}

			return this;
		},

		//  clone
		clone: function clone(obj) {
			var _obj;
			Mobile.each(this, function () {
				_obj = this.cloneNode(true);
				return false;
			});
			return _obj;
		}

	});

	/*animate*/
	Mobile.fn.extend({

		// show
		show: function show() {

			Mobile.each(this, function (i, el) {

				var _showType = this.showValue || "none";
				var _nodeName = this.nodeName.toLowerCase();
				if (_showType == "none") {
					_showType = _getElementType(_nodeName);
				}

				this.style.display = _showType;
				this.style.opacity = 1;
			});
			return this;
		},

		// hide
		hide: function hide() {

			Mobile.each(this, function (i, el) {

				var _v = m(this).css("display") || "none";
				this.showValue = _v;
				this.style.display = "none";
				this.style.opacity = 0;
			});
			return this;
		},

		// toggle
		toggle: function toggle() {

			Mobile.each(this, function () {

				var _v = m(this).css("display") || "none";
				if (_v.trim() != "none") {
					m(this).hide();
				} else {
					m(this).show();
				}
			});
			return this;
		},

		// fadeIn
		fadeIn: function fadeIn() {

			Mobile.each(this, function (i, el) {

				var _showType = this.showValue || "none";
				var _nodeName = this.nodeName.toLowerCase();
				if (_showType == "none") {
					_showType = _getElementType(_nodeName);
				}

				this.style.display = _showType;
				this.style.opacity = 0;
				var time = 400;
				var opt = 1000;
				var fx = 30;
				var t = time / fx;
				var speed = opt / t;
				var clearTimeId = setInterval(function () {
					var v = parseFloat(el.style.opacity) || 0;
					v = v * 1000;
					el.style.opacity = (speed + v) / 1000;
					v = (parseFloat(el.style.opacity) || 0) * 1000;

					if (v + speed > opt) {
						el.style.opacity = opt / 1000;
						el.style.opacity = 1;
						el.style.display = _showType;
						clearInterval(clearTimeId);
					}
				}, fx);
			});
			return this;
		},

		// fadeOut
		fadeOut: function fadeOut() {

			Mobile.each(this, function (i, el) {

				var _v = m(this).css("display") || "none";
				this.showValue = _v;
				this.style.opacity = 1;
				var time = 400;
				var opt = 1000;
				var fx = 30;
				var t = time / fx;
				var speed = opt / t;
				var clearTimeId = setInterval(function () {
					var v = parseFloat(el.style.opacity) || 0;
					v = v * 1000;
					el.style.opacity = (v - speed) / 1000;
					v = (parseFloat(el.style.opacity) || 0) * 1000;
					if (v - speed < 0) {
						el.style.opacity = 0;
						el.style.display = "none";
						clearInterval(clearTimeId);
					}
				}, fx);
			});
			return this;
		},

		// fadeToggle
		fadeToggle: function fadeToggle() {

			Mobile.each(this, function () {

				var _v = m(this).css("display") || "none";
				if (_v.trim() != "none") {
					m(this).fadeOut();
				} else {
					m(this).fadeIn();
				}
			});
			return this;
		},

		//  windowTop
		windowTop: function windowTop(y, time) {

			// get
			if (arguments.length === 0) {
				return parseFloat(window.pageYOffset) || 0;
			}

			// set
			time = typeof time === "number" ? time : 400;
			y = typeof y === "number" ? y : parseFloat(y);
			y = isNaN(y) ? 0 : y;
			var fx = 20;
			var speed = 20;
			Mobile.each(this, function () {
				this.clearTimeId = this.clearTimeId || 0;
				clearInterval(this.clearTimeId);

				if (this !== window) {
					throw new Error("element must is window");
				}
				var speed1 = time / fx;
				var windowStartTop = parseFloat(window.pageYOffset) || 0;
				var speed2 = Math.abs(windowStartTop - y);
				speed = speed2 / speed1;

				if (windowStartTop > y) {
					this.clearTimeId = setInterval(function () {
						windowStartTop = windowStartTop - speed;
						window.scrollTo(0, windowStartTop);
						if (windowStartTop - speed < y) {
							window.scrollTo(0, y);
							clearInterval(this.clearTimeId);
						}
					}, fx);
				} else {
					if (windowStartTop === y) {
						return;
					}
					this.clearTimeId = setInterval(function () {
						windowStartTop = windowStartTop + speed;
						window.scrollTo(0, windowStartTop);
						if (windowStartTop + speed > y) {
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
		scrollTop: function scrollTop(size) {

			// get
			if (arguments.length === 0) {
				var _size = 0;
				Mobile.each(this, function () {
					if (this === window || this === document) {
						_size = window.pageYOffset || 0;
					} else {
						_size = this.scrollTop;
					}
					return false;
				});
				return _size;
			} else {
				Mobile.each(this, function () {
					if (this === window || this === document) {
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
		transition: function transition(option, time, ease, delay, fn) {

			ease = typeof ease === "string" ? ease : "ease";
			delay = typeof delay === "number" ? delay : 0;
			var _transition = "all " + time / 1000 + "s  " + ease + " " + delay / 1000 + "s";

			if (typeof option === "string") {
				_transition = option + " " + time / 1000 + "s  " + ease + " " + delay / 1000 + "s";
				Mobile.each(this, function () {
					this.style.MozTransition = _transition;
					this.style.msTransition = _transition;
					this.style.webkitTransition = _transition;
					this.style.OTransition = _transition;
					this.style.transition = _transition;
				});

				return this;
			}

			Mobile.each(this, function (i, el) {
				time = typeof time === "number" ? time : 400;
				el.setTimeout = el.setTimeout || 0; // 第一次执行
				el.isEnd = el.isEnd || false; // 动画是否完毕

				if (el.isEnd === false) {

					// 第一次执行
					if (!el.isStart) {
						el.isStart = true;
						el.one = option; // 记录的第一次对象属性
						el.setTimeout = time + el.setTimeout + delay;
						el.style.MozTransition = _transition;
						el.style.msTransition = _transition;
						el.style.webkitTransition = _transition;
						el.style.OTransition = _transition;
						el.style.transition = _transition;
						for (var name in option) {
							el.style[name] = option[name];
						}

						//  第一次执行回调函数
						if (typeof fn === "function") {
							var clearTimeId2 = setTimeout(function () {
								fn(el);
								clearTimeout(clearTimeId2);
							}, time + delay);
						}
					} else {
						var clearTimeId = setTimeout(function () {

							el.style.MozTransition = _transition;
							el.style.msTransition = _transition;
							el.style.webkitTransition = _transition;
							el.style.OTransition = _transition;
							el.style.transition = _transition;

							for (var name in option) {
								el.style[name] = option[name];
							}
							//  执行回调函数
							if (typeof fn === "function") {
								var clearTimeId2 = setTimeout(function () {
									fn(el);
									clearTimeout(clearTimeId2);
								}, time + delay);
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
		transitionEnd: function transitionEnd(isReset, fn) {

			// 是否回复到第一次的状态
			//isReset = typeof isReset === "boolean" ? isReset : false;
			Mobile.each(this, function (i, el) {

				// 第一次执行
				el.setTimeout = el.setTimeout || 0;

				// 动画是否完毕
				el.isEnd = true;
				//console.log("========end=======")
				//	console.log(this.isEnd)

				// 动画是否完毕 回调函数
				var clearTimeId = setTimeout(function () {
					el.isEnd = false;
					el.setTimeout = 0;
					el.isStart = false;

					if (typeof isReset === "function") {
						isReset(el);
					} else if (typeof isReset === "boolean" && isReset === true) {

						for (var name in el.one) {
							el.style[name] = el.one[name];
						}
						var _v = "none";
						el.style.MozTransition = _v;
						el.style.msTransition = _v;
						el.style.webkitTransition = _v;
						el.style.OTransition = _v;
						el.style.transition = _v;
					}

					if (typeof fn === "function") {
						fn(el);
					}
				}, el.setTimeout + 20);
			});
		},

		// addAnimate
		addAnimate: function addAnimate(name, duration, easing, delay, count, direction) {
			duration = typeof duration === "number" && duration !== 0 ? duration / 1000 : 0.4;
			easing = typeof easing === "string" ? easing : "ease";
			delay = typeof delay === "number" && delay !== 0 ? delay / 1000 : 0;
			count = count || 1;
			direction = typeof direction === "string" ? direction : "normal";

			var _animate = name + " " + duration + "s" + " " + easing + " " + delay + "s" + " " + count + " " + direction;
			Mobile.each(this, function (i, el) {
				this.style.webkitAnimation = _animate;
				this.style.msAnimation = _animate;
				this.style.MozAnimation = _animate;
				this.style.OAnimation = _animate;
				this.style.animate = _animate;
			});

			return this;
		},

		// removeAnimate
		removeAnimate: function removeAnimate(name) {
			var _v = "none";
			Mobile.each(this, function (i, el) {
				this.style.webkitAnimation = _v;
				this.style.msAnimation = _v;
				this.style.MozAnimation = _v;
				this.style.OAnimation = _v;
				this.style.animate = _v;
			});
			return this;
		},

		// animateRuning
		animateRuning: function animateRuning() {
			var run = "running";
			Mobile.each(this, function (i, el) {
				this.style.webkitAnimationPlayState = run;
				this.style.msAnimationPlayState = run;
				this.style.MozAnimationPlayState = run;
				this.style.OAnimationPlayState = run;
				this.style.animationPlayState = run;
			});
			return this;
		},

		// animateRuning
		animatePaused: function animatePaused() {
			var paused = "paused";
			Mobile.each(this, function (i, el) {
				this.style.webkitAnimationPlayState = paused;
				this.style.msAnimationPlayState = paused;
				this.style.MozAnimationPlayState = paused;
				this.style.OAnimationPlayState = paused;
				this.style.animationPlayState = paused;
			});
			return this;
		},

		// animationFillMode
		animationFillMode: function animationFillMode(mode) {
			var mode = typeof mode === "string" ? mode : "forwards";
			Mobile.each(this, function (i, el) {
				this.style.webkitAnimationFillMode = mode;
				this.style.msAnimationFillMode = mode;
				this.style.MozAnimationFillMode = mode;
				this.style.OAnimationFillMode = mode;
				this.style.AnimationFillMode = mode;
			});
			return this;
		},

		// animateToggle
		animatePalyToggle: function animatePalyToggle() {

			Mobile.each(this, function (i, el) {
				var _state = m(this).css("animation-play-state") || "";

				if (_state.trim() === "paused") {
					m(this).animateRuning();
				} else {
					m(this).animatePaused();
				}
			});
			return this;
		}

	});

	/*bind enevt 绑定事件*/
	Mobile.fn.extend({
		on: function on(type) {

			// 第二个参数为函数 正常绑定事件
			if (arguments.length >= 2 && typeof arguments[1] === "function") {
				var handler = arguments[1];
				var bl = typeof arguments[2] === "boolean" ? arguments[2] : false;
				Mobile.each(this, function () {
					if (this.addEventListener) {
						this.addEventListener(type, handler, bl);
					}
					//ie8
					else if (this.attachEvent) {
							this.attachEvent("on" + type, handler, bl);
						} else {
							this["on" + type] = handler; /*直接赋给事件*/
						}
				});

				m.events.on(type, handler);
			}

			// 委托绑定事件
			if (arguments.length >= 3 && typeof arguments[1] === "string" && typeof arguments[2] === "function") {
				var el = arguments[1].trim();
				var handler = arguments[2];
				var bl = typeof arguments[3] === "boolean" ? arguments[3] : false;
				Mobile.each(this, function () {
					if (this.addEventListener) {
						this.addEventListener(type, function (event) {
							if (Mobile.checkSelector(event.target, el)) {
								handler.call(event.target, event);
							}
						}, bl);
					}
				});

				m.events.on(type, handler);
			}

			return this;
		},

		off: function off(type, handler) {

			if (arguments.length === 1) {
				Mobile.each(this, function () {
					for (var i = m.events.props[type].length - 1; i >= 0; i--) {

						if (this.removeEventListener) {
							this.removeEventListener(type, m.events.props[type][i], false);
						} else {
							this.deattachEvent("on" + type, m.events.props[type][i]);
						}

						Mobile.events.off(type, m.events.props[type][i]);
					}
				});

				return;
			}
			Mobile.each(this, function () {
				if (this.removeEventListener) this.removeEventListener(type, handler, false);else if (this.deattachEvent) {
					/*IE*/
					this.deattachEvent('on' + type, handler);
				} else {
					this["on" + type] = null;
					/*直接赋给事件*/
				}
				Mobile.events.off(type, handler);
			});

			return this;
		},

		// 自定义事件
		trigger: function trigger(type, obj) {

			Mobile.each(this, function () {
				obj = obj || {};
				var btnEvent = document.createEvent("CustomEvent");
				btnEvent.initCustomEvent(type, true, false, obj);
				this.dispatchEvent(btnEvent);
			});
		},
		emit: function emit(type, obj) {
			Mobile.each(this, function () {
				m(this).trigger(type, obj);
			});
		},

		// click
		click: function click(fn, bl) {
			bl = bl || false;
			Mobile.each(this, function () {
				m(this).on("click", fn, bl);
			});
		},

		//  touchstart
		touchstart: function touchstart(fn, bl) {
			bl = bl || false;
			Mobile.each(this, function () {
				m(this).on("touchstart", fn, bl);
			});
		},

		//  touchend
		touchend: function touchend(fn, bl) {
			bl = bl || false;
			Mobile.each(this, function () {
				m(this).on("touchend", fn, bl);
			});
		},

		//  touchmove
		touchmove: function touchmove(fn, bl) {
			bl = bl || false;
			Mobile.each(this, function () {
				m(this).on("touchmove", fn, bl);
			});
		},

		//  touchcancel
		touchcancel: function touchcancel(fn, bl) {
			bl = bl || false;
			Mobile.each(this, function () {
				m(this).on("touchcancel", fn, bl);
			});
		},

		//  tap
		tap: function tap(fn, bl) {
			bl = bl || false;
			Mobile.each(this, function () {
				m(this).on("touchstart", fn, bl);
			});
		},

		//  scroll
		scroll: function scroll(fn, bl) {
			bl = bl || false;
			Mobile.each(this, function () {
				m(this).on("scroll", fn, bl);
			});
		},

		// resize
		resize: function resize(fn, bl) {
			bl = bl || false;
			Mobile.each(this, function () {
				m(this).on("resize", fn, bl);
			});
		},

		// change
		change: function change(fn, bl) {
			bl = bl || false;
			Mobile.each(this, function () {
				m(this).on("change", fn, bl);
			});
		},

		//  blur
		blur: function blur(fn, bl) {
			if (arguments.length === 0) {
				$(this).each(function () {
					this.blur();
				});

				return;
			}
			bl = bl || false;
			Mobile.each(this, function () {
				m(this).on("blur", fn, bl);
			});
		},

		// focus
		focus: function focus(fn, bl) {
			if (arguments.length === 0) {
				$(this).each(function () {
					this.focus();
				});

				return;
			}
			bl = bl || false;
			Mobile.each(this, function () {
				m(this).on("focus", fn, bl);
			});
		},

		// keyup
		keyup: function keyup(fn, bl) {
			bl = bl || false;
			Mobile.each(this, function () {
				m(this).on("keyup", fn, bl);
			});
		},

		// keyup
		keydown: function keydown(fn, bl) {
			bl = bl || false;
			Mobile.each(this, function () {
				m(this).on("keydown", fn, bl);
			});
		},

		// keypress
		keypress: function keypress(fn, bl) {
			bl = bl || false;
			Mobile.each(this, function () {
				m(this).on("keypress", fn, bl);
			});
		}
	});

	/*ajax static*/

	// init xhr
	function _ajaxFun(url, type, data, _arguments) {
		var success;
		var error;
		var progress;
		if ((typeof data === "undefined" ? "undefined" : _typeof(data)) === "object" && _arguments.length > 2) {
			success = _arguments[2];
			if (_arguments.length >= 3) {
				error = _arguments[3];
				progress = _arguments[4] || null;
			}
		} else if (typeof data === "function") {
			success = data;
			if (_arguments.length > 2) {
				error = _arguments[2];
				progress = _arguments[3] || null;
			}
		}

		Mobile.ajax({
			type: type,
			url: url,
			data: (typeof data === "undefined" ? "undefined" : _typeof(data)) === "object" ? data : null,
			success: success,
			error: error,
			progress: progress
		});
	}

	// 链接ajax发送的参数数据
	function _JoinParams(data) {
		// 参数data对象字符
		var params = [];

		for (var key in data) {

			if (_typeof(data[key]) === "object") {
				var data2 = data[key];
				// object
				if (data[key].constructor !== Array) {
					for (var key2 in data2) {
						var _key = key + "[" + key2 + "]";
						var _value = data2[key2];
						params.push(encodeURIComponent(_key) + '=' + encodeURIComponent(_value));
					}
				} else {
					for (var key2 in data2) {

						var data3 = data2[key2];
						if ((typeof data3 === "undefined" ? "undefined" : _typeof(data3)) === "object" && data3.constructor !== Array) {
							for (var key3 in data3) {
								var _key = key + "[" + key2 + "]" + "[" + key3 + "]";
								var _value = data3[key3];
								params.push(encodeURIComponent(_key) + '=' + encodeURIComponent(_value));
							}
						}
					}
				}
			} else {
				params.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
			}
		}

		return params.join("&") || "";
	}

	Mobile.extend({

		// create XHR Object
		createXHR: function createXHR() {

			if (window.XMLHttpRequest) {

				//IE7+、Firefox、Opera、Chrome 和Safari
				return new XMLHttpRequest();
			} else if (window.ActiveXObject) {

				//IE6 及以下
				var versions = ['MSXML2.XMLHttp', 'Microsoft.XMLHTTP'];
				for (var i = 0, len = versions.length; i < len; i++) {
					try {
						return new ActiveXObject(version[i]);
						break;
					} catch (e) {
						//跳过
					}
				}
			} else {
				throw new Error('浏览器不支持XHR对象！');
			}
		},

		/* 封装ajax函数
  	 @param {string}opt.type http连接的方式，包括POST和GET两种方式
  	 @param {string}opt.url 发送请求的url
  	 @param {boolean}opt.async 是否为异步请求，true为异步的，false为同步的
  	 @param {object}opt.data 发送的参数，格式为对象类型
  	 @param {function}opt.contentType   内容类型
  	@param {function}opt.success ajax发送并接收成功调用的回调函数
  	 @param {function}opt.error ajax发送并接收error调用的回调函数
  	 @param {function}opt.getXHR 获取xhr对象
  	 @param {number}opt.timeout // 超时
  	*/
		ajax: function ajax(opt) {

			// 参数object对象
			opt = opt || {};
			opt.type = typeof opt.type === "string" ? opt.type.toUpperCase() : "GET";
			opt.url = typeof opt.url === "string" ? opt.url : '';
			opt.async = typeof opt.async === "boolean" ? opt.async : true;
			opt.data = _typeof(opt.data) === "object" ? opt.data : {};
			opt.success = opt.success || function () {};
			opt.error = opt.error || function () {};
			opt.contentType = opt.contentType || "application/x-www-form-urlencoded;charset=utf-8";
			opt.timeout = typeof opt.timeout === "number" ? opt.timeout : 10000;
			opt.progress = opt.progress || {};

			var xhr = Mobile.createXHR();
			xhr.timeout = opt.timeout;
			xhr.xhrFields = opt.xhrFields || {};

			// 连接参数
			var postData = _JoinParams(opt.data); // params.join('&');

			if (opt.type.toUpperCase() === 'POST' || opt.type.toUpperCase() === 'PUT' || opt.type.toUpperCase() === 'DELETE') {
				opt.url = opt.url.indexOf("?") === -1 ? opt.url + "?" + "_=" + Math.random() : opt.url + "&_=" + Math.random();

				xhr.open(opt.type, opt.url, opt.async);
				xhr.setRequestHeader('Content-Type', opt.contentType);
				xhr.send(postData);
			} else if (opt.type.toUpperCase() === 'GET') {
				if (postData.length > 0) {
					postData = "&" + postData;
				}
				opt.url = opt.url.indexOf("?") === -1 ? opt.url + "?" + "_=" + Math.random() + postData : opt.url + "&_=" + Math.random() + postData;

				xhr.open(opt.type, opt.url, opt.async);
				xhr.send(null);
			}
			xhr.onreadystatechange = function () {

				if (xhr.readyState === 4) {
					if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
						if (typeof opt.success === "function") {
							try {
								opt.success(JSON.parse(xhr.responseText), xhr.status, xhr.statusText);
							} catch (e) {
								//TODO handle the exception
								opt.success(xhr.responseText, xhr.status, xhr.statusText);
							}
						}
					} else {
						if (typeof opt.error === "function") {
							opt.error(xhr.status, xhr.statusText);
						}
					}
				}
			};
		},

		// get
		get: function get$$1(url, data) {
			_ajaxFun(url, "get", data, arguments);
		},

		// post
		post: function post(url, data) {
			_ajaxFun(url, "post", data, arguments);
		},

		// put
		put: function put(url, data) {
			_ajaxFun(url, "put", data, arguments);
		},

		// delete
		delete: function _delete(url, data) {
			_ajaxFun(url, "delete", data, arguments);
		},

		// jsonp
		jsonp: function jsonp(url, data) {

			var callback;
			if (typeof data === "function") {
				callback = data;
			} else if (arguments.length >= 3) {
				callback = arguments[2];
			}

			// 创建一个几乎唯一的id
			var callbackName = "mobile" + new Date().getTime().toString().trim();
			window[callbackName] = function (result) {

				// 创建一个全局回调处理函数
				if (typeof callback === "function") {
					callback(result);
				}
			};

			// 参数data对象字符
			var postData = "";
			if ((typeof data === "undefined" ? "undefined" : _typeof(data)) === "object") {
				//				for(var key in data) {
				//					params.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
				//				}
				//				postData = params && params.join('&');
				postData = _JoinParams(data);
			}

			if (postData.length > 0) {
				postData = "&" + postData;
			}
			url = url.indexOf("?") === -1 ? url + "?" + "callback=" + callbackName + postData : url + "&callback=" + callbackName + postData;

			// 创建Script标签并执行window[id]函数
			var script = document.createElement("script");
			script.setAttribute("id", callbackName);
			script.setAttribute("src", url);
			script.setAttribute("type", "text/javascript");
			document.body.appendChild(script);
		}

	});

	/*extend 静态方法*/
	Mobile.extend({

		each: function each(els, fn) {
			if (!els) {
				throw new Error("els property type must is Array or Object");
			}
			for (var i = 0; i < els.length; i++) {
				//try {
				if (typeof fn === "function") {
					var bl = fn.call(els[i], i, els[i]);
					if (bl === false) {
						break;
					}
				}
				//} catch(e) {

				//}
			}
		},

		//ready
		ready: function ready(fn) {

			if (typeof fn === "function") {
				window.addEventListener("load", fn);
			}
			return;
		},

		// 列表项和子项的匹配	
		isEqual: function isEqual(list, item) {
			list = list || [];
			for (var i = 0; i < list.length; i++) {

				if (list[i] === item) {
					return true;
				}
			}

			return false;
		},

		// html字符串转dom对象
		htmlStringToDOM: function htmlStringToDOM(txt) {

			var df2 = document.createDocumentFragment();
			var df = document.createDocumentFragment();
			var div = document.createElement("div");
			div.innerHTML = txt;
			df.appendChild(div);
			var _nodes = df.querySelector("div").childNodes;
			for (var i = _nodes.length; i > 0; i--) {
				df2.insertBefore(_nodes[i - 1], df2.childNodes[0]);
			}
			df = null;
			return df2;

			// Firefox, Mozilla, Opera, etc. 高级浏览才支持
			//			try {
			//				var parser = new DOMParser();
			//				var xmlDoc = parser.parseFromString(txt, "text/html");
			//				var els = xmlDoc.querySelector("body").childNodes;
			//				for(var i = 0; i < els.length; i++) {
			//					df2.appendChild(els[i]);
			//				}
			//				return df2;
			//			} catch(e) {}
		},

		checkSelector: function checkSelector(el, txt) {
			txt = typeof txt === "string" ? txt : "";
			if (txt.trim() === "") {
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
			tagList = rep(tagList, "]", "");
			var isTagBl = istag(el, tagList, txt);
			//alert(isTagBl)

			var attrList = txt.match(regAttr) || [];
			attrList = rep(attrList, "[", "");
			attrList = rep(attrList, "]", "");
			var isAttrBl = isAttr(el, attrList, txt);
			//alert(attrList)

			function rep(list, old, now) {
				var arr = [];
				for (var i = 0; i < list.length; i++) {
					arr.push(list[i].replace(old, now));
				}

				return arr;
			}

			function isId(el, idList, searchTxt) {

				if (searchTxt.search(/#/) === -1) {
					return true;
				} else if (searchTxt.search(/#/) !== -1 && idList.length === 0) {
					return false;
				}

				// 上条件不符合  向下执行
				var id = el.id || "";
				for (var i = 0; i < idList.length; i++) {
					if (idList[i] == id) {
						return true;
					}
				}
				return false;
			}

			function isclass(el, idList, searchTxt) {
				if (searchTxt.search(/\./) === -1) {
					return true;
				} else if (searchTxt.search(/\./) !== -1 && idList.length === 0) {
					return false;
				}

				// 上条件不符合  向下执行
				var _class = el.classList || "";

				for (var i = 0; i < idList.length; i++) {
					if (!_class.contains(idList[i])) {
						return false;
					}
				}
				return true;
			}

			function istag(el, idList, searchTxt) {
				if (searchTxt.search(/^[a-zA-Z]|[\]][a-zA-Z]/) === -1) {
					return true;
				} else if (searchTxt.search(/^[a-zA-Z]|[\]][a-zA-Z]/) !== -1 && idList.length === 0) {
					return false;
				}

				// 上条件不符合  向下执行
				var _tag = (el.nodeName || "").toLowerCase();

				for (var i = 0; i < idList.length; i++) {
					if (idList[i].trim() !== _tag) {
						return false;
					}
				}
				return true;
			}

			function isAttr(el, idList, searchTxt) {

				if (searchTxt.search(/\[.*\]/) === -1) {
					return true;
				} else if (searchTxt.search(/\[.*\]/) !== -1 && idList.length === 0) {
					return false;
				}

				// 上条件不符合  向下执行
				//var _tag = el.getat
				var _reg2 = /=/g;
				for (var i = 0; i < idList.length; i++) {

					if (_reg2.test(idList[i])) {
						//alert(idList[i]);
						var arr2 = idList[i].split("=");
						if ((el.getAttribute(arr2[0]) || "").trim() !== (arr2[1] || "").trim()) {
							return false;
						}
					} else {

						if (!el.hasAttribute(idList[i])) {
							return false;
						}
					}
				}
				return true;
			}

			return isIdBl && isClassBl && isTagBl && isAttrBl;
		},

		trim: function trim(txt) {
			var str = "";
			txt = typeof txt === "string" ? txt : "";
			str = txt.replace(/^\s*|\s*$/img, "");
			return str;
		},

		round: function round(value, ratio) {

			if (arguments.length === 1) {

				if (typeof value === "number") {
					return Math.round(value);
				}
			} else if (arguments.length === 2) {
				if (typeof value === "number" && typeof ratio === "number") {

					var _v = Math.floor(value);
					_v = _v + ratio;

					if (value > _v) {
						return Math.ceil(value);
					} else {
						return Math.floor(value);
					}
				}
			}

			return null;
		}

	});

	/**绑定自定义事件函数**/
	Mobile.extend({
		events: {
			props: {},

			// bind events
			on: function on(eventName, fn) {
				this.props[eventName] = this.props[eventName] || [];
				this.props[eventName].push(fn);
			},
			off: function off(eventName, fn) {
				if (arguments.length === 1) {

					this.props[eventName] = [];
				} else if (arguments.length === 2) {
					var $events = this.props[eventName] || [];
					for (var i = 0; i < $events.length; i++) {
						if ($events[i] === fn) {
							$events.splice(i, 1);
							break;
						}
					}
				}
			},
			emit: function emit(eventName, data) {

				if (this.events[eventName]) {
					for (var i = 0; i < this.events[eventName].length; i++) {
						this.events[eventName][i](data);
					}
				}
			}
		}
	});

	// transform 
	Mobile.fn.extend({

		// setTransform
		setTransform: function setTransform(transforName, value) {

			Mobile.each(this, function () {
				if (!this.transform) {
					this.transform = {};
				}
				this.transform[transforName] = value;
				var result = '';

				for (var item in this.transform) {
					switch (item) {
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
							if (arrs.length === 2) {
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

							if (arrs.length === 2) {
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

							if (arrs.length === 2) {
								result += item + '(' + parseFloat(arrs[0]) + 'px,' + parseFloat(arrs[1]) + 'px)  ';
							} else {
								result += item + '(' + parseFloat(arrs) + 'px,' + 0 + 'px)  ';
							}
							break;

					}
				}

				this.style.WebkitTransform = result;
				this.style.MozTransform = result;
				this.style.msTransform = result;
				this.style.OTransform = result;
				this.style.transform = result;
			});

			return this;
		},

		// getTransform
		getTransform: function getTransform(transforName) {

			var result = 0;
			Mobile.each(this, function () {
				if (!this.transform) {
					this.transform = {};
				}

				//读
				if (typeof this.transform[transforName] == 'undefined') {
					if (transforName == 'scale' || transforName == 'scaleX' || transforName == 'scaleY') {
						result = 1;
						if (transforName === "scale") {
							result = [1, 1];
						}
					} else {
						result = 0;
						if (transforName === "skew" || transforName === "translate") {
							result = [0, 0];
						}
					}
				} else {
					if (transforName === "skew" || transforName === "translate" || transforName === "scale") {
						var strs = this.transform[transforName].split(",");
						var arrs = [];
						for (var y = 0; y < strs.length; y++) {
							var v = parseFloat(strs[y]);
							if (transforName === "scale") {
								v = isNaN(v) ? 1 : v;
							} else {
								v = isNaN(v) ? 0 : v;
							}

							arrs.push(v);
						}

						if (arrs.length === 1) {
							if (transforName === "scale") {
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
		}

	});

	//  cmd commonjs
	if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
		module.exports = Mobile;
	}

	// amd requirejs
	if (typeof define === "function" && define.amd) {
		define(function () {
			return Mobile;
		});
	}

	// cmd seajs
	if (typeof define === "function" && define.cmd) {
		define(function (require, exports, module) {
			module.exports = Mobile;
		});
	}
})();

/*公共js设置样式*/
var commonStyle = function (m) {
	m(document).touchstart(function (event) {
		event.preventDefault();
	});

	m(document).touchmove(function (event) {
		event.preventDefault();
	});
	m(document).touchend(function (event) {
		event.preventDefault();
	});

	// 设置主题内容样式
	m(function () {
		mobileContent();
		mobileTab();

		m(window).resize(function () {
			mobileContent();
			mobileTab();
		});
	});

	// scroll-content内容
	function mobileContent() {
		var tab = m(".mobile-tab");
		var head = m(".mobile-head");
		var content = m(".mobile-content");
		var footer = m(".mobile-footer");
		var window_h = m(window).height();
		var head_h = head.height() || 0;
		var footer_h = footer.height() || 0;

		var tab_h = 0;
		m(tab).each(function () {
			var _h = m(this).height() || 0;
			tab_h += _h;
		});

		var content_h = window_h - (head_h + footer_h + tab_h);
		content.height(content_h);
		var tab_top = m(".mobile-tab-top");
		var tab_top_h = tab_top.height() || 0;
		content.css("top", head_h + tab_top_h);

		//		console.log(head_h);
		//		console.log(footer_h)
		//		console.log(tab_h)
		//		console.log(content_h)
		//		console.log(window_h)
	}

	// scroll-tab
	function mobileTab() {
		var tab_top = m(".mobile-tab-top");
		var head = m(".mobile-head");
		var head_h = head.height() || 0;
		tab_top.css("top", head_h);

		var tab_bottom = m(".mobile-tab-bottom");
		var footer = m(".mobile-footer");
		var footer_h = footer.height() || 0;
		tab_bottom.css("bottom", footer_h);
	}
}(mobile);

var scrollTopBottom = function () {

	m(function () {
		topBottom();
	});

	//导航拖拽
	function topBottom() {
		var scrolltb = m(".mobile-scroll-topbottom");

		for (var i = 0; i < scrolltb.length; i++) {
			topBottomFun(scrolltb[i]);
		}
	}

	//导航拖拽fun
	function topBottomFun(scrolltb) {

		var topbottomContent = m(scrolltb).find(".mobile-scroll-topbottom-content");
		if (topbottomContent.length === 0) {
			return;
		}
		m(topbottomContent).setTransform('translateZ', 0.01);
		var isScrollTop = m(scrolltb).hasAttr("data-scroll-top"); // 是否下拉
		var isScrollBottom = m(scrolltb).hasAttr("data-scroll-bottom"); // 是否上拉

		var isScrollBar = m(scrolltb).hasAttr("data-scroll-bar"); // 是否显示滚动条
		if (isScrollBar) {
			var scrollBar = document.createElement("div"); // 创建滚动条
			scrollBar.classList.add("mobile-scroll-bar");
			scrolltb.appendChild(scrollBar);
		}

		var eleY = 0; // 元素初始位置
		var startY = 0;
		var startX = 0;
		var isLink = true;
		var isAddMoveEvent = false; // 判断是否往上拖动
		var isAddMoveEventFirst = true; // 判断是否第一往上拖动
		var dis = 0;

		var tab = m(".mobile-tab");
		var head = m(".mobile-head");
		var content = m(".mobile-content");
		var footer = m(".mobile-footer");
		var window_h = m(window).height();
		var head_h = head.height() || 0;
		var footer_h = footer.height() || 0;
		var tab_h = tab.height() || 0;
		var window_h = window_h - (head_h + footer_h + tab_h);
		var minY = window_h - topbottomContent[0].offsetHeight;

		// 滚动条
		var bar_h = m(topbottomContent).height();
		var bar_wrap_h = m(scrolltb).height();
		var sale_bar = bar_wrap_h / bar_h;
		var scroll_bar_h = window_h * sale_bar;
		var mobile_scroll_bar = m(scrolltb).find(".mobile-scroll-bar");
		if (isScrollBar) {
			if (window_h < bar_h) {
				mobile_scroll_bar.height(scroll_bar_h);
			}
		}
		var speedSetIntervalId = 0;
		var speedSetIntervalFisrt = true;
		var speedScroll = 0;
		var speedlateY = 0;
		m(scrolltb).on("touchstart", start);

		function start(event) {
			event.preventDefault();
			var touch = event.touches[0];
			startY = touch.clientY;
			startX = touch.clientX;
			isLink = true;
			eleY = m(topbottomContent).getTransform("translateY");

			isAddMoveEvent = false; // 判断是否往上拖动
			isAddMoveEventFirst = true; // 判断是否第一往上拖动

			// 计算移动速度
			clearInterval(speedSetIntervalId);
			speedSetIntervalFisrt = true;
			speedlateY = eleY;
			speedScroll = 0;

			tab = m(".mobile-tab");
			head = m(".mobile-head");
			content = m(".mobile-content");
			footer = m(".mobile-footer");
			window_h = m(window).height();
			head_h = head.height() || 0;
			footer_h = footer.height() || 0;
			tab_h = tab.height() || 0;
			window_h = window_h - (head_h + footer_h + tab_h);

			// 过度时间0s
			topbottomContent[0].style.transition = 'none';

			// 滚动条
			if (isScrollBar) {
				mobile_scroll_bar.transition("null", 0);
				bar_h = m(topbottomContent).height();
				bar_wrap_h = m(scrolltb).height();
				sale_bar = bar_wrap_h / bar_h;
				scroll_bar_h = window_h * sale_bar;
				mobile_scroll_bar = m(scrolltb).find(".mobile-scroll-bar");
				//mobile_scroll_bar.height(scroll_bar_h);
				if (window_h < bar_h) {
					mobile_scroll_bar.height(scroll_bar_h);
				}
			}
		}

		m(scrolltb).on("touchmove", move);

		function move(event) {
			event.preventDefault();

			// 检查是否向上移动
			if (isAddMoveEvent) {
				return;
			}
			var touch = event.touches[0];
			var nowY = touch.clientY;
			dis = nowY - startY;
			var nowX = touch.clientX;
			var disX = nowX - startX;
			var disY = nowY - startY;

			if (Math.abs(nowX - startX) > 1 || Math.abs(nowY - startY) > 1) {
				isLink = false;
			}

			// 滚动条
			if (isScrollBar) {
				var scroll_Y = m(topbottomContent).getTransform("translateY");
				var scroll_box_h = m(topbottomContent).height();
				var scroll_box_sale = scroll_Y / scroll_box_h;
				mobile_scroll_bar.setTransform("translateY", -bar_wrap_h * scroll_box_sale);
			}

			// 检查是否向上移动
			var _x = Math.abs(disX);
			var _y = Math.abs(disY);
			if (isAddMoveEventFirst && _x != _y) {
				isAddMoveEventFirst = false;
				if (_x > _y) {
					isAddMoveEvent = true;
				}
			}
			//m(".mobile-tab-ttl").html(isAddMoveEvent+"="+disX+"/y="+disY);
			if (isAddMoveEvent) {
				return;
			}

			// 计算移动速度
			if (speedSetIntervalFisrt) {
				speedSetIntervalFisrt = false;
				speedSetIntervalId = setInterval(function () {
					var speedlateY2 = m(topbottomContent).getTransform("translateY") || 0;
					var speedlateY3 = speedlateY2 - speedlateY;
					speedlateY = speedlateY2;
					speedScroll = speedlateY3;
					//console.log("speedlateY:" + speedScroll)
				}, 20);
			}

			// scroll上下滚动scrolltopbottom自定义事件
			m(this).trigger("scrolltopbottom", {
				el: topbottomContent[0],
				barFun: scrollBarFun
			});

			minY = window_h - topbottomContent[0].offsetHeight;
			var translateY = eleY + dis;
			if (translateY > 0) {
				var scale = 1 - translateY / window_h;
				translateY = translateY * scale;

				// 是否下拉
				if (!isScrollTop) {
					translateY = 0;
				}

				// scroll顶部 scrolltop自定义事件
				m(this).trigger("scrolltop", {
					el: topbottomContent[0],
					barFun: scrollBarFun
				});
			} else if (translateY < minY) {
				var over = Math.abs(translateY - minY);
				var scale = 1 - over / window_h;
				translateY = minY - over * scale;

				// 是否下拉
				if (!isScrollBottom) {

					translateY = minY;
				}

				// scroll底部 scrollbottom自定义事件
				m(this).trigger("scrollbottom", {
					el: topbottomContent[0],
					barFun: scrollBarFun
				});
				if (m(topbottomContent).height() < window_h) {
					translateY = 0;
				}
			}

			m(topbottomContent).setTransform("translateY", translateY);
		}

		m(scrolltb).on("touchend", end);

		function end(event) {
			event.preventDefault();
			var touch = event.touches[0];

			// 计算移动速度
			speedSetIntervalFisrt = true;
			clearInterval(speedSetIntervalId);
			//console.log(isMOve+"/end");

			// a链接
			if (isLink) {

				var _a = m(event.target).closest("a");
				var isHasParent = m(event.target).closest(".mobile-scroll-topbottom-link");
				if (isHasParent.length > 0) {
					var href = _a.attr("href") || "javascript:;";
					window.location.assign(href);
				}
				//console.log(isHasParent)
			}

			minY = window_h - topbottomContent[0].offsetHeight;
			var target = m(topbottomContent).getTransform("translateY") + speedScroll * 20;
			var bezier = 'ease-out';

			if (target > 0) {
				target = 0;
				topbottomContent[0].style.transition = '.5s ' + bezier;
			} else if (target < minY) {
				target = minY;
				if (m(topbottomContent).height() < window_h) {
					target = 0;
				}
				topbottomContent[0].style.transition = '.5s ' + bezier;
			} else {
				topbottomContent[0].style.transition = '1s ' + bezier;
			}

			// 滚动条
			if (isScrollBar) {
				var scroll_Y = target;
				var scroll_box_h = m(topbottomContent).height();
				var scroll_box_sale = scroll_Y / scroll_box_h;
				mobile_scroll_bar.setTransform("translateY", -m(scrolltb).height() * scroll_box_sale);
				mobile_scroll_bar.transition("all", 1000);
				//mobile_scroll_bar.css("opacity",0);
			}
			// 过度时间0.5s
			//topbottomContent[0].style.transition = '1s ' + bezier
			m(topbottomContent).setTransform("translateY", target);
		}

		m(scrolltb).on("touchcancel", touchcancel);

		function touchcancel() {

			// 计算移动速度
			speedSetIntervalFisrt = true;
			clearInterval(speedSetIntervalId);
		}

		function scrollBarFun(event) {
			clearInterval(speedSetIntervalId);
			// 滚动条
			if (isScrollBar) {
				var scroll_Y = m(topbottomContent).getTransform("translateY");
				var scroll_box_h = m(topbottomContent).height();
				var scroll_box_sale = scroll_Y / scroll_box_h;
				mobile_scroll_bar.setTransform("translateY", -bar_wrap_h * scroll_box_sale);

				mobile_scroll_bar.transition("null", 0);
				bar_h = m(topbottomContent).height();
				bar_wrap_h = m(scrolltb).height();
				sale_bar = bar_wrap_h / bar_h;
				scroll_bar_h = window_h * sale_bar;
				mobile_scroll_bar = m(scrolltb).find(".mobile-scroll-bar");
				mobile_scroll_bar.height(scroll_bar_h);
			}
		}
	}
}();

// 菜单左右滑动
var scrollLeftRight = function () {

	m(function () {
		navSlide();
	});

	//导航拖拽
	function navSlide() {
		var navs = m(".mobile-scroll-leftright");

		for (var i = 0; i < navs.length; i++) {
			navsListFun(navs[i]);
		}
	}

	//导航拖拽fun
	function navsListFun(navs) {

		var navsList = m(navs).find(".mobile-scroll-leftright-content");
		if (navsList.length === 0) {
			return;
		}
		m(navsList).setTransform('translateZ', 0.01);
		var beginTime = 0;
		var beginValue = 0;
		var endTime = 0;
		var endValue = 0;
		var disValue = 0;
		var eleX = 0; // 元素初始位置
		var startX = 0;
		var startY = 0;
		var isMOve = true;

		// 定位到left
		var isPositionLeft = m(navs).hasAttr("data-position-left");
		// 定位到center
		var isPositionCenter = m(navs).hasAttr("data-position-center");

		var window_w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

		var isAddMoveEvent = false; // 判断是否top拖动
		var isAddMoveEventFirst = true; // 判断是否第一往上拖动

		m(navs).on("touchstart", start);

		function start(event) {
			event.preventDefault();
			var touch = event.changedTouches[0];
			startX = touch.clientX;
			startY = touch.clientY;
			isMOve = true;
			eleX = m(navsList).getTransform("translateX");
			beginTime = new Date().getTime();
			beginValue = eleX;
			disValue = 0;

			// 过度时间0s
			navsList[0].style.transition = 'none';
		}

		m(navs).on("touchmove", move);

		function move(event) {
			event.preventDefault();
			var touch = event.changedTouches[0];
			var nowX = touch.clientX;
			var nowY = touch.clientY;
			var dis = nowX - startX;

			if (Math.abs(nowX - startX) > 1 || Math.abs(nowY - startY) > 1) {
				isMOve = false;
			}

			// 检查是否向上移动
			var _x = Math.abs(nowX - startX);
			var _y = Math.abs(nowY - startY);
			if (isAddMoveEventFirst && _x != _y) {
				isAddMoveEventFirst = false;
				if (_y > _x) {
					isAddMoveEvent = true;
				}
			}
			if (isAddMoveEvent) {

				return;
			}

			window_w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

			var minX = window_w - navsList[0].offsetWidth;

			var translateX = eleX + dis;
			if (translateX > 0) {
				var scale = 1 - translateX / window_w;
				translateX = translateX * scale;
			} else if (translateX < minX) {
				var over = Math.abs(translateX - minX);
				var scale = 1 - over / window_w;
				translateX = minX - over * scale;
				if (m(navsList).width() < window_w) {
					translateX = 0;
				}
			}

			m(navsList).setTransform("translateX", translateX);
			endTime = new Date().getTime();
			endValue = translateX;
			disValue = endValue - beginValue;
		}

		m(navs).on("touchend", end);

		function end(event) {
			event.preventDefault();
			var touch = event.changedTouches[0];
			var speed = disValue / (endTime - beginTime);
			window_w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

			if (isMOve) {

				// 单击选中样式
				var p = m(event.target).closest("li");
				if (p.length > 0) {
					m(this).find("li").removeClass("active");
					p.addClass("active");

					// scroll单击选中样式自定义事件
					m(this).trigger("scrollselect", p[0]);

					// 选中的样式移动
					if (isPositionLeft) {
						positionLeft(p); // 移动到left
					} else if (isPositionCenter) {
						positionCenter(p); // 移动到center
					}

					// a链接
					var href = m(event.target).closest("a").attr("href") || "javascript:;";
					window.location.assign(href);
					return;
				}
			}

			isAddMoveEvent = false; // 判断是否top拖动
			isAddMoveEventFirst = true; // 判断是否第一往上拖动

			var minX = window_w - navsList[0].offsetWidth;
			var target = m(navsList).getTransform("translateX") + speed * 100;
			var bezier = '';
			bezier = 'cubic-bezier(.17,.67,.81,.9)';
			if (target > 0) {
				target = 0;
			} else if (target < minX) {
				target = minX;
				if (m(navsList).width() < window_w) {
					target = 0;
				}
			}
			// 过度时间0.5s
			navsList[0].style.transition = '0.8s ' + bezier;
			m(navsList).setTransform("translateX", target);
		}

		// position left
		function positionLeft(p) {

			var navsList_w = m(navsList).width();
			var current_left = m(p).offset().left;
			var scroll_left = navsList_w - window_w;
			if (navsList_w > window_w) {
				if (Math.abs(current_left) < Math.abs(scroll_left)) {
					m(navsList).setTransform("translateX", -current_left);
				} else {
					m(navsList).setTransform("translateX", -scroll_left);
				}
				m(navsList).transition("all", 800, "ease");
			}
		}

		// position center
		function positionCenter(p) {

			var navsList_w = m(navsList).outerWidth();
			var current_left = m(p).offset().left;
			var current_w = m(p).outerWidth();
			var current_center = Math.abs(window_w / 2);
			var offsetCenter = current_left - current_center + current_w / 2;
			var scroll_left = navsList_w - window_w;
			console.log(current_center);
			if (navsList_w > window_w) {
				if (Math.abs(current_left) > Math.abs(current_center)) {
					if (Math.abs(scroll_left) < offsetCenter) {
						m(navsList).setTransform("translateX", -Math.abs(scroll_left));
					} else {
						m(navsList).setTransform("translateX", -offsetCenter);
					}
				} else {
					m(navsList).setTransform("translateX", 0);
				}
				m(navsList).transition("all", 800, "ease");
			}
		}
	}
}();

// 图片轮播
var slide = function () {

	window.addEventListener("load", function () {
		var wrap = document.querySelectorAll(".mobile-slide");
		for (var i = 0; i < wrap.length; i++) {
			banner(wrap[i]);
		}
	});

	function banner(mobile_slide) {

		var wrap = mobile_slide;
		var list = wrap.querySelector(".mobile-slide-list");

		// 轮播时间 
		var time = wrap.getAttribute("data-time") || "3000";
		var isAuto = m(wrap).hasAttr("data-auto"); //自动播放
		var isLoop = m(wrap).hasAttr("data-no-loop"); //禁止循环

		time = parseInt(time);
		var timerId = 0;
		var elementX = 0;
		var startX = 0;
		var startY = 0;
		var now = 0;
		var isLink = true;
		var isAddMoveEvent = false; // 判断是否往上拖动
		var isAddMoveEventFirst = true; // 判断是否第一往上拖动

		// 小圆点
		var spanNodes = wrap.querySelectorAll(".mobile-slide-radius span");
		m(list).setTransform('translateZ', 0.01);
		if (!isLoop) {
			list.innerHTML += list.innerHTML;
		}

		var liNodes = wrap.querySelectorAll(".mobile-slide-list li");

		// 添加样式
		//			mobile_slide.style.overflow = "hidden"
		//			list.style.width = liNodes.length + '00%';

		//			for(var l = 0; l < liNodes.length; l++) {
		//				liNodes[l].style.width = (1 / liNodes.length * 100) + '%';
		//			};

		wrap.addEventListener("touchstart", start);

		// start
		function start(event) {
			event.preventDefault();
			var touch = event.changedTouches[0];
			isLink = true;
			clearInterval(timerId);
			list.style.transition = 'none';
			var left = m(list).getTransform("translateX");
			var now = Math.round(-left / document.documentElement.clientWidth);

			isAddMoveEvent = false; // 判断是否top拖动
			isAddMoveEventFirst = true; // 判断是否第一往上拖动

			// 是否循环
			if (!isLoop) {
				if (now == 0) {
					now = spanNodes.length;
				} else if (now == liNodes.length - 1) {
					now = spanNodes.length - 1;
				}
			}

			m(list).setTransform('translateX', -now * document.documentElement.clientWidth);

			startX = touch.clientX;
			startY = touch.clientY;
			elementX = m(list).getTransform('translateX');
		}

		wrap.addEventListener("touchmove", move);

		function move(event) {
			event.preventDefault();
			var touch = event.changedTouches[0];
			var nowX = touch.clientX;
			var nowY = touch.clientY;
			var disX = nowX - startX;

			if (Math.abs(nowX - startX) > 1 || Math.abs(nowY - startY) > 1) {
				isLink = false;
			}

			// 检查是否向上移动
			var _x = Math.abs(nowX - startX);
			var _y = Math.abs(nowY - startY);
			if (isAddMoveEventFirst && _x != _y) {
				isAddMoveEventFirst = false;
				if (_y > _x) {
					isAddMoveEvent = true;
				}
			}
			if (isAddMoveEvent) {

				return;
			}

			// 禁止循环
			if (isLoop) {
				var window_w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
				var minX = Math.abs(list.offsetWidth * spanNodes.length - window_w);
				var translateX = elementX + disX;
				if (translateX > 0) {
					var scale = 1 - translateX / window_w;
					translateX = translateX * scale;
				} else if (Math.abs(translateX) > minX) {
					var over = Math.abs(translateX) - Math.abs(minX);
					var scale = 1 - over / window_w;
					translateX = -minX - over * scale;
				}

				m(list).setTransform('translateX', translateX);
			}

			if (!isLoop) {
				clearInterval(timerId);
				m(list).setTransform('translateX', elementX + disX);
			}
		}

		wrap.addEventListener("touchend", end);

		//touchend
		function end(event) {
			event.preventDefault();
			var touch = event.changedTouches[0];
			var nowX = touch.clientX;
			var nowY = touch.clientY;

			// 自动播放
			if (isAuto && !isLoop) {
				timerId = auto(time);
			}

			// a链接
			if (isLink) {

				var href = m(event.target).closest("a").attr("href") || "javascript:;";
				window.location.assign(href);
			}

			var left = m(list).getTransform("translateX");
			var ratio = -left / document.documentElement.clientWidth;
			if (nowX > startX) {

				now = m.round(ratio, 0.8);
				
			} else {
				now = m.round(ratio, 0.2);
				
			}

			if (now < 0) {
				now = 0;
			} else if (now > liNodes.length - 1) {
				now = liNodes.length - 1;
			}

			list.style.transition = '0.5s';
			m(list).setTransform('translateX', -now * document.documentElement.clientWidth);

			//同步小圆点
			for (var i = 0; i < spanNodes.length; i++) {
				spanNodes[i].classList.remove("active");
			}

			spanNodes[now % spanNodes.length].classList.add("active");
		}

		// 自动播放
		if (isAuto && !isLoop) {
			timerId = auto(time);
		}

		function auto(t) {

			return setInterval(function () {
				list.style.transition = 'none';

				// 是否循环
				if (!isLoop) {
					if (now == liNodes.length - 1) {
						now = spanNodes.length - 1;
					}
				}
				m(list).setTransform('translateX', -now * document.documentElement.clientWidth);
				setTimeout(function () {
					now++;
					list.style.transition = '0.5s ease-in-out';
					m(list).setTransform('translateX', -now * document.documentElement.clientWidth);
					for (var i = 0; i < spanNodes.length; i++) {
						spanNodes[i].className = '';
					}
					spanNodes[now % spanNodes.length].className = 'active';
				}, 20);
			}, t);
		}
	}
}();

// 图片轮播
var tab = function () {

	m(function () {
		var wrap = m(".mobile-tab-slide");
		wrap.each(function () {
			tabSlide(this);
		});
	});

	function tabSlide(mobile_slide) {

		var wrap = m(mobile_slide);
		var list = wrap.find(".mobile-tab-slide-list");
		var liNodes = wrap.find(".mobile-tab-slide-item");
		var spanNodes = wrap.find(".mobile-slide-radius span"); // 小圆点
		var wrap_w = wrap.width();
		list.width(wrap_w * liNodes.length);
		liNodes.width(wrap_w);

		m(window).resize(function () {
			wrap_w = wrap.width();
			list.width(wrap_w * liNodes.length);
			liNodes.width(wrap_w);
		});

		var isLoop = wrap.hasAttr("data-no-loop"); //禁止循环
		//time = parseInt(time);
		var timerId = 0;
		var elementX = 0;
		var startX = 0;
		var startY = 0;
		var now = 0;
		var isAddMoveEvent = false; // 判断是否往上拖动
		var isAddMoveEventFirst = true; // 判断是否第一往上拖动


		m(list).setTransform('translateZ', 0.01);

		wrap.on("touchstart", start);

		// start
		function start(event) {
			event.preventDefault();
			var touch = event.changedTouches[0];
			clearInterval(timerId);
			list.transition("null", 0);
			var left = m(list).getTransform("translateX");
			var now = Math.round(-left / document.documentElement.clientWidth);

			isAddMoveEvent = false; // 判断是否top拖动
			isAddMoveEventFirst = true; // 判断是否第一往上拖动

			m(list).setTransform('translateX', -now * document.documentElement.clientWidth);
			startX = touch.clientX;
			startY = touch.clientY;
			elementX = m(list).getTransform('translateX');
		}

		wrap.on("touchmove", move);

		function move(event) {
			event.preventDefault();
			var touch = event.changedTouches[0];
			var nowX = touch.clientX;
			var nowY = touch.clientY;
			var disX = nowX - startX;

			var _x = Math.abs(nowX - startX);
			var _y = Math.abs(nowY - startY);
			if (isAddMoveEventFirst && _x != _y) {
				isAddMoveEventFirst = false;
				if (_y > _x) {
					isAddMoveEvent = true;
				}
			}
			if (isAddMoveEvent) {

				return;
			}

			// 禁止循环
			if (isLoop) {
				var window_w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
				var minX = Math.abs(list.width() - window_w);
				var translateX = elementX + disX;
				if (translateX > 0) {
					var scale = 1 - translateX / window_w;
					translateX = translateX * scale;
				} else if (Math.abs(translateX) > minX) {
					var over = Math.abs(translateX) - Math.abs(minX);
					var scale = 1 - over / window_w;
					translateX = -minX - over * scale;
					console.log("9999");
				}

				m(list).setTransform('translateX', translateX);
			}

			if (!isLoop) {
				clearInterval(timerId);
				m(list).setTransform('translateX', elementX + disX);
			}
		}

		wrap.on("touchend", end);

		//touchend
		function end(event) {
			event.preventDefault();
			var touch = event.changedTouches[0];
			var nowX = touch.clientX;
			var nowY = touch.clientY;

			// a链接
			//			if(isLink) {
			//				var href = m(event.target).closest("a").attr("href") || "javascript:;";
			//				window.location.assign(href);
			//			}

			var left = m(list).getTransform("translateX");
			var ratio = -left / document.documentElement.clientWidth;
			if (nowX > startX) {

				now = m.round(ratio, 0.8);
				
			} else {
				now = m.round(ratio, 0.2);
				
			}

			if (now < 0) {
				now = 0;
			} else if (now > liNodes.length - 1) {
				now = liNodes.length - 1;
			}

			list.transition("all", 500);
			m(list).setTransform('translateX', -now * document.documentElement.clientWidth);

			//同步小圆点
			for (var i = 0; i < spanNodes.length; i++) {
				spanNodes[i].classList.remove("active");
			}

			spanNodes[now % spanNodes.length].classList.add("active");
		}
	}
}();

exports.commonStyle = commonStyle;
exports.scrollTopBottom = scrollTopBottom;
exports.scrollLeftRight = scrollLeftRight;
exports.slide = slide;
exports.tab = tab;

Object.defineProperty(exports, '__esModule', { value: true });

})));
