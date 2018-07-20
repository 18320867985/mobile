// 图片轮播
	var slide =(function() {

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
			var isAuto = wrap.getAttribute("data-auto"); //自动播放

			time = parseInt(time);
			var timerId = 0;
			var elementX = 0;
			var startX = 0;
			var startY = 0;
			var now = 0;
			var isLink = true;
			var isAddMoveEvent = true; // 判断是否往上拖动
		//	var isAddMoveEventFirst = true; // 判断是否第一往上拖动

			// 小圆点
			var spanNodes = wrap.querySelectorAll(".mobile-slide-radius span");
			m(list).setTransform('translateZ', 0.01)
			list.innerHTML += list.innerHTML
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

				var touch = event.changedTouches[0];
				isLink = true;
				clearInterval(timerId);
				list.style.transition = 'none';
				var left = m(list).getTransform("translateX");
				var now = Math.round(-left / document.documentElement.clientWidth)

				if(now == 0) {
					now = spanNodes.length
				} else if(now == liNodes.length - 1) {
					now = spanNodes.length - 1
				}
				m(list).setTransform('translateX', -now * document.documentElement.clientWidth);

				startX = touch.clientX;
				startY = touch.clientY;

				elementX = m(list).getTransform('translateX');
				//wrap.addEventListener("touchmove", move);
			}

			wrap.addEventListener("touchmove", move);
			function move(event) {
				event.preventDefault();
				var touch = event.changedTouches[0];
				var nowX = touch.clientX;
				var nowY = touch.clientY;
				var disX = nowX - startX;
				
				clearInterval(timerId);
				isLink = false;
				m(list).setTransform('translateX', elementX + disX);

			}

			wrap.addEventListener("touchend", end);

			//touchend
			function end(event) {

				var touch = event.changedTouches[0];
				var nowX = touch.clientX;
				var nowY = touch.clientY;

				// 自动播放
				if(isAuto !== null) {

					timerId = auto(time);
				}

		
				// a链接
				if(isLink) {
					isLink = true;
					var href = "";
					var _a=m(event.target).find("a");
					
					if(_a.nodeName == "A") {
						// 包裹一层
						href =_a.attr("href") || "javascript:;";
						window.location.assign(href);
					} 
					
				}

				var left = m(list).getTransform("translateX");
				now = Math.round(-left / document.documentElement.clientWidth)
				if(now < 0) {
					now = 0
				} else if(now > liNodes.length - 1) {
					now = liNodes.length - 1
				}

				list.style.transition = '0.5s';
				m(list).setTransform('translateX', -now * document.documentElement.clientWidth);

				//同步小圆点
				for(var i = 0; i < spanNodes.length; i++) {
					spanNodes[i].className = '';
				}

				spanNodes[now % spanNodes.length].className = 'active';
			}

			//系统取消 重新加载页面
//			wrap.addEventListener("touchcancel", function() {
//				//window.location.reload();
//			});

			// 自动播放

			if(isAuto !== null) {

				timerId = auto(time);
			}

			function auto(t) {

				return setInterval(function() {
					list.style.transition = 'none';
					if(now == liNodes.length - 1) {
						now = spanNodes.length - 1;
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
