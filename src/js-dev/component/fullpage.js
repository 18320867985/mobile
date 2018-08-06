/*上下拉全屏*/
var fullpage = (function(m) {

	m(function() {
		var wrap = m(".mobile-fullpage");
		wrap.each(function(i, v) {
			fullpageSlide(v);
		});

	});

		m(window).resize(function() {
			reset()
		});
	
		function reset() {
			
	
			var tab = m(".mobile-fullpage");
			if(tab.length > 0) {
				var window_h = m(tab).parent().height(); //m(window).width();
				tab.height(window_h);

				tab.each(function(i,v) {
					var wrap = m(v);
					var list = wrap.find(".mobile-fullpage-list");
					var liNodes = wrap.find(".mobile-fullpage-list-item");
					var wrap_w = wrap.height();
					list.height(wrap_w * liNodes.length);
					liNodes.height(wrap_w);
				
	
				});
	
			}
			
			//m.commonStyle.reset();
	
		}

	function fullpageSlide(mobile_slide) {
		var window_h = m(mobile_slide).height();
		var wrap = m(mobile_slide);
		var list = wrap.find(".mobile-fullpage-list");
		var liNodes = wrap.find(".mobile-fullpage-list-item");

		wrap.height(window_h);
		var wrap_h = wrap.height();
		list.height(wrap_h * liNodes.length);
		liNodes.height(wrap_h);
		
		var isDrag = wrap.hasAttr("data-drag"); //左右两边回弹
		var tab_nav_slide_lineX = 0; // 滑动下面的线条

		var elementY = 0;
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
			list = wrap.find(".mobile-fullpage-list");
			liNodes = wrap.find(".mobile-fullpage-list-item");

			isLink = true;
			list.transition("null");
			var top = m(list).getTransform("translateY");
			now = Math.round(-top / m(mobile_slide).height());
			
			isAddMoveEvent = false; // 判断是否top拖动
			isAddMoveEventFirst = true; // 判断是否第一往上拖动

			m(list).setTransform('translateY', -now * m(mobile_slide).height());
			startX = touch.clientX;
			startY = touch.clientY;
			elementY = m(list).getTransform('translateY');

			
		}

		wrap.on("touchmove", move);

		function move(event) {
			event.preventDefault();
			var touch = event.changedTouches[0];
			var nowX = touch.clientX;
			var nowY = touch.clientY;
			var disY = nowY - startY;

			if(Math.abs(nowY - startY) > 1 || Math.abs(nowX - startX) > 1) {
				isLink = false;
			}

			// 检查是否向上移动
			var _y = Math.abs(nowY - startY);
			var _x = Math.abs(nowX - startX);
			if(isAddMoveEventFirst && (_y != _x)) {
				isAddMoveEventFirst = false;
				if(_x > _y) {
					isAddMoveEvent = true;
				}
			}
			if(isAddMoveEvent) {

				return;
			}

			// 回弹
			window_h = m(mobile_slide).height();
			var minY = Math.abs(list.height() - window_h);
			var translateY = elementY + disY;

			if(isDrag) {

				if(translateY > 0) {
					var scale = 1 - translateY / window_h;
					translateY = translateY * scale;

				} else if(Math.abs(translateY) > minY) {
					var over = Math.abs(translateY) - Math.abs(minY);
					var scale = 1 - over / window_h;
					translateY = -minY - over * scale;
				}

				m(list).setTransform('translateY', translateY);
			} else {
				if(translateY > 0) {
					translateY = 0;
					line_SlideY = 0;
				} else if(Math.abs(translateY) > Math.abs(minY)) {
					translateY = -minY;
					line_SlideY = translateY - elementY;
				}

				m(list).setTransform('translateY', translateY);

			}
	
			m(list).setTransform('translateY', translateY);
		}

		wrap.on("touchend", end);

		//touchend
		function end(event) {
			event.preventDefault();
			var touch = event.changedTouches[0];
			var nowX = touch.clientX;
			var nowY = touch.clientY;

			var top = m(list).getTransform("translateY");
			var ratio = -top / m(mobile_slide).height();
			if(nowY > startY) {
				now = m.round(ratio, 0.95);

			} else {
				now = m.round(ratio, 0.05);
			}

			if(now < 0) {
				now = 0
			} else if(now > liNodes.length - 1) {
				now = liNodes.length - 1
			}
			//tab tabend左右滑动结束发生的事件
			m(this).trigger("fullpageend", {
				el: liNodes.eq(now)

			});
			
			// 添加active
				liNodes.removeClass("active");
				liNodes.eq(now).addClass("active");
			list.transition("all", 500);
			m(list).setTransform('translateY', -now * m(mobile_slide).height());

		}

	}

})(mobile);

export {
	fullpage
}