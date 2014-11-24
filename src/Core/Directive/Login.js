define(
	[
		"/SharedApp.js",
		
		"../Service/User.js",
		"../Service/UserAuthentication.js"
	],
	function (app)
	{
		return app
			.directive("csLogin", function ()
			{
				return {
					restrict: "E",
					templateUrl: "/Core/View/Login.html",

					link: function (scope, element, attributes)
					{
						element
							.find("input")
							.keyup(function (e, ui)
							{
								if (e.keyCode == 13)
								{
									scope.Login();
								}
							});
					},

					controller:
					[
						"$scope",
						"$state",
						"Cerberus.Localization",
						"Cerberus.Core.Service.UserAuthentication",
						function ($scope, $state, Localization, UserAuthenticationService)
						{
							$scope.Localization = Localization;
							$scope.Credentials = { UserName: "", Password: "" };
							$scope.FirstTime = true;

							$scope.Login = function ()
							{
								$scope.FirstTime = false;
								if ($scope.Credentials.UserName === "" || $scope.Credentials.Password === "")
								{
									$scope.LoginFailed = true;
									return;
								}

								UserAuthenticationService.Login($scope.Credentials.UserName, $scope.Credentials.Password)
									.then(function (result, response)
									{
										$scope.LoginSuccess = true;
										$scope.LoginMessage = Localization.LoginSuccess;
										
										$state.go("Home");
									})
									.catch(function()
									{
										$scope.LoginFailed = true;
										$scope.LoginMessage = Localization.LoginFailed;
									});
							};
						}
					]
				};
			});
	});