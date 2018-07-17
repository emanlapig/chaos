// Model.js
var M = {
	pages: {
		dashboard: {
			title: "Dashboard",
			selector: "dashboard",
			init: function() {

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