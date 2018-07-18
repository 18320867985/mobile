	// css3 transform 函数
	var transformCss = function(node, name, value) {
		if(!node.transform) {
			node.transform = {};
		}
		if(arguments.length > 2) {
			//写
			//把名值对添加到对象
			node.transform[name] = value;
			var result = '';
			for(var item in node.transform) {
				switch(item) {
					case 'rotate':
					case 'rotateX':
					case 'rotateY':
					case 'rotateZ':
					case 'skew':
					case 'skewX':
					case 'skewY':
					case 'skewZ':
						result += item + '(' + node.transform[item] + 'deg)  ';
						break;
					case 'scale':
					case 'scaleX':
					case 'scaleY':
					case 'scaleZ':
						result += item + '(' + node.transform[item] + ')  ';
						break;
					case 'translate':
					case 'translateX':
					case 'translateY':
					case 'translateZ':
						result += item + '(' + node.transform[item] + 'px)  ';
						break;

				};

			};
			node[0].style.transform = result;

		} else {
			//读
			if(typeof node.transform[name] == 'undefined') {
				if(name == 'scale' || name == 'scaleX' || name == 'scaleY') {
					value = 1

				} else {
					value = 0
				}

			} else {
				value = node.transform[name];

			}
			return value;

		}

	}

	// 菜单滑动
	var scroll = function(fn) {

		window.addEventListener("load", function() {
			navSlide(fn);

		});
		//导航拖拽
		function navSlide(fn) {
			var navs = m(".mobile-scroll");

			for(var i = 0; i < navs.length; i++) {
				navsListFun(navs[i]);
				changeColor(navs[i], fn);

			}

		}

		//导航拖拽fun
		function navsListFun(navs) {

			var navsList = m(navs).find(".mobile-scroll-list");
			m(navsList).setTransform('translateZ', 0.01);
			var beginTime = 0;
			var beginValue = 0;
			var endTime = 0;
			var endValue = 0;
			var disTime = 0;
			var disValue = 0;
			var eleX = 0; // 元素初始位置
			var startX = 0;
			var startY = 0;
			var isFirst = true; //手指初始位置
			isX = true;
			var isAddMoveEvent = true; // 判断是否top拖动
			var isAddMoveEventFirst = true; // 判断是否第一往上拖动

			navs.addEventListener("touchstart", start);

			function start(event) {
				var touch = event.changedTouches[0];
				startX = touch.clientX;
				startY = touch.clientY;
				eleX = m(navsList).getTransform("translateX");
				beginTime = new Date().getTime();
				beginValue = eleX;
				disValue = 0;

				// 过度时间0s
			navsList[0].style.transition = 'none';
				navs.addEventListener("touchmove", move);

			};

			//navs.addEventListener("touchmove", move);
			function move(event) {

				var touch = event.changedTouches[0];
				var nowX = touch.clientX;
				var nowY = touch.clientY;
				var dis = nowX - startX;

				// 检查是否向上移动
				if(Math.abs(nowY - startY) > Math.abs(nowX - startX) && isAddMoveEventFirst) {
					// 取消 浏览器默认行为
					navs.removeEventListener("touchmove", move);
					isAddMoveEvent = true;
					isAddMoveEventFirst = false;

					return;
				} else {
					if(isAddMoveEventFirst) {
						event.preventDefault();
						isAddMoveEvent = false;

					}

				}

				var window_w = window.innerWidth ||
					document.documentElement.clientWidth ||
					document.body.clientWidth;

				var minX = window_w - navsList.offsetWidth;

				var translateX = eleX + dis;
				if(translateX > 0) {
					var scale = 1 - translateX / window_w;
					translateX = translateX * scale;

				} else if(translateX < minX) {
					var over = minX - translateX;
					var scale = 1 - over / window_w;
					translateX = minX - over * scale;

				}
				
				m(navsList).setTransform("translateX", translateX);
				endTime = new Date().getTime();
				endValue = translateX;
				disTime = endTime - beginTime;
				disValue = endValue - beginValue;
			}

			navs.addEventListener("touchend", end);

			function end(event) {

				// 检查是否向上移动
				if(isAddMoveEventFirst === false) {
					isAddMoveEventFirst = true;
					return;
				}
				var touch = event.changedTouches[0];
				var speed = disValue / (endTime - beginTime);
				var window_w = window.innerWidth ||
					document.documentElement.clientWidth ||
					document.body.clientWidth;
				var minX = window_w - navsList.offsetWidth;
				var target = transformCss(navsList, "translateX") + speed * 250;
				var bezier = '';

				if(target > 0) {
					target = 0;

					bezier = 'cubic-bezier(.17,.67,.81,.9)';
				} else if(target < minX) {
					target = minX;
					bezier = 'cubic-bezier(.17,.67,.81,.9)';
				}
				// 过度时间0.5s
				navsList[0].style.transition = '.8s ' + bezier;
				transformCss(navsList, "translateX", target);
			}

			//系统取消 重新加载页面
			navs.addEventListener("touchcancel", function() {
				window.location.reload();

			});

		}

		///导航点击选中样式
		function changeColor(navs, fn) {
			var Linodes = navs.querySelectorAll(".mobile-scroll-list li ");
			var isLink = navs.getAttribute("data-link");
			// 对li进行遍历
			for(var i = 0; i < Linodes.length; i++) {

				//误触解决
				Linodes[i].addEventListener("touchmove", function() {
					if(!this.isMove) {
						this.isMove = true;

					}

				});

				Linodes[i].addEventListener("touchend", function(event) {

					//对每个li绑定touchend，添加classname
					if(!this.isMove) {
						for(var j = 0; j < Linodes.length; j++) {

							Linodes[j].classList.remove("active");
						}

						this.classList.add("active");
						// a链接
						if(isLink !== null) {
							var href = event.target.getAttribute("href") || "javascript:;";
							window.location.assign(href);
						}

						// 点击回调函数
						if(typeof fn === "function") {
							fn(this);
						}
					}
					this.isMove = false;

				});

			}

		}

	}
	
	
	
	export {
		scroll
	}
