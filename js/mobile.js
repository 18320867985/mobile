var mobile = (function() {

	// 取消 document浏览器默认行为
	var documentPreventDefault = function(el) {
		el.addEventListener("touchstart", function(event) {
			event.preventDefault();
		});
		el.addEventListener("touchend", function(event) {
			event.preventDefault();
		});
		el.addEventListener("touchmove", function(event) {
			event.preventDefault();
		});

	};

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
					case 'skew':
					case 'skewX':
					case 'skewY':
					case 'skewZ':
						result += item + '(' + node.transform[item] + 'deg) ';
						break;
					case 'scale':
					case 'scaleX':
					case 'scaleY':
					case 'scaleZ':
						result += item + '(' + node.transform[item] + ') ';
						break;
					case 'translate':
					case 'translateX':
					case 'translateY':
					case 'translateZ':
						result += item + '(' + node.transform[item] + 'px) ';
						break;

				};

			};
			node.style.transform = result;

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
	var _scroll = function(fn) {

		window.addEventListener("load", function() {
			navSlide(fn);

		});
		//导航拖拽
		function navSlide(fn) {
			var navs = document.querySelectorAll(".mobile-scroll");

			for(var i = 0; i < navs.length; i++) {
				navsList(navs[i]);
				changeColor(navs[i], fn);
				documentPreventDefault(navs[i]);
			}

		}

		//导航拖拽fun
		function navsList(navs) {

			var navsList = navs.querySelector(".mobile-scroll-list");
			transformCss(navsList, 'translateZ', 0.01)
			var beginTime = 0;
			var beginValue = 0;
			var endTime = 0;
			var endValue = 0;
			var disTime = 0;
			var disValue = 0;

			//  元素初始位置
			var eleX = 0;
			//手指初始位置
			var startX = 0;
			var isFirst = true;
			isX = true;
			
			var isLink=true;
			navs.addEventListener("touchstart", function(event) {
				var touch = event.changedTouches[0];
				startX = touch.clientX;
				eleX = transformCss(navsList, "translateX");
				beginTime = new Date().getTime();
				beginValue = eleX;
				disValue = 0;

				// 过度时间0s
				navsList.style.transition = 'none';

			});

			navs.addEventListener("touchmove", function(event) {
				isLink=false;
				var touch = event.changedTouches[0];
				var nowX = touch.clientX;
				var dis = nowX - startX;
				var window_w = window.innerWidth ||
					document.documentElement.clientWidth ||
					document.body.clientWidth;

				var minX = window_w - navsList.offsetWidth;

				transformCss(navsList, "translateX", eleX + dis);
				var translateX = eleX + dis;
				if(translateX > 0) {
					var scale = 1 - translateX / window_w
					//           console.log(scale)
					translateX = translateX * scale;
					//           console.log(translateX)

				} else if(translateX < minX) {
					var over = minX - translateX;
					var scale = 1 - over / window_w;
					//              console.log(scale)
					translateX = minX - over * scale;
					//            console.log(translateX)

				}
				transformCss(navsList, "translateX", translateX);
				endTime = new Date().getTime();
				endValue = translateX;
				disTime = endTime - beginTime;
				disValue = endValue - beginValue;

			});

			navs.addEventListener("touchend", function(event) {
				var touch = event.changedTouches[0];
				var speed = disValue / (endTime - beginTime);
				var window_w = window.innerWidth ||
					document.documentElement.clientWidth ||
					document.body.clientWidth;
				var minX = window_w - navsList.offsetWidth;
				var target = transformCss(navsList, "translateX") + speed * 250;
				var bezier = '';
				//           console.log(speed);
				if(target > 0) {
					target = 0;

					bezier = 'cubic-bezier(.17,.67,.81,.9)';
				} else if(target < minX) {
					target = minX;
					bezier = 'cubic-bezier(.17,.67,.81,.9)';
				}
				// 过度时间0.5s
				navsList.style.transition = '.8s ' + bezier;
				transformCss(navsList, "translateX", target);
				
				
			// a链接
				if(isLink) {
					isLink = true;
					var href =event.target.getAttribute("href")|| "javascript:;";
					window.location.assign(href);
				}

				
			});

		}

		///导航点击选中样式
		function changeColor(navs, fn) {
			var Linodes = navs.querySelectorAll(".mobile-scroll-list li ");
			
			// 对li进行遍历
			for(var i = 0; i < Linodes.length; i++) {
				//误触解决
				Linodes[i].addEventListener("touchmove", function() {
					if(!this.isMove) {
						this.isMove = true;

					}

				});

				Linodes[i].addEventListener("touchend", function() {
					//对每个li绑定touchend，添加classname
					if(!this.isMove) {
						for(var j = 0; j < Linodes.length; j++) {

							Linodes[j].classList.remove("active");
						}

						this.classList.add("active");
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

	// 图片轮播
	var _slide = function() {

		window.addEventListener("load", function() {
			var wrap = document.querySelectorAll(".mobile-slide");
			for(var i = 0; i < wrap.length; i++) {
				banner(wrap[i]);
			}

		});

		function banner(mobile_slide) {

			var wrap = mobile_slide; //document.querySelector(".mobile-slide");
			var list = wrap.querySelector(".mobile-slide-list");

			// 小圆点
			var spanNodes = wrap.querySelectorAll(".mobile-slide-radius span");

			// 取消 浏览器默认行为
			documentPreventDefault(wrap);

			// 轮播时间 
			var time = wrap.getAttribute("data-time") || "3000";
			time = parseInt(time);

			var timerId = 0;

			transformCss(list, 'translateZ', 0.01)
			list.innerHTML += list.innerHTML
			var liNodes = wrap.querySelectorAll(".mobile-slide-list li")

			// 添加样式
			list.style.width = liNodes.length + '00%';

			for(var l = 0; l < liNodes.length; l++) {
				liNodes[l].style.width = (1 / liNodes.length * 100) + '%';
			};

			var elementX = 0;
			var startX = 0;

			var now = 0;
			//           var disX =0
			//           var  translateX =0;
			var isLink = false;
			wrap.addEventListener("touchstart", function(event) {
				isLink = true;
				clearInterval(timerId);
				list.style.transition = 'none';
				var left = transformCss(list, "translateX")
				var now = Math.round(-left / document.documentElement.clientWidth)

				if(now == 0) {
					now = spanNodes.length
				} else if(now == liNodes.length - 1) {
					now = spanNodes.length - 1
				}
				transformCss(list, 'translateX', -now * document.documentElement.clientWidth)

				var touch = event.changedTouches[0];
				//               elementX = list.offsetLeft;
				startX = touch.clientX
				//                elementX =translateX;
				elementX = transformCss(list, 'translateX')
			});

			wrap.addEventListener("touchmove", function(event) {
				isLink = false;
				var touch = event.changedTouches[0];
				var nowX = touch.clientX;
				var disX = nowX - startX
				//               translateX = elementX+disX
				//               list.style.transform = 'translateX('+translateX +'px)';
				transformCss(list, 'translateX', elementX + disX)
			});

			wrap.addEventListener("touchend", function(event) {
				event.preventDefault();

				//               var left =list.offsetLeft;
				//                   var left = translateX;
				var left = transformCss(list, "translateX")
				//               if(disX<0){
				//                now = Math.ceil(-left/document.documentElement.clientWidth)
				//               }else{
				//                   now = Math.floor(-left/document.documentElement.clientWidth)
				//
				//               }
				now = Math.round(-left / document.documentElement.clientWidth)
				if(now < 0) {
					now = 0
				} else if(now > liNodes.length - 1) {
					now = liNodes.length - 1
				}
				list.style.transition = '0.5s';
				//               translateX = -now*document.documentElement.clientWidth;
				//               list.style.transform = 'translateX('+translateX+'px)';
				transformCss(list, 'translateX', -now * document.documentElement.clientWidth)
				//同步小圆点
				for(var i = 0; i < spanNodes.length; i++) {
					spanNodes[i].className = ''
				}

				
				spanNodes[now % spanNodes.length].className = 'active';

				// a链接
				if(isLink) {
					isLink = false;
					var href = "";
					if(event.target.parentElement.nodeName == "A") {
						// 包裹一层
						href = event.target.parentElement.getAttribute("href") || "javascript:;";
					} else {
						// 包裹两层
						href = event.target.parentElement.parentElement.getAttribute("href") || "javascript:;";
					}

					window.location.assign(href);
				}
				
				// 自动播放
				timerId = auto(time);

			});

		

			// var now = 0;

			// 自动播放
			timerId = auto(time);

			function auto(t) {
				return setInterval(function() {
					list.style.transition = 'none'
					if(now == liNodes.length - 1) {
						now = spanNodes.length - 1
					}
					transformCss(list, 'translateX', -now * document.documentElement.clientWidth)
					setTimeout(function() {
						now++;
						list.style.transition = '.8s ease-in-out'
						transformCss(list, 'translateX', -now * document.documentElement.clientWidth)
						for(var i = 0; i < spanNodes.length; i++) {
							spanNodes[i].className = ''
						}
						spanNodes[now % spanNodes.length].className = 'active';

					}, 20)

				}, t);
			}
			
			// 页面skip
			function link(){
				
			}
		}

	}

	return {
		scroll: _scroll,
		slide: _slide

	}
})();