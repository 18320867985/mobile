var scrollTopBottom = (function(m) {

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

		var topbottomContent = m(scrolltb).find(".mobile-scroll-content");
		var many = m(scrolltb).find(".mobile-scroll-content-many.active");
		var isManyContent = false; //是否显示多内容
		if(topbottomContent.length === 0) {
			topbottomContent = many;
			isManyContent = true;
		}
		
		if(topbottomContent.length === 0) {
			return;
		}
	
		m(topbottomContent).setTransform('translateZ', 0.01);
		var isScrollTop = m(scrolltb).hasAttr("data-scroll-top"); // 是否下拉
		var isScrollBottom = m(scrolltb).hasAttr("data-scroll-bottom"); // 是否上拉

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
		var dis = 0;

		var window_h = m(scrolltb).height();
		var minY = window_h - topbottomContent.height();

		// 滚动条
		var bar_h = m(topbottomContent).height();
		var bar_wrap_h = m(scrolltb).height();
		var sale_bar = bar_wrap_h / bar_h;
		var scroll_bar_h = window_h * sale_bar;
		var mobile_scroll_bar = m(scrolltb).find(".mobile-scroll-bar");
		if(isScrollBar) {
			if(window_h < bar_h) {
				mobile_scroll_bar.height(scroll_bar_h);

			}

		}
		var isMOve = false; // 计算速度定时器id
		var speedSetIntervalId = 0;
		var speedSetIntervalFisrt = true;
		var speedScroll = 0;
		var speedlateY = 0;
		var speedlateYOld = 0;

		m(scrolltb).on("touchstart", start);

		function start(event) {
			event.preventDefault();
			var touch = event.touches[0];
			startY = touch.clientY;
			startX = touch.clientX;
			isLink = true;

			if(isManyContent) {
				topbottomContent = m(scrolltb).find(".mobile-scroll-content-many.active");
			}

			eleY = m(topbottomContent).getTransform("translateY");
			

			isAddMoveEvent = false; // 判断是否往上拖动
			isAddMoveEventFirst = true; // 判断是否第一往上拖动

			// 计算移动速度
			clearInterval(speedSetIntervalId);
			speedSetIntervalFisrt = true;
			speedlateY = eleY;
			speedScroll = 0;


			window_h = m(scrolltb).height();
			// 过度时间0s
			topbottomContent.transition("null");

			// 滚动条
			if(isScrollBar) {
				mobile_scroll_bar.transition("null");
				bar_h = m(topbottomContent).height();
				bar_wrap_h = m(scrolltb).height();
				sale_bar = bar_wrap_h / bar_h;
				scroll_bar_h = window_h * sale_bar;
				mobile_scroll_bar = m(scrolltb).find(".mobile-scroll-bar");
			
				if(window_h < bar_h) {
					mobile_scroll_bar.height(scroll_bar_h);
				}
				mobile_scroll_bar.css("opacity", 1);
				mobile_scroll_bar.transition("null");

			}

		};

		m(scrolltb).on("touchmove", move);

		function move(event) {
			event.preventDefault();
				window_h = m(scrolltb).height();
		
			// 检查是否向上移动
			if(isAddMoveEvent) {
				return;
			}
			var touch = event.touches[0];
			var nowY = touch.clientY;
			dis = nowY - startY;
			var nowX = touch.clientX;
			var disX = nowX - startX;
			var disY = nowY - startY

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
			var _x = Math.abs(disX);
			var _y = Math.abs(disY);
			if(isAddMoveEventFirst && (_x != _y)) {
				isAddMoveEventFirst = false;
				if(_x > _y) {
					isAddMoveEvent = true;
				}
			}
			
			if(isAddMoveEvent) {
				return;
			}

			// 计算移动速度
			if(speedSetIntervalFisrt) {
				speedSetIntervalFisrt = false;
				speedSetIntervalId = setInterval(function() {
					var speedlateY2 = m(topbottomContent).getTransform("translateY") || 0;
					var speedlateY3 = speedlateY2 - speedlateY;
					speedlateY = speedlateY2;
					speedScroll = speedlateY3;

				}, 20);
			}

			// scroll上下滚动scrolltopbottom自定义事件
			m(this).trigger("scrolltopbottom", {
				el: topbottomContent.eq(0),
				resetBar:scrollBarFun
			
			});

			minY = window_h - topbottomContent.height();
			var translateY = eleY + dis;
			if(translateY > 0) {
				var scale = 1 - translateY / window_h;
				translateY = translateY * scale;

				// 是否下拉
				if(!isScrollTop) {
					translateY = 0;
				}

				// scroll顶部 scrolltop自定义事件
				m(this).trigger("scrolltop", {
					el: topbottomContent.eq(0),
					resetBar:scrollBarFun
				
				});

			} else if(translateY < minY) {
				var over = Math.abs(translateY - minY);
				var scale = 1 - over / window_h;
				translateY = minY - over * scale;

				// 是否下拉
				if(!isScrollBottom) {

					translateY = minY;
				}

				// scroll底部 scrollbottom自定义事件
				m(this).trigger("scrollbottom", {
					el: topbottomContent.eq(0),
					resetBar:scrollBarFun
					
				});

				if((m(topbottomContent).height()) < (window_h)) {
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
			if(isLink) {

				var _a = m(event.target).closest("a");
				var isHasParent = m(event.target).closest(".mobile-link");
				if(isHasParent.length > 0) {
					var href = _a.attr("href") || "javascript:;";
					window.location.assign(href);
				}

			}

			minY = window_h - topbottomContent.height();
			var target = m(topbottomContent).getTransform("translateY") + speedScroll * 20;
			var bezier = 'ease-out';

			if(target > 0) {
				target = 0;
				m(topbottomContent).transition("all", 500, bezier);

			} else if(target < minY) {
				target = minY;
				if(m(topbottomContent).height() < window_h) {
					target = 0;
				}
				m(topbottomContent).transition("all", 500, bezier);

			} else {
				m(topbottomContent).transition("all", 1000, bezier);
			}

			// 滚动条
			if(isScrollBar) {
				var scroll_Y = target;
				var scroll_box_h = m(topbottomContent).height();
				var scroll_box_sale = scroll_Y / scroll_box_h;
				mobile_scroll_bar.setTransform("translateY", -m(scrolltb).height() * scroll_box_sale);
				mobile_scroll_bar.transition("all",1000);

			}

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
			if(isScrollBar) {
				var scroll_Y = m(topbottomContent).getTransform("translateY");
				var scroll_box_h = m(topbottomContent).height();
				var scroll_box_sale = scroll_Y / scroll_box_h;
				mobile_scroll_bar.setTransform("translateY", -bar_wrap_h * scroll_box_sale);

				mobile_scroll_bar.transition("null");
				bar_h = m(topbottomContent).height();
				bar_wrap_h = m(scrolltb).height();
				sale_bar = bar_wrap_h / bar_h;
				scroll_bar_h = window_h * sale_bar;
				mobile_scroll_bar = m(scrolltb).find(".mobile-scroll-bar");
				mobile_scroll_bar.height(scroll_bar_h);
//				mobile_scroll_bar.css("opacity",0);
//				mobile_scroll_bar.transition("transform 1s,opacity 1s ease 1s");

			}

		}

	}

})(mobile);

export {

	scrollTopBottom
}