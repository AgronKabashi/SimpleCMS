define(
	[
		"../App.js",
		"/Core/Service/User.js"
	],
	function (app)
	{
		return app.controller("Cerberus.Module.User.Controller.ListUsers",
			[
				"$scope",
				"$location",
				"Cerberus.Core.Service.User",
				"Cerberus.Localization",
				function ($scope, $location, UserService, Localization)
				{
					$scope.Localization = Localization;

					UserService.GetUsers()
						.then(function(users)
						{
							$scope.Users = users;
						});

					$scope.RemoveUser = function (user)
					{
						UserService.RemoveUser(user.Id)
							.then(function (result, response)
							{
								$scope.Users.RemoveValue("Id", user.Id);
							});
					};
				}
			]);
	});