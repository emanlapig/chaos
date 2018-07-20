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
					V.go_to_page( 'key' );
				});
			}
		},
		key: {
			title: "Custom Font",
			selector: "key",
			init: function() {

			}
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
					if ( !$( hdr_mono[i] ).hasClass( "enoch-mono" ) ) {
						$( hdr_mono[i] ).addClass( "enoch-mono" );
					} else {
						$( hdr_mono[i] ).removeClass( "enoch-mono" );
					}
				}
				var hdr_reg = $( "#nav-menu a" );
				for ( var i=0; i<hdr_reg.length; i++ ) {
					if ( $( hdr_reg[i] ).hasClass( "always" ) ) {
						continue;
					}
					var text = $( hdr_reg[i] ).text();
					$( hdr_reg[i] ).text( text.split( "" ).reverse().join( "" ) );
					if ( !$( hdr_reg[i] ).hasClass( "enoch-reg" ) ) {
						$( hdr_reg[i] ).addClass( "enoch-reg" );
					} else {
						$( hdr_reg[i] ).removeClass( "enoch-reg" );
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
		schueler: false
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
	M.pages.key,
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