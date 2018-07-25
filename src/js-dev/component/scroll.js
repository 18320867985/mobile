// 菜单左右滑动
var scroll = (function() {

	m(function() {
		navSlide();
	})

	//导航拖拽
	function navSlide() {
		var navs = m(".mobile-scroll");

		for(var i = 0; i < navs.length; i++) {
			navsListFun(navs[i]);
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
		var isMOve=true;
		
		var isAddMoveEvent = false; // 判断是否top拖动
		var isAddMoveEventFirst = true; // 判断是否第一往上拖动

		m(navs).on("touchstart", start);

		function start(event) {
			event.preventDefault();
			var touch = event.changedTouches[0];
			startX = touch.clientX;
			startY = touch.clientY;
			isMOve=true;
			eleX = m(navsList).getTransform("translateX");
			beginTime = new Date().getTime();
			beginValue = eleX;
			disValue = 0;

			// 过度时间0s
			navsList[0].style.transition = 'none';

		};

		m(navs).on("touchmove", move);

		function move(event) {
			event.preventDefault();
			var touch = event.changedTouches[0];
			var nowX = touch.clientX;
			var nowY = touch.clientY;
			var dis = nowX - startX;
			
			if(Math.abs(nowX-startX)>1||Math.abs(nowY-startY)>1){
				isMOve = false;
			}

			// 检查是否向上移动
			if(Math.abs(nowY - startY) > Math.abs(nowX - startX) && isAddMoveEventFirst) {

				isAddMoveEvent = true;
				isAddMoveEventFirst = false;
			}

			if(isAddMoveEvent) {
				return;
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
				var over = Math.abs(translateX - minX);
				var scale = 1 - over / window_w;
				translateX = minX - over * scale;
				if(m(navsList).width() < window_w) {
					translateX = 0;
				}

			}

			m(navsList).setTransform("translateX", translateX);
			endTime = new Date().getTime();
			endValue = translateX;
			disTime = endTime - beginTime;
			disValue = endValue - beginValue;
		}

		m(navs).on("touchend", end);

		function end(event) {
			event.preventDefault();
			var touch = event.changedTouches[0];
			var speed = disValue / (endTime - beginTime);
			var window_w = window.innerWidth ||
				document.documentElement.clientWidth ||
				document.body.clientWidth;
				
			if(isMOve) {
				
				// 单击选中样式
				var p=m(event.target).closest("li");
				if(p.length>0){
					m(this).find("li").removeClass("active");	
			 		p.addClass("active");
			 		
			 		// scroll单击选中样式自定义事件
					m(this).trigger("scrollselect", p[0]);
				}
				// a链接
			 	var href = m(event.target).closest("a").attr("href") || "javascript:;";
				window.location.assign(href);
				
			}

			isAddMoveEvent = false; // 判断是否top拖动
			isAddMoveEventFirst = true; // 判断是否第一往上拖动

			var minX = window_w - navsList[0].offsetWidth;
			var target = m(navsList).getTransform("translateX") + speed * 50;
			var bezier = '';

			if(target > 0) {
				target = 0;

				bezier = 'cubic-bezier(.17,.67,.81,.9)';
			} else if(target < minX) {
				target = minX;
				bezier = 'cubic-bezier(.17,.67,.81,.9)';
				if(m(navsList).width() < window_w) {
					target = 0;
				}
			}
			// 过度时间0.5s
			navsList[0].style.transition = '.5s ' + bezier;
			m(navsList).setTransform("translateX", target);

		}

	}

})()

export {
	scroll
}