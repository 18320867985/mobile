/*table-view*/

var tableview=(function(m){
	
	 m(".mobile-table-view >.mobile-table-view-cell a").tap({n:111},function(event){
//	 	event.preventDefault();
//		var p=m(this).closest(".mobile-table-view");
//		p.find(".mobile-table-view-collapse").hide();
//
//	m(event.target).closest(".mobile-table-view-cell").find(".mobile-table-view-collapse").fadeIn();
//
//		console.log(m(this))
//		

console.log(m(this).html())
	});
	
	

})(mobile);

export{
	tableview
}
