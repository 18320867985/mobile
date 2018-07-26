/*公共js设置样式*/
var commonStyle = (function(m) {

	// 设置主题内容样式
	m(function() {
		mobileContent();
		m(window).resize(function() {
		mobileContent();
		});

	});

	function mobileContent() {
		var tab = m(".mobile-tab");
		var head = m(".mobile-head");
		var content = m(".mobile-content");
		var footer = m(".mobile-footer");
		var window_h=m(window).height();
		var head_h=head.height()||0;
		var footer_h=footer.height()||0;
		var tab_h=tab.height()||0;
		var content_h=window_h-(head_h+footer_h+tab_h);
		content.height(content_h);
		content.css("top",head_h+tab_h);
		
//		console.log(head_h);
//		console.log(footer_h)
//		console.log(tab_h)
//		console.log(content_h)
//		console.log(window_h)
	}

})(mobile);

export {
	commonStyle
}
