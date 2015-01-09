define(
	[
		"/SharedApp.js",
		"ResourceBuilder",
		"../Model/User.js"
	],
	function (app, ResourceBuilder)
	{
		return app
			.provider("Cerberus.Core.Service.UserAuthentication", function ()
			{
				var serviceUrl = null,
					authenticationTokenId = "authenticationToken",
					hasUserData = false,
					currentUser = null;

				function SaveUserToLocalStorage(user)
				{
					hasUserData = true;
					localStorage.setItem("User", JSON.stringify(user));
				}

				function DeleteUserFromLocalStorage()
				{
					hasUserData = false;
					localStorage.removeItem("User");
				}

				function GetUserFromLocalStorage()
				{
					return JSON.parse(localStorage.getItem("User"));
				}

				this.SetServiceUrl = function (url)
				{
					serviceUrl = url;
				};

				this.$get =
				[
					"$http",
					"$q",
					"$timeout",
					"Cerberus.Service.Promise",
					function ($http, $q, $timeout, PromiseService)
					{
						if (!currentUser)
						{
							currentUser = $q.defer();
						}

						return {
							Login: function (username, password)
							{
								var data = String.format("username={0}&password={1}&grant_type=password", encodeURIComponent(username), encodeURIComponent(password));

								return PromiseService.Clean($http.post(ResourceBuilder.BuildResourceUrl(serviceUrl, "token"), data))
									.then(function (authentication)
									{
										localStorage.setItem(authenticationTokenId, authentication.access_token);

										var user = angular.extend(new Cerberus.Core.Model.User(), authentication);
										user.Roles = angular.extend([], authentication.Roles.split(","));

										SaveUserToLocalStorage(user);

										currentUser.notify(user);
									});
							},

							Logout: function ()
							{
								return PromiseService.Clean($http.delete(ResourceBuilder.BuildResourceUrl(serviceUrl, "userauthentication")))
									.then(function ()
									{
										localStorage.removeItem(authenticationTokenId);
										DeleteUserFromLocalStorage();
										currentUser.notify(null);
									});
							},

							IsAuthenticated: function ()
							{
								return localStorage.getItem(authenticationTokenId) != null;
							},

							GetCurrentUser: function ()
							{
								if (!hasUserData)
								{
									$timeout(function ()
									{
										var user = GetUserFromLocalStorage();
										hasUserData = true;
										currentUser.notify(user);
									});
								}

								return currentUser.promise;
							}
						};
					}
				];
			});
	});