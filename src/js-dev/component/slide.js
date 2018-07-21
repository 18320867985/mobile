// 图片轮播
var slide = (function() {

	window.addEventListener("load", function() {
		var wrap = document.querySelectorAll(".mobile-slide");
		for(var i = 0; i < wrap.length; i++) {
			banner(wrap[i]);
		}

	});

	function banner(mobile_slide) {

		var wrap = mobile_slide; //document.querySelector(".mobile-slide");
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
		m(list).setTransform('translateZ', 0.01)
		if(!isLoop) {
			list.innerHTML += list.innerHTML
		}

		var liNodes = wrap.querySelectorAll(".mobile-slide-list li")

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
			var now = Math.round(-left / document.documentElement.clientWidth)

			// 是否循环
			if(!isLoop) {
				if(now == 0) {
					now = spanNodes.length;
				} else if(now == liNodes.length - 1) {
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
			isLink = false;

			// 检查是否向上移动
			if(Math.abs(nowY - startY) > Math.abs(nowX - startX) && isAddMoveEventFirst) {

				isAddMoveEvent = true;
				isAddMoveEventFirst = false;
			}

			if(isAddMoveEvent) {

				return;
			}

			// 禁止循环
			if(isLoop) {
				var window_w = window.innerWidth ||
					document.documentElement.clientWidth ||
					document.body.clientWidth;
				var minX = Math.abs(list.offsetWidth * spanNodes.length - window_w);
				//elementX = m(list).getTransform('translateX');
				console.log(list.offsetWidth)
				var translateX = elementX + disX;
				if(translateX > 0) {
					var scale = 1 - translateX / window_w;
					translateX = translateX * scale;

				} else if(Math.abs(translateX) > minX) {
					var over = Math.abs(translateX) - Math.abs(minX);
					var scale = 1 - over / window_w;
					translateX = -minX - over * scale;

					//console.log(translateX)
					//console.log(minX)
				}

				clearInterval(timerId);
				m(list).setTransform('translateX', translateX);
			}

			if(!isLoop) {
				clearInterval(timerId);
				m(list).setTransform('translateX', elementX + disX);
			}

		}

		wrap.addEventListener("touchend", end);

		//touchend
		function end(event) {

			var touch = event.changedTouches[0];
			var nowX = touch.clientX;
			var nowY = touch.clientY;

			isAddMoveEvent = false; // 判断是否top拖动
			isAddMoveEventFirst = true; // 判断是否第一往上拖动

			// 自动播放
			if(isAuto && !isLoop) {
				timerId = auto(time);
			}

			// a链接
			if(isLink) {
				event.stopPropagation();
				// a链接
				if(this.tagName === "A") {
					var href = this.getAttribute("href") || "javascript:;";
					window.location.assign(href);
				} else {
					var href = m(this).find("a").attr("href") || "javascript:;";
					window.location.assign(href);
				}

			}

			var left = m(list).getTransform("translateX");
			now = Math.round(-left / document.documentElement.clientWidth);

			if(now < 0) {
				now = 0
			} else if(now > liNodes.length - 1) {
				now = liNodes.length - 1
			}

			list.style.transition = '0.5s';
			m(list).setTransform('translateX', -now * document.documentElement.clientWidth);

			//同步小圆点
			for(var i = 0; i < spanNodes.length; i++) {
				spanNodes[i].classList.remove("active");
			}

			spanNodes[now % spanNodes.length].classList.add("active");
		}

		// 自动播放
		if(isAuto && !isLoop) {
			timerId = auto(time);
		}

		function auto(t) {

			return setInterval(function() {
				list.style.transition = 'none';

				// 是否循环
				if(!isLoop) {
					if(now == liNodes.length - 1) {
						now = spanNodes.length - 1;
					}
				}
				m(list).setTransform('translateX', -now * document.documentElement.clientWidth);
				setTimeout(function() {
					now++;
					list.style.transition = '0.5s ease-in-out';
					m(list).setTransform('translateX', -now * document.documentElement.clientWidth)
					for(var i = 0; i < spanNodes.length; i++) {
						spanNodes[i].className = '';
					}
					spanNodes[now % spanNodes.length].className = 'active';

				}, 20)

			}, t);
		}

	}

})()

export {
	slide
}