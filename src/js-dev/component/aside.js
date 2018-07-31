
var aside=(function(m){
	
	// tab 左右滑动点击
	var isMOve_ttl = true;
	var startX_ttl = 0;
	var startY_ttl = 0;
	m(".mobile-aside-menu   .mobile-aside-ttl").on("touchstart", function(event) {

		var touch = event.changedTouches[0];
		startX_ttl = touch.clientX;
		startY_ttl = touch.clientY;
		isMOve_ttl=true;

	});
	m(".mobile-aside-menu   .mobile-aside-ttl").on("touchmove", function(event) {
		var touch = event.changedTouches[0];
		var nowX = touch.clientX;
		var nowY = touch.clientY;
		var dis = nowX - startX;
		if(Math.abs(nowX - startX_ttl) > 1 || Math.abs(nowY - startY_ttl) > 1) {
			isMOve_ttl = false;
		}

	});
	m(".mobile-aside-menu  .mobile-aside-ttl").on("touchend", function(event) {
		
		if(isMOve_ttl) {
			
			// 添加样式
			$(this).siblings().removeClass("active");
			$(this).addClass("active");
			
			var id = m(this).attr("data-target");
			var obj = m(id);
			var p=obj.parents(".mobile-aside-content").find(".mobile-aside-item ").hide();
			//m(obj).siblings().hide();
			m(obj).fadeIn();
			
		}

	});
	
	
	
})(mobile);

export{
	aside
}
