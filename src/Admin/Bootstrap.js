require(
	[
		"angular",

		"./App.js",
		"/Core/Directive/Dashboard.js",
		"/Core/Directive/Login.js"
	],
	function (angular)
	{
		require(["domReady!"], function (document)
		{
			return angular.bootstrap(document, ["Cerberus.Admin"]);
		});
	});