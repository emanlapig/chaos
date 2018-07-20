// Model.js
var M = {
	pages: {
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

			}
		}
	}
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