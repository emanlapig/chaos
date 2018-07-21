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
			strip_punc: function( str ) {
				return str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
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

// enochian keys
var enochian_keys = [
	{
		title: "The First Key",
		content: [
			{
				eno: "Ol",
				eng: "I"
			},{
				eno: "sonf",
				eng: "reign"
			},{
				eno: "vors-g",
				eng: "over you,"
			},{
				eno: "goho",
				eng: "saith"
			},{
				eno: "Iad",
				eng: "the God"
			},{
				eno: "Balt,",
				eng: "of Justice,"
			},{
				eno: "lansh",
				eng: "in power exalted"
			},{
				eno: "calz",
				eng: "over the firmaments"
			},{
				eno: "vonpho;",
				eng: "of wrath;"
			},{
				eno: "sobra",
				eng: "in whose"
			},{
				eno: "z-ol",
				eng: "hands"
			},{
				eno: "Ror",
				eng: "the Sun"
			},{
				eno: "I",
				eng: "is"
			},{
				eno: "ta",
				eng: "as"
			},{
				eno: "nazpsad,",
				eng: "a sword,"
			},{
				eno: "Graa",
				eng: "and the Moon"
			},{
				eno: "ta",
				eng: "as"
			},{
				eno: "malprg,",
				eng: "a through-thrusting fire,"
			},{
				eno: "ds",
				eng: "which"
			},{
				eno: "holq",
				eng: "measureth"
			},{
				eno: "qaa",
				eng: "your garments"
			},{
				eno: "nothoa",
				eng: "in the midst"
			},{
				eno: "zimz",
				eng: "of my vestitures,"
			},{
				eno: "od",
				eng: "and"
			},{
				eno: "commah",
				eng: "trussed you together"
			},{
				eno: "ta",
				eng: "as"
			},{
				eno: "nobloh",
				eng: "the palms"
			},{
				eno: "zien;",
				eng: "of my hands;"
			},{
				eno: "soba",
				eng: "whose"
			},{
				eno: "thil",
				eng: "seats"
			},{
				eno: "gnonp",
				eng: "I have garnished"
			},{
				eno: "prge",
				eng: "with the fire"
			},{
				eno: "aldi,",
				eng: "of gathering,"
			},{
				eno: "ds",
				eng: "which"
			},{
				eno: "urbs",
				eng: "beautified"
			},{
				eno: "oboleh",
				eng: "your garments"
			},{
				eno: "g-rsam;",
				eng: "with admiration;"
			},{
				eno: "casarm",
				eng: "to whom"
			},{
				eno: "ohorela",
				eng: "I made a Law"
			},{
				eno: "caba",
				eng: "to govern"
			},{
				eno: "pir",
				eng: "the Holy Ones,"
			},{
				eno: "ds",
				eng: "which"
			},{
				eno: "zonrensg",
				eng: "delivered you"
			},{
				eno: "cab",
				eng: "a rod"
			},{
				eno: "erm",
				eng: "with the ark"
			},{
				eno: "Jadnah.",
				eng: "of knowledge."
			},{
				eno: "Pilah,",
				eng: "Moreover,"
			},{
				eno: "farzm",
				eng: "you filled up your voices"
			},{
				eno: "znrza",
				eng: "and swore"
			},{
				eno: "adna",
				eng: "obedience"
			},{
				eno: "gono",
				eng: "and faith"
			},{
				eno: "Iadpil",
				eng: "to Him"
			},{
				eno: "ds",
				eng: "that"
			},{
				eno: "hom",
				eng: "liveth"
			},{
				eno: "toh;",
				eng: "and triumpheth;"
			},{
				eno: "soba",
				eng: "whose"
			},{
				eno: "ipam",
				eng: "(beginning) is not"
			},{
				eno: "lu",
				eng: "nor end"
			},{
				eno: "ipamis;",
				eng: "cannot be;"
			},{
				eno: "ds",
				eng: "which"
			},{
				eno: "loholo",
				eng: "shineth"
			},{
				eno: "vep",
				eng: "as a flame"
			},{
				eno: "zomd",
				eng: "in the midst"
			},{
				eno: "poamal,",
				eng: "of your palace,"
			},{
				eno: "od",
				eng: "and"
			},{
				eno: "bogpa",
				eng: "reigneth"
			},{
				eno: "aai",
				eng: "amongst you"
			},{
				eno: "ta",
				eng: "as"
			},{
				eno: "piap",
				eng: "the balance"
			},{
				eno: "piamol",
				eng: "of righteousness"
			},{
				eno: "od",
				eng: "and"
			},{
				eno: "vaoan.",
				eng: "truth."
			},{
				eno: "ZACARe",
				eng: "Move,"
			},{
				eno: "ca,",
				eng: "therefore,"
			},{
				eno: "od",
				eng: "and"
			},{
				eno: "ZAMRAN!",
				eng: "show yourselves!"
			},{
				eno: "Odo",
				eng: "Open"
			},{
				eno: "cicle",
				eng: "the mysteries"
			},{
				eno: "qaa.",
				eng: "of your creation."
			},{
				eno: "Zorge,",
				eng: "Be friendly unto me:"
			},{
				eno: "lap",
				eng: "for"
			},{
				eno: "zirdo",
				eng: "I am"
			},{
				eno: "noco",
				eng: "the servant"
			},{
				eno: "MAD,",
				eng: "of the same your God,"
			},{
				eno: "hoath",
				eng: "the true worshipper"
			},{
				eno: "Jaida.",
				eng: "of the Highest."
			},
		]
	}
];