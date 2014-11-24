define(
	[
		"/SharedApp.js"
	],
	function (app)
	{
		app.provider("Cerberus.Core.Service.HttpInterceptor", function ()
		{
			var urlFilter = null;
			this.SetUrlFilter = function (url)
			{
				urlFilter = url;
			};

			this.$get = function ()
			{
				return {
					request: function (config)
					{
						if (config.url.indexOf(urlFilter) >= 0)
						{
							var authenticationToken = localStorage.getItem("authenticationToken");
							if (authenticationToken)
							{
								config.headers.Authorization = String.format("Bearer {0}", authenticationToken);
							}
						}

						return config;
					}
				};
			};
		});
	});