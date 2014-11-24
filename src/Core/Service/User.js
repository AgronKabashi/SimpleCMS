define(
	[
		"/SharedApp.js",
		"ResourceBuilder",
		"../Model/User.js"
	],
	function (app, ResourceBuilder)
	{
		return app
			.provider("Cerberus.Core.Service.User", function ()
			{
				var serviceUrl;
				
				this.SetServiceUrl = function (url)
				{
					serviceUrl = url;
				};

				this.$get =
				[
					"$http",
					"Cerberus.Service.Promise",
					function ($http, PromiseService)
					{
						return {
							GetUser: function (userId)
							{
								return PromiseService.Clean($http.get(ResourceBuilder.BuildResourceUrl(serviceUrl, "user", ~~userId)));
							},

							RemoveUser: function (userId)
							{
								return PromiseService.Clean($http.delete(ResourceBuilder.BuildResourceUrl(serviceUrl, "user", userId)));
							},
							
							SaveUser: function (user)
							{
								return PromiseService.Clean($http.put(ResourceBuilder.BuildResourceUrl(serviceUrl, "user"), user));
							},

							GetUsers: function ()
							{
								return PromiseService.Clean($http.get(ResourceBuilder.BuildResourceUrl(serviceUrl, "users")));
							}							
						};
					}
				];
			});
	});