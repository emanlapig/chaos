// Model.js
var M = {
	pages: {
		init: function( page ) {
			var page = this[ page ];
			if ( M.settings.hdr_eno ) {
				$( "#header h2" ).text( page.title.split( "" ).reverse().join( "" ) );
			}
			page.init();
		},
		dashboard: {
			title: "Dashboard",
			selector: "dashboard",
			init: function() {
				$( "#dash-item-0" ).on( 'click', function(e) {
					V.go_to_page( 'enochiana' );
				});
			}
		},
		enochiana: {
			title: "Enochiana",
			selector: "enochiana",
			init: function() {
				$( "a.key-link" ).on( 'click', function(e) {
					M.pages.key.current = $( e.target ).attr( "data-key" );
					V.go_to_page( 'key' );
				});
			}
		},
		key: {
			title: "Key",
			selector: "key",
			init: function() {
				M.pages.key.go_to_view( M.pages.key.views_registry[ M.settings.key_view ] );
				var btn = $( ".view-ctrl .btn" );
				btn.on( 'click', function(e) {
					var to = M.pages.key.views_registry[ $( e.target ).attr( 'data-view' ) ];
					M.pages.key.go_to_view( to );
					$( ".view-ctrl .btn" ).removeClass( "selected" );
					$( e.target ).addClass( "selected" );
				});
				for ( var i=0; i<btn.length; i++ ) {
					if ( $( btn[i] ).attr( "data-view" ) == M.settings.key_view ) {
						$( btn[i] ).addClass( "selected" );
					} else {
						$( btn[i] ).removeClass( "selected" );
					}
				}
				var title;
				if ( !M.settings.hdr_eno ) {
					title = enochian_keys[ M.pages.key.current ].title
				} else {
					title = enochian_keys[ M.pages.key.current ].title.split( "" ).reverse().join( "" );
				}
				$( "#key h3.page-title" ).text( title );
			},
			current: 0,
			strip_punc: function( str ) {
				return str.replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g,"");
			},
			go_to_view: function( to ) {
				var from = $( "#key .view" )
					, current = M.settings.key_view;
					$( "#key .view *" ).unbind();
				for ( var i=0; i<from.length; i++ ) {
					if ( $( from[i] ).hasClass( "show" ) ) {
						$( from[i] ).removeClass( "show" ).addClass( "hidden" );
					}
				}
				M.pages.key.views[ to ].init();
				M.pages.settings.toggle_eno_font();
				setTimeout( function() {
					$( "#key .view.hidden" ).addClass( "gone" );
					$( [ "#", to ].join( "" ) ).removeClass( "gone" );
					document.getElementById( "key" ).scrollTo( 0, 0 );
					M.settings.key_view = M.pages.key.views[ to ].index;
					M.save_settings();
					setTimeout( function() { 
						$( [ "#", to ].join( "" ) ).removeClass( "hidden" ).addClass( "show" );
					}, 10 );
				}, 500 );
			},
			views: {
				eng_eno: {
					index: 0,
					init: function() {
						var current = M.pages.key.current
							, key = enochian_keys[ current ]
							, frag = document.createDocumentFragment()
						for ( var i=0; i<key.content.length; i++ ) {
							var eno = V.el_factory({
								tag: "div",
								attrs: [
									{ attr: "class", val: "eno" }
								],
								html: key.content[i].eno
							}), eng = V.el_factory({
								tag: "div",
								attrs: [
									{ attr: "class", val: "eng" }
								],
								html: key.content[i].eng
							}), node = V.el_factory({
								tag: "div",
								attrs: [
									{ attr: "class", val: "word" }
								]
							});
							node.appendChild( eno );
							node.appendChild( eng );
							frag.appendChild( node );
						}
						$( "#key #eng_eno" ).text( "" ).append( frag );
					}
				},
				eno_only: {
					index: 1,
					init: function() {
						var current = M.pages.key.current
							, key = enochian_keys[ current ]
							, text = "";
						for ( var i=0; i<key.content.length; i++ ) {
							var no_punc = M.pages.key.strip_punc( key.content[i].eno );
							text += no_punc;
							text += " ";
						}
						$( "#key #eno_only p bdo" ).text( text );
					}
				},
				eno_pronounce: {
					index: 2,
					init: function() {
						var current = M.pages.key.current
							, key = enochian_keys[ current ]
							, text = "";
						for ( var i=0; i<key.content.length; i++ ) {
							text += key.content[i].eno;
							text += " ";
						}
						$( "#key #eno_pronounce p" ).text( text );
					}
				},
				eng_eno_table: {
					index: 3,
					init: function() {
						var current = M.pages.key.current
							, key = enochian_keys[ current ]
							, frag = document.createDocumentFragment()
						for ( var i=0; i<key.content.length; i++ ) {
							var eno = V.el_factory({
								tag: "div",
								attrs: [
									{ attr: "class", val: "eno" }
								]
							}), num = V.el_factory({
								tag: "span",
								attrs: [
									{ attr: "class", val: "num" }
								],
								html: [ ( Number( current ) + 1 ), ( i + 1 ) ].join( "." )
							}), eno1 = V.el_factory({
								tag: "div",
								attrs: [
									{ attr: "class", val: "eno1 enoch-reg" }
								],
								html: M.pages.key.strip_punc( key.content[i].eno ).split( "" ).reverse().join( "" )
							}), eno2 = V.el_factory({
								tag: "div",
								attrs: [
									{ attr: "class", val: "eno2" }
								],
								html: key.content[i].eno
							}), space = V.el_factory({
								tag: "div",
								attrs: [
									{ attr: "class", val: "space enoch-reg" }
								],
								html: "B"
							}), eng = V.el_factory({
								tag: "div",
								attrs: [
									{ attr: "class", val: "eng" }
								]
							}), eng_word = V.el_factory({
								tag: "div",
								html: key.content[i].eng
							}), node = V.el_factory({
								tag: "div",
								attrs: [
									{ attr: "class", val: "word" }
								]
							});
							eno.appendChild( num );
							eno.appendChild( eno1 );
							eno.appendChild( eno2 );
							eng.appendChild( space );
							eng.appendChild( eng_word );
							node.appendChild( eno );
							node.appendChild( eng );
							frag.appendChild( node );
						}
						$( "#key #eng_eno_table" ).text( "" ).append( frag );
					}
				}
			},
			views_registry: [
				"eng_eno",
				"eno_only",
				"eno_pronounce",
				"eng_eno_table"
			]
		},
		settings: {
			title: "Settings",
			selector: "settings",
			init: function() {
				// bind input events
				$( "#hdr-font" ).on( 'click', function(e) {
					M.pages.settings.toggle_hdr_font();
					M.settings.hdr_eno = ( M.settings.hdr_eno )? false : true;
					M.save_settings();
				});
				$( "#eno-font" ).on( 'click', function(e) {
					M.settings.schueler = ( M.settings.schueler )? false : true;
					M.save_settings();
					M.pages.settings.toggle_eno_font();
				});
				$( "div.swatch-group" ).on( 'click', function(e) {
					var theme = $( e.target ).attr( 'data-theme' ) || $( e.target ).parent().attr( 'data-theme' ) ;
					M.pages.settings.change_theme( theme );
					M.settings.theme = theme;
					M.save_settings();
				});
				$( "#clear-settings" ).on( 'click', M.clear_settings );
				// check saved settings
				if ( M.settings.hdr_eno ) {
					$( "#hdr-font" ).attr( "checked", "checked" );
				}
				if ( M.settings.schueler ) {
					$( "#eno-font" ).attr( "checked", "checked" );
				}
			},
			toggle_hdr_font: function(e) {
				var hdr_mono = $( "h2, h3" );
				for ( var i=0; i<hdr_mono.length; i++ ) {
					if ( $( hdr_mono[i] ).hasClass( "always" ) ) {
						continue;
					}
					var text = $( hdr_mono[i] ).text();
					$( hdr_mono[i] ).text( text.split( "" ).reverse().join( "" ) );
					var font;
					if ( !M.settings.schueler ) {
						font = "enoch-mono";
					} else {
						font = "schueler-mono";
					}
					if ( !$( hdr_mono[i] ).hasClass( font ) ) {
						$( hdr_mono[i] ).addClass( font );
					} else {
						$( hdr_mono[i] ).removeClass( font );
					}
				}
				var hdr_reg = $( "#nav-menu a" );
				for ( var i=0; i<hdr_reg.length; i++ ) {
					if ( $( hdr_reg[i] ).hasClass( "always" ) ) {
						continue;
					}
					var text = $( hdr_reg[i] ).text();
					$( hdr_reg[i] ).text( text.split( "" ).reverse().join( "" ) );
					var font;
					if ( !M.settings.schueler ) {
						font = "enoch-reg";
					} else {
						font = "schueler-reg";
					}
					if ( !$( hdr_reg[i] ).hasClass( font ) ) {
						$( hdr_reg[i] ).addClass( font );
					} else {
						$( hdr_reg[i] ).removeClass( font );
					}
				}
			},
			toggle_eno_font: function(e) {
				if ( M.settings.schueler ) {
					$( ".enoch-mono" ).removeClass( "enoch-mono" ).addClass( "schueler-mono" );
					$( ".enoch-reg" ).removeClass( "enoch-reg" ).addClass( "schueler-reg" );
				} else {
					$( ".schueler-mono" ).removeClass( "schueler-mono" ).addClass( "enoch-mono" );
					$( ".schueler-reg" ).removeClass( "schueler-reg" ).addClass( "enoch-reg" );
				}
			},
			change_theme: function( theme ) {
				var path = [ "css/min/theme_", theme, ".min.css" ].join( "" );
				$( "#theme-stylesheet" ).attr( 'href', path );
			}
		}
	},
	settings: {
		hdr_eno: false,
		schueler: false,
		key_view: 0,
		theme: "turq"
	},
	save_settings: function() {
		window.localStorage.setItem( "settings", JSON.stringify( M.settings ) );
	},
	load_settings: function() {
		if ( window.localStorage.getItem( "settings" ) ) {
			M.settings = JSON.parse( window.localStorage.getItem( "settings" ) );
		} else {
			M.save_settings();
		}
	},
	apply_settings: function() {
		if ( M.settings.hdr_eno ) {
			M.pages.settings.toggle_hdr_font();
		}
		M.pages.settings.change_theme( M.settings.theme );
	},
	clear_settings: function() {
		window.localStorage.removeItem( "settings" );
		document.location.reload();
	}
};

// pages registry
var nav_pages = [
	M.pages.dashboard,
	M.pages.enochiana,
	M.pages.settings
];
