// Model.js
var M = {
	pages: {
		dashboard: {
			title: "Dashboard",
			selector: "dashboard",
			init: function() {

			}
		},
		sample: {
			title: "Custom Font",
			selector: "sample",
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
var pages = [
	M.pages.dashboard,
	M.pages.sample,
	M.pages.settings
];