define(
	[
		"/SharedApp.js",
		"../Service/User.js",
		"../Service/Role.js",
		"../Service/UserAuthentication.js"
	],
	function(app)
	{
		return app
			.directive("csDashboard", function ()
			{
				return {
					restrict: "E",
					templateUrl: "/Core/View/Dashboard.html",
				
					controller:
					[
						"$scope",
						"$state",
						"Cerberus.Core.Service.UserAuthentication",
						function ($scope, $state, UserAuthenticationService)
						{
							$scope.IsVisible = UserAuthenticationService.IsAuthenticated();

							UserAuthenticationService.GetCurrentUser()
								.then(null, null, function(user)
								{
									$scope.User = user;
									$scope.IsVisible = UserAuthenticationService.IsAuthenticated();
								});

							$scope.Logout = function ()
							{
								UserAuthenticationService
									.Logout()
									.then(function()
									{
										$scope.IsVisible = false;
										$scope.User = null;
										$state.go("Login");
									});
							};
						}
					]
				};
			});
	});