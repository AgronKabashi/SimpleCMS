define(
	[
		"../App.js"
	],
	function (app)
	{
		return app.controller("Cerberus.Module.User.Controller.ViewUser",
			[
				"$scope",
				"Cerberus.Localization",
				function ($scope, Localization)
				{
					$scope.Localization = Localization;
				}
			]);
	});