define(
	[
		"/SharedApp.js",
		"ResourceBuilder",
		"../Model/Folder.js"
	],
	function (app, ResourceBuilder)
	{
		return app
			.provider("Cerberus.Module.CMS.Service.Folder", function ()
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
							GetFolder: function (folderId)
							{
								return PromiseService.Clean($http.get(ResourceBuilder.BuildResourceUrl(serviceUrl, "folder", ~~folderId)));
							},

							RemoveFolder: function (folderId)
							{
								return PromiseService.Clean($http.delete(ResourceBuilder.BuildResourceUrl(serviceUrl, "folder", ~~folderId)));
							},

							SaveFolder: function (folder)
							{
								return PromiseService.Clean($http.put(ResourceBuilder.BuildResourceUrl(serviceUrl, "folder"), folder));
							},

							GetFolders: function (parentFolderId)
							{
								return PromiseService.Clean($http.get(ResourceBuilder.BuildResourceUrl(serviceUrl, "folders", ~~parentFolderId)));
							},

							GetFolderHierarchyAsIdArray: function (folderId)
							{
								return PromiseService.Clean($http.get(ResourceBuilder.BuildResourceUrl(serviceUrl, "folders", ~~folderId, "Hierarchy")));
							}
						};
					}
				];
			});
	});