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
				var serviceUrl = null;
				this.SetServiceUrl = function (url)
				{
					serviceUrl = url;
				};

				this.$get =
				[
					"$http",
					"$q",
					"Cerberus.Service.Promise",
					function ($http, $q, PromiseService)
					{
						var authenticationTokenId = "authenticationToken",
							currentUser = $q.defer();

						return {
							Login: function (username, password)
							{
								var data = String.format("username={0}&password={1}&grant_type=password", encodeURIComponent(username), encodeURIComponent(password));

								return PromiseService.Clean($http.post(ResourceBuilder.BuildResourceUrl(serviceUrl, "token"), data))
									.then(function(authentication)
									{
										localStorage.setItem(authenticationTokenId, authentication.access_token);

										var user = new Cerberus.Core.Model.User();
										user.FirstName = authentication.FirstName;
										user.LastName = authentication.LastName;
										user.Id = authentication.UserId;
										user.UserName = authentication.UserName;
										user.Roles = angular.extend([], authentication.Roles.split(","));

										currentUser.notify(user);
									});
							},

							Logout: function ()
							{
								return PromiseService.Clean($http.delete(ResourceBuilder.BuildResourceUrl(serviceUrl, "userauthentication")))
									.then(function()
									{
										localStorage.removeItem(authenticationTokenId);
										currentUser.notify(null);
									});
							},

							IsAuthenticated: function ()
							{
								return localStorage.getItem(authenticationTokenId) != null;
							},

							GetCurrentUser: function ()
							{
								return currentUser.promise;
							}
						};
					}
				];
			});
	});