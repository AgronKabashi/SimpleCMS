define(
	[
		"/SharedApp.js"
	],
	function (app)
	{
		return app
			.service("Cerberus.Core.Service.Role",
			[
				"$q",
				function ($q)
				{
					this.GetRoles = function ()
					{
						var defer = $q.defer();
						defer.resolve(
							[
								{ Id: 1, Name: "AdministrateUsers" },
								{ Id: 2, Name: "AdministrateTemplates" },
								{ Id: 3, Name: "AdministrateArticles" },
								{ Id: 4, Name: "CreateUsers" },
								{ Id: 5, Name: "CreateTemplates" },
								{ Id: 6, Name: "CreateArticles" }
							]);

						return defer.promise;
					};
				}
			]);
	});