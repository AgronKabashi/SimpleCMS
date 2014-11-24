define(
	[
		"/SharedApp.js",
		"ResourceBuilder",
		"../Model/Article.js"
	],
	function (app, ResourceBuilder)
	{
		return app
			.provider("Cerberus.Module.CMS.Service.Article", function ()
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
							GetArticle: function (articleId)
							{
								return PromiseService.Clean($http.get(ResourceBuilder.BuildResourceUrl(serviceUrl, "article", ~~articleId)));
							},

							RemoveArticle: function (articleId)
							{
								return PromiseService.Clean($http.delete(ResourceBuilder.BuildResourceUrl(serviceUrl, "article", ~~articleId)));
							},

							SaveArticle: function (article)
							{
								return PromiseService.Clean($http.put(ResourceBuilder.BuildResourceUrl(serviceUrl, "article"), article));
							},

							CloneArticle: function (articleId)
							{
								return PromiseService.Clean($http.post(ResourceBuilder.BuildResourceUrl(serviceUrl, "article", ~~articleId, "clone")));
							},

							GetArticles: function (folderId, searchOptions)
							{
								return PromiseService.Clean($http.get(ResourceBuilder.BuildResourceUrl(serviceUrl, "articles", ~~folderId), searchOptions));
							},

							GetStartPage: function ()
							{
								return PromiseService.Clean($http.get(ResourceBuilder.BuildResourceUrl(serviceUrl, "startpage")));
							}
						};
					}
				];
			});
	});