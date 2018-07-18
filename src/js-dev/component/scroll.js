	// css3 transform 函数
	
	// 菜单滑动
	var scroll = (function() {

		window.addEventListener("load", function() {
			navSlide();

		});
		//导航拖拽
		function navSlide() {
			var navs = m(".mobile-scroll");

			for(var i = 0; i < navs.length; i++) {
				navsListFun(navs[i]);
				changeColor(navs[i]);

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

			m(navs).on("touchstart", start);

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
			m(navs).on("touchmove", move);

			};

		
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

				var minX = window_w - navsList[0].offsetWidth;

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

			m(navs).on("touchend", end);

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
				var minX =window_w - navsList[0].offsetWidth;
				
				var target =m(navsList).getTransform("translateX")+ speed * 50;
				var bezier = '';

				if(target > 0) {
					target = 0;

					bezier = 'cubic-bezier(.17,.67,.81,.9)';
				} else if(target < minX) {
					target = minX;
					bezier = 'cubic-bezier(.17,.67,.81,.9)';
					if(m(navsList).width()<window_w){
						target = 0;
					}
				}
				// 过度时间0.5s
				navsList[0].style.transition = '.5s ' + bezier;
				m(navsList).setTransform("translateX" ,target);
			}

			//系统取消 重新加载页面
//			navs.addEventListener("touchcancel", function() {
//				//window.location.reload();
//
//			});

		}

		///导航点击选中样式
		function changeColor(navs, fn) {
			var Linodes = m(navs).find(".mobile-scroll-list li ");
			var isLink = navs.getAttribute("data-link");
			// 对li进行遍历
			var _length=Linodes.length
			for(var i = 0; i < _length; i++) {

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

	})()
	
	
	
	export {
		scroll
	}
