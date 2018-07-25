var scrollTopBottom = (function() {

	m(document).touchstart(function(event) {
		event.preventDefault();

	});

	m(document).touchmove(function(event) {
		event.preventDefault();

	});
	m(document).touchend(function(event) {
		event.preventDefault();

	});

	m(document).touchcancel(function(event) {
		event.preventDefault();

	});
	
	
	m(function() {
		topBottom();
	})

	//导航拖拽
	function topBottom() {
		var scrolltb = m(".mobile-scroll-topbottom");

		for(var i = 0; i < scrolltb.length; i++) {
			topBottomFun(scrolltb[i]);

		}

	}

	//导航拖拽fun
	function topBottomFun(scrolltb) {

		var topbottomContent = m(scrolltb).find(".mobile-scroll-topbottom-content");
		m(topbottomContent).setTransform('translateZ', 0.01);
		var isScrollTop = m(scrolltb).hasAttr("data-scrolltop"); // 是否下拉
		var isScrollBottom = m(scrolltb).hasAttr("data-scrollbottom"); // 是否上拉

		var isScrollBar = m(scrolltb).hasAttr("data-scroll-bar") // 是否显示滚动条
		if(isScrollBar) {
			var scrollBar = document.createElement("div"); // 创建滚动条
			scrollBar.classList.add("mobile-scroll-bar");
			scrolltb.appendChild(scrollBar)
		}

		var beginTime = 0;
		var beginValue = 0;
		var endTime = 0;
		var endValue = 0;
		var disTime = 0;
		var disValue = 0;
		var eleY = 0; // 元素初始位置
		var startY = 0;
		var startX = 0;
		var isLink = true;
		var isAddMoveEvent = false; // 判断是否往上拖动
		var isAddMoveEventFirst = true; // 判断是否第一往上拖动

		var window_h = window.innerHeight ||
			document.documentElement.clientHeight ||
			document.body.clientHeight;

		// 滚动条
		var bar_h = m(topbottomContent).height();
		var bar_wrap_h = m(scrolltb).height();
		var sale_bar = bar_wrap_h / bar_h;
		var scroll_bar_h = window_h * sale_bar;
		var mobile_scroll_bar = m(scrolltb).find(".mobile-scroll-bar");
		if(isScrollBar) {
			mobile_scroll_bar.height(scroll_bar_h);
		}

		m(scrolltb).on("touchstart", start);

		function start(event) {
			event.preventDefault();
			var touch = event.changedTouches[0];
			startY = touch.clientY;
			startX = touch.clientX;
			isLink = true;
			eleY = m(topbottomContent).getTransform("translateY");
			beginTime = new Date().getTime();
			beginValue = eleY;
			disValue = 0;

			window_h = window.innerHeight ||
				document.documentElement.clientHeight ||
				document.body.clientHeight;

			// 过度时间0s
			topbottomContent[0].style.transition = 'none';

			// 滚动条
			if(isScrollBar) {
				mobile_scroll_bar.transition("null", 0);
				bar_h = m(topbottomContent).height();
				bar_wrap_h = m(scrolltb).height();
				sale_bar = bar_wrap_h / bar_h;
				scroll_bar_h = window_h * sale_bar;
				mobile_scroll_bar = m(scrolltb).find(".mobile-scroll-bar");
				mobile_scroll_bar.height(scroll_bar_h);
			}

		};

		m(scrolltb).on("touchmove", move);

		function move(event) {
			event.preventDefault();
			var touch = event.changedTouches[0];
			var nowY = touch.clientY;
			var dis = nowY - startY;
			var nowX = touch.clientX;

			if(Math.abs(nowX - startX) > 1 || Math.abs(nowY - startY) > 1) {
				isLink = false;
			}

			// 滚动条
			if(isScrollBar) {
				var scroll_Y = m(topbottomContent).getTransform("translateY");
				var scroll_box_h = m(topbottomContent).height();
				var scroll_box_sale = scroll_Y / scroll_box_h;
				mobile_scroll_bar.setTransform("translateY", -bar_wrap_h * scroll_box_sale);
			}

			// 检查是否向上移动
			if(Math.abs(nowX - startX) > Math.abs(nowY - startY) && isAddMoveEventFirst) {

				isAddMoveEvent = true;
				isAddMoveEventFirst = false;

			}

			if(isAddMoveEvent) {
				return;
			}

			// scroll上下滚动scrolltopbottom自定义事件
			m(this).trigger("scrolltopbottom", { el:topbottomContent[0],barFun:scrollBarFun});

			var minY = window_h - topbottomContent[0].offsetHeight;
			var translateY = eleY + dis;
			if(translateY > 0) {
				var scale = 1 - translateY / window_h;
				translateY = translateY * scale;

				// 是否下拉
				if(!isScrollTop) {
					translateY = 0;
				}

				// scroll顶部 scrolltop自定义事件
				m(this).trigger("scrolltop", { el:topbottomContent[0],barFun:scrollBarFun});

			} else if(translateY < minY) {
				var over = Math.abs(translateY - minY);
				var scale = 1 - over / window_h;
				translateY = minY - over * scale;

				// 是否下拉
				if(!isScrollBottom) {

					translateY = minY;
				}
				
				// scroll底部 scrollbottom自定义事件
				m(this).trigger("scrollbottom", { el:topbottomContent[0],barFun:scrollBarFun});
				if((m(topbottomContent).height()) < (window_h)) {
					translateY = 0;
				}

				
			}

			m(topbottomContent).setTransform("translateY", translateY);
			endTime = new Date().getTime();
			endValue = translateY;
			disTime = endTime - beginTime;
			disValue = endValue - beginValue;
		}

		m(scrolltb).on("touchend", end);

		function end(event) {

			var touch = event.changedTouches[0];
			var speed = disValue / (endTime - beginTime);
			isAddMoveEvent = false; // 判断是否top拖动
			isAddMoveEventFirst = true; // 判断是否第一往上拖动

			// a链接
			if(isLink) {

				event.stopPropagation();
				var href = m(event.target).closest("a").attr("href") || "javascript:;";
				window.location.assign(href);
			}

			var minY = window_h - topbottomContent[0].offsetHeight;
			var target = m(topbottomContent).getTransform("translateY") + speed * 200;
			var bezier = '';

			if(target > 0) {
				target = 0;

				bezier = 'cubic-bezier(.17,.67,.81,.9)';

			} else if(target < minY) {
				target = minY;
				bezier = 'cubic-bezier(.17,.67,.81,.9)';
				if(m(topbottomContent).height() < window_h) {
					target = 0;

				}
				
			}

			// 滚动条
			if(isScrollBar) {
				var scroll_Y = target;
				var scroll_box_h = m(topbottomContent).height();
				var scroll_box_sale = scroll_Y / scroll_box_h;
				mobile_scroll_bar.setTransform("translateY", -m(scrolltb).height() * scroll_box_sale);
				mobile_scroll_bar.transition("all", 500);
				//mobile_scroll_bar.css("opacity",0);
			}
			// 过度时间0.5s
			topbottomContent[0].style.transition = '.5s ' + bezier;
			m(topbottomContent).setTransform("translateY", target);

		}
		
		function scrollBarFun(){
		// 滚动条
			if(isScrollBar) {
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

})();

export {

	scrollTopBottom
}