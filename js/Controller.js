// Controller.js
var C = {
	init: function() {
		V.build_nav();
		// init first page
		$( ".burger" ).on( 'click', V.open_menu );
		$( ".cog" ).on( 'click', function(e) {
			V.go_to_page( 'settings' );
		});
		$( "#close-nav" ).on( 'click', V.close_menu );
		$( "#nav-menu, #header" ).on( 'touchmove', function(e) { e.preventDefault(); } );
		V.go_to_page( pages[0].selector );
	}
};