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
				$( "a#key-1" ).on( 'click', function(e) {
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
			},
			current: 0,
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
				eno_only: {
					index: 0,
					init: function() {
						var current = M.pages.key.current
							, key = enochian_keys[ current ]
							, text = "";
						for ( var i=0; i<key.content.length; i++ ) {
							text += key.content[i].eno;
							text += " ";
						}
						$( "#key #eno_only p bdo" ).text( text );
					}
				},
				eno_pronounce: {
					index: 1,
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
				eng_eno: {
					index: 2,
					init: function() {

					}
				},
				eng_eno_table: {
					index: 3,
					init: function() {

					}
				}
			},
			views_registry: [
				"eno_only",
				"eno_pronounce",
				"eng_eno",
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
				})
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
			}
		}
	},
	settings: {
		hdr_eno: false,
		schueler: false,
		key_view: 0
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
	},
};

// pages registry
var nav_pages = [
	M.pages.dashboard,
	M.pages.enochiana,
	M.pages.settings
];

// enochian keys
var enochian_keys = [
	{
		title: "The First Key",
		content: [
			{
				eno: "OL",
				eng: "I"
			},{
				eno: "SONF",
				eng: "reign"
			},{
				eno: "VORS G",
				eng: "over you,"
			},{
				eno: "GOHO",
				eng: "saith"
			},{
				eno: "IAD",
				eng: "the God"
			},{
				eno: "BALT",
				eng: "of Justice,"
			},{
				eno: "LANSH",
				eng: "in power exalted"
			},{
				eno: "CALZ",
				eng: "over the firmaments"
			},{
				eno: "VONPHO",
				eng: "of wrath;"
			},{
				eno: "SOBRA",
				eng: "in whose"
			},{
				eno: "Z OL",
				eng: "hands"
			},{
				eno: "ROR",
				eng: "the Sun"
			},{
				eno: "I",
				eng: "is"
			},{
				eno: "TA",
				eng: "as"
			},{
				eno: "NAZPSAD",
				eng: "a sword,"
			},{
				eno: "GRAA",
				eng: "(and) the Moon"
			},{
				eno: "TA",
				eng: "as"
			},{
				eno: "MALPRG",
				eng: "a through-thrusting fire,"
			},{
				eno: "DS",
				eng: "which"
			},{
				eno: "HOLQ",
				eng: "measureth"
			},{
				eno: "QAA",
				eng: "your garments"
			},{
				eno: "NOTHOA",
				eng: "in the midst"
			},{
				eno: "ZIMZ",
				eng: "of my vestitures,"
			},{
				eno: "OD",
				eng: "and"
			},{
				eno: "COMMAH",
				eng: "trussed you together"
			},{
				eno: "TA",
				eng: "as"
			},{
				eno: "NOBLOH",
				eng: "the palms"
			},{
				eno: "ZIEN",
				eng: "of my hands;"
			},{
				eno: "SOBA",
				eng: "whose"
			},{
				eno: "THIL",
				eng: "seats"
			},{
				eno: "GNONP",
				eng: "I have garnished"
			},{
				eno: "PRGE",
				eng: "with the fire"
			},{
				eno: "ALDI",
				eng: "of gathering,"
			},{
				eno: "DS",
				eng: "which"
			},{
				eno: "URBS",
				eng: "beautified"
			},{
				eno: "OBOLEH",
				eng: "your garments"
			},{
				eno: "G RSAM",
				eng: "with admiration;"
			},{
				eno: "CASARM",
				eng: "to whom"
			},{
				eno: "OHORELA",
				eng: "I made a Law"
			},{
				eno: "CABA",
				eng: "to govern"
			},{
				eno: "PIR",
				eng: "the Holy Ones,"
			},{
				eno: "DS",
				eng: "which"
			},{
				eno: "ZONRENSG",
				eng: "delivered you"
			},{
				eno: "CAB",
				eng: "a rod"
			},{
				eno: "ERM",
				eng: "with the ark"
			},{
				eno: "JADNAH",
				eng: "of knowledge."
			},
		]
	}
];