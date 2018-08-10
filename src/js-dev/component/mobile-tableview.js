/*table-view*/

var tableview=(function(m){
	
	 m(".mobile-table-view ").tap(".mobile-table-view-ttl",function(event){
	 	event.preventDefault();
		var p=m(this).closest(".mobile-table-view");
		p.find(".mobile-table-view-collapse").hide();
		p.find(".mobile-table-view-cell").removeClass("active");
		m(this).addClass("active");
		m(this).parents(".mobile-table-view-cell").find(".mobile-table-view-collapse").fadeIn(600);

	});
	
})(mobile);

export{
	tableview
}
