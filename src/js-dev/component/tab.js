// 图片轮播
var tab = (function() {

	m(function() {
		var wrap = m(".mobile-tab-slide");
		wrap.each(function() {
			tabSlide(this);
		});

	});

	m(window).resize(function() {
		var tab = m(".mobile-tab-slide");
		var window_w = m(window).width();
		tab.width(window_w);

		tab.each(function() {
			var wrap = m(this);
			var list = wrap.find(".mobile-tab-slide-list");
			var liNodes = wrap.find(".mobile-tab-slide-item");
			var wrap_w = wrap.width();
			list.width(wrap_w * liNodes.length);
			liNodes.width(wrap_w);

		});

	});

	function tabSlide(mobile_slide) {
		var window_w = m(window).width();
		var wrap = m(mobile_slide);
		var list = wrap.find(".mobile-tab-slide-list");
		var liNodes = wrap.find(".mobile-tab-slide-item");
		var spanNodes = wrap.find(".mobile-slide-radius span"); // 小圆点
		wrap.width(window_w);
		var wrap_w = wrap.width();
		list.width(wrap_w * liNodes.length);
		liNodes.width(wrap_w);

		var isLoop = wrap.hasAttr("data-no-loop"); //禁止循环
		//time = parseInt(time);
		var timerId = 0;
		var elementX = 0;
		var startX = 0;
		var startY = 0;
		var now = 0;
		var isLink = true;
		var isAddMoveEvent = false; // 判断是否往上拖动
		var isAddMoveEventFirst = true; // 判断是否第一往上拖动

		m(list).setTransform('translateZ', 0.01)

		wrap.on("touchstart", start);

		// start
		function start(event) {
			event.preventDefault();
			var touch = event.changedTouches[0];
			isLink = true;
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

			if(Math.abs(nowX - startX) > 1 || Math.abs(nowY - startY) > 1) {
				isLink = false;
			}

			// 检查是否向上移动
			var _x = Math.abs(nowX - startX);
			var _y = Math.abs(nowY - startY);
			if(isAddMoveEventFirst && (_x != _y)) {
				isAddMoveEventFirst = false;
				if(_y > _x) {
					isAddMoveEvent = true;
				}
			}
			if(isAddMoveEvent) {

				return;
			}

			// 禁止循环
			if(isLoop) {
				var window_w = window.innerWidth ||
					document.documentElement.clientWidth ||
					document.body.clientWidth;
				var minX = Math.abs(list.width() - window_w);
				var translateX = elementX + disX;
				if(translateX > 0) {
					var scale = 1 - translateX / window_w;
					translateX = translateX * scale;

				} else if(Math.abs(translateX) > minX) {
					var over = Math.abs(translateX) - Math.abs(minX);
					var scale = 1 - over / window_w;
					translateX = -minX - over * scale;
					console.log("9999")
				}

				m(list).setTransform('translateX', translateX);
			}

			if(!isLoop) {
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
			if(nowX > startX) {

				now = m.round(ratio, 0.8);
				if(left > 0) {

				}

			} else {
				now = m.round(ratio, 0.2);
				if(left < 0) {

				}
			}

			if(now < 0) {
				now = 0
			} else if(now > liNodes.length - 1) {
				now = liNodes.length - 1
			}

			list.transition("all", 500);
			m(list).setTransform('translateX', -now * document.documentElement.clientWidth);

			//同步小圆点
			for(var i = 0; i < spanNodes.length; i++) {
				spanNodes[i].classList.remove("active");
			}

			spanNodes[now % spanNodes.length].classList.add("active");
		}

	}

})()

export {
	tab
}