require(
	[
		"angular",

		"./App.js"
	],
	function (angular)
	{
		require(["domReady!"], function (document)
		{
			angular.bootstrap(document, ["Cerberus.Module.CMS.Viewer"]);
		});
	});
