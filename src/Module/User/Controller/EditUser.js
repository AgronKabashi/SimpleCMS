define(
	[
		"../App.js",
		"/Core/Service/User.js",
		"/Core/Service/Role.js"
	],
	function (app)
	{
		return app.controller("Cerberus.Module.User.Controller.EditUser",
			[
				"$scope",
				"$state",
				"$stateParams",
				"$window",
				"Cerberus.Core.Service.User",
				"Cerberus.Core.Service.Role",
				"Cerberus.Localization",
				function ($scope, $state, $stateParams, $window, UserService, RoleService, Localization)
				{
					var userId = ~~$stateParams.UserId;

					$scope.User = null;
					$scope.Localization = Localization;
					$scope.History = $window.history;
					$scope.PageTitle = userId > 0 ? Localization.User.EditUser : Localization.User.AddUser;

					UserService.GetUser(userId)
						.then(function(user)
						{
							$scope.User = user || new Cerberus.Core.Model.User();
						});
					
					RoleService.GetRoles()
						.then(function (roles)
						{
							$scope.Roles = roles;
						});

					$scope.UserHasRole = function (role)
					{
						var result = false;
						var roleName = role.Name;
						var userRoles = $scope.User ? $scope.User.Roles : [];

						for (var i = 0; i < userRoles.length; i++)
						{
							if (userRoles[i].Name === roleName)
							{
								result = true;

								//Update the model the first time this is executed
								if (!role.IsProcessed)
								{
									role.Checked = true;
								}

								role.IsProcessed = true;
								break;
							}
						}

						return result;
					};

					function GetSelectedRoles()
					{
						var result = [];

						var roles = $scope.Roles;
						for (var i = 0; i < roles.length; i++)
						{
							var role = roles[i];

							if (role.Checked)
							{
								result.push(role);
							}
						}

						return result;
					}

					$scope.Save = function ()
					{
						if ($scope.NewPassword !== $scope.RepeatPassword)
						{
							return;
						}

						$scope.User.Password = $scope.NewPassword;
						$scope.User.Roles = GetSelectedRoles();

						UserService
							.SaveUser($scope.User)
							.then(function (result, response)
							{
								$state.go("ListUsers");
							});
					};
				}
			]);
	});