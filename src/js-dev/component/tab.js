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

		wrap.width(window_w);
		var wrap_w = wrap.width();
		list.width(wrap_w * liNodes.length);
		liNodes.width(wrap_w);

		var isDrag = wrap.hasAttr("data-no-drag"); //左右两边回弹

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
			list.transition("null");
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

			// 回弹
			window_w = m(window).width();
			var minX = Math.abs(list.width() - window_w);
			//console.log(minX)
			var translateX = elementX + disX;
			if(isDrag) {

				if(translateX > 0) {
					var scale = 1 - translateX / window_w;
					translateX = translateX * scale;

				} else if(Math.abs(translateX) > minX) {
					var over = Math.abs(translateX) - Math.abs(minX);
					var scale = 1 - over / window_w;
					translateX = -minX - over * scale;
				}

				m(list).setTransform('translateX', translateX);
			} else {
				if(translateX > 0) {
					translateX = 0;

				} else if(Math.abs(translateX) > Math.abs(minX)) {
					translateX = -minX;
				}

				m(list).setTransform('translateX', translateX);
			}

		}

		wrap.on("touchend", end);

		//touchend
		function end(event) {
			event.preventDefault();
			var touch = event.changedTouches[0];
			var nowX = touch.clientX;
			var nowY = touch.clientY;

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

			//tab tabend自定义事件
			m(this).trigger("tabend", {
				el: liNodes[now]

			});

		}

	}

	// 事件使用
	m(".mobile-tab-slide").on("tabend", function(event) {

		var el = event.detail.el;
		var id = m(el).attr("id") || m(el).attr("data-id");
		var dataId = '[data-target=\\#' + id + ']';
		var target = m(".mobile-tab").find(dataId);
		m(target).siblings().removeClass("active");
		m(target).addClass("active");
		var p = m(target).parents(".mobile-scroll-leftright");
		var isleft = p.hasAttr("data-position-left");
		//var isCenter= p.hasAttr("data-position-center");

		if(isleft) {
			positionLeft(target)
		} else {
			positionCenter(target);
		}

	});

	// position center
	function positionCenter(p) {
		var window_w = m(window).width();
		var navsList = m(p).parents(".mobile-scroll-content");
		var navsList_w = navsList.outerWidth();
		var current_left = m(p).offset().left;
		var current_w = m(p).outerWidth();
		var current_center = Math.abs(window_w / 2);
		var offsetCenter = (current_left - current_center) + current_w / 2;
		var scroll_left = navsList_w - window_w;

		if(navsList_w > window_w) {
			
			if(Math.abs(current_left) > Math.abs(current_center)) {
				if(Math.abs(scroll_left) < offsetCenter) {
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
	// position left
	function positionLeft(p) {
		var window_w = m(window).width();
		var navsList = m(p).parents(".mobile-scroll-content");
		var navsList_w = navsList.width();
		var current_left = m(p).offset().left;
		var scroll_left = navsList_w - window_w;
		if(navsList_w > window_w) {
			if(Math.abs(current_left) < Math.abs(scroll_left)) {
				m(navsList).setTransform("translateX", -current_left);
			} else {
				m(navsList).setTransform("translateX", -scroll_left);
			}
			m(navsList).transition("all", 800, "ease");
		}

	}

	// tab 左右滑动点击
	var isMOve_tab = true;
	var startX_tab = 0;
	var startY_tab = 0;
	m(".mobile-scroll-content li").on("touchstart", function(event) {

		var touch = event.changedTouches[0];
		startX_tab = touch.clientX;
		startY_tab = touch.clientY;
		isMOve_tab=true;

	});
	m(".mobile-scroll-content li").on("touchmove", function(event) {
		var touch = event.changedTouches[0];
		var nowX = touch.clientX;
		var nowY = touch.clientY;
		var dis = nowX - startX;
		if(Math.abs(nowX - startX_tab) > 1 || Math.abs(nowY - startY_tab) > 1) {
			isMOve_tab = false;
		}

	});
	m(".mobile-scroll-content li").on("touchend", function(event) {
		
		if(isMOve_tab) {
			var id = m(this).attr("data-target");
			var obj = m(id);
			var p = m(obj).parents(".mobile-tab-slide-list");
			var left = m(obj).offset().left;
			m(p).setTransform("translateX", -left);
			 var istransition=m(obj).parents(".mobile-tab-slide").hasAttr("data-transition");
			 if(istransition){
			 	m(p).transition("all", 500);
			 }
			
		}

	});

})()

export {
	tab
}