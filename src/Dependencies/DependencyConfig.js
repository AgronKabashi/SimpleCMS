(function (window)
{
	var scriptElements = document.getElementsByTagName('script'),
		thisElement = scriptElements[scriptElements.length - 1],
		dependenciesBasePath = thisElement.src.substr(0, thisElement.src.lastIndexOf('/') + 1);

	window.require =
	{
		paths:
		{
			"Cerberus.Extensions": dependenciesBasePath + "Extensions",

			"jquery": dependenciesBasePath + "jQuery/v2.1.1/jquery.min",
			"jquery-ui": dependenciesBasePath + "jQueryUI/v1.11/jquery-ui.min",
			"jquery-ui-resizable-fix": dependenciesBasePath + "jQueryUI/v1.11/jquery-ui-resizable",

			"lodash": dependenciesBasePath + "lodash/lodash.min",

			"angular": dependenciesBasePath + "angularJS/angular.min",
			"angular-sanitize": dependenciesBasePath + "angularJS/angular-sanitize.min",

			"angular-ui-router": dependenciesBasePath + "angularJS/Modules/angular-ui/angular-ui-router.min",

			"angular-loading-bar": dependenciesBasePath + "angularJS/Modules/angular-loading-bar/loading-bar.min",

			"ResourceBuilder": dependenciesBasePath + "angularJS/ResourceBuilder",
			"LazyConfig": dependenciesBasePath + "angularJS/LazyConfig",
			"LazyRouteState": dependenciesBasePath + "angularJS/LazyRouteState",

			"domReady": dependenciesBasePath + "requireJS/v2.1.11/domReady.min",
			"jquery-mousewheel": dependenciesBasePath + "jQuery/v2.1.1/Plugins/jquery.mousewheel.min",
			"jquery-mCustomScrollbar": dependenciesBasePath + "jQuery/v2.1.1/Plugins/jquery.mCustomScrollbar.min"
		},

		shim:
		{
			"angular":
			{
				exports: "angular",
				deps: ["jquery", "lodash"]
			},

			"angular-ui-router":
			{
				deps: ["angular"]
			},

			"angular-sanitize":
			{
				deps: ["angular"]
			},

			"angular-loading-bar":
			{
				deps: ["angular"]
			},

			"jquery-ui-resizable-fix":
			{
				deps: ["jquery", "jquery-ui"]
			},

			"jquery-mousewheel":
			{
				deps: ["jquery"]
			},

			"jquery-mCustomScrollbar":
			{
				deps: ["jquery", "jquery-mousewheel"]
			}
		},

		deps:
		[
			"domReady",
			"Cerberus.Extensions"
		]
	};
})(window);