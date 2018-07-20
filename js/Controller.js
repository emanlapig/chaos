// Controller.js
var C = {
	init: function() {
		// build nav
		V.build_nav();

		// apply saved settings
		M.load_settings();
		M.apply_settings();

		if ( M.settings.schueler ) {
			M.pages.settings.toggle_eno_font();
		}

		// init first page
		$( ".burger" ).on( 'click', V.open_menu );
		$( ".cog" ).on( 'click', function(e) {
			V.go_to_page( 'settings' );
		});
		$( "#close-nav" ).on( 'click', V.close_menu );
		$( "#nav-menu, #header" ).on( 'touchmove', function(e) { e.preventDefault(); } );
		V.go_to_page( nav_pages[0].selector );
	}
};