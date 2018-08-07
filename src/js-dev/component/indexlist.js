var indexlist = (function(m) {

	m(function() {
		var wrap=m(".mobile-indexlist");
		wrap.each(function(i,v){
			indexlistWrap(v);
			
		});
	
	})
	
	function indexlistWrap(wrap){
		var indexlistwrap=m(wrap);
		var ul = indexlistwrap.find(".mobile-indexlist-list");
		var indexlist_nav = m(".mobile-indexlist-nav");
		var indexlist_a = m(".mobile-indexlist-nav a");
		var tip=m(".mobile-indexlist-tip");
		var items = [];
		var window_h = m(window).height();
		var indexlist_h = indexlistwrap.height();
		var clientTop = window_h - indexlist_h;
		var translateY= ul.height()-indexlistwrap.height();
		
		indexlist_a.touchstart(function(event) {

			var v = m(this).text();
			var group = "[data-group=" + v + "]";
			var li = ul.find(group);
			var top = li.offsetTop();
		
			ul.setTransform("translateY", -top);
			ul.transition("null");
			indexlist_a.removeClass("active");
			m(this).addClass("active");
			tip.text(v);
			

		});

		indexlist_nav.touchstart(function(event) {
			event.preventDefault();
			items = [];
			indexlist_a.each(function(i, v) {
				var o = {};
				o.name = m(v).text();
				o.top = m(v).offsetTop();
				items.push(o);

			});
			window_h = m(window).height();
			indexlist_h = m(".mobile-indexlist").height();
			clientTop = window_h - indexlist_h;
			translateY= ul.height()-indexlistwrap.height();
			tip.fadeIn();

		});

		indexlist_nav.touchmove(function(event) {
			event.preventDefault();
			var t = event.changedTouches[0];
			var nowY = t.clientY - clientTop;
			nowY=nowY<0?0:nowY;
			for(var i = 0; i < items.length; i++) {
				if(i < (items.length - 1)) {
					if(nowY >= items[i].top && nowY < items[i + 1].top) {
						setindexlistTop(i);
						break;
					}
				} else if(i === items.length - 1) {
					setindexlistTop(i);
					break;

				}

			}

		});
		indexlist_nav.touchend(function(event) {
			tip.fadeOut();
		});
		
		
		function setindexlistTop(i){
			var group = "[data-group=" + items[i].name + "]";
			var li = ul.find(group);
			var top = li.offset().top;
			if(top>translateY){
				top=translateY;
			}
			ul.setTransform("translateY", -top);
			ul.transition("null");
			indexlist_a.removeClass("active");
			indexlist_a.eq(i).addClass("active");
			tip.text(items[i].name);
		}
		
		
		
	}

})(mobile);

export {
	indexlist
}