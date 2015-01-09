define(
	[
		"angular",

		"/SharedApp.js",

		"./Tool/TemplateEngine/App.js",
		"./Tool/TemplateEngine/Directive/TemplateRenderer.js",

		"/Module/CMS/Service/Article.js",
		"/Module/CMS/Service/Folder.js",

		"angular-ui-router"
	],
	function (angular)
	{
		var apiUrl = "@@APIURL";

		return angular
			.module("Cerberus.Module.CMS.Viewer",
			[
				"ui.router",
				"Cerberus",
				"Cerberus.Tool.TemplateEngine"
			])
			.config(
			[
				"$stateProvider",
				"$urlRouterProvider",
				"Cerberus.Tool.TemplateEngine.Service.TemplateProvider",
				"Cerberus.Module.CMS.Service.ArticleProvider",
				"Cerberus.Module.CMS.Service.FolderProvider",
				function ($stateProvider, $urlRouterProvider, TemplateProvider, ArticleProvider, FolderProvider)
				{
					ArticleProvider.SetServiceUrl(apiUrl);
					FolderProvider.SetServiceUrl(apiUrl);
					TemplateProvider.SetProvider(Cerberus.Tool.TemplateEngine.Service.TemplateRestProvider, apiUrl);

					$stateProvider.state("Home",
						{
							url: "/:Id",
							controller: "Cerberus.Module.CMS.Viewer"
						});
				}
			])
			.controller("Cerberus.Module.CMS.Viewer",
			[
				"$scope",
				"$state",
				"Cerberus.Tool.TemplateEngine.Service.DataBag",
				"Cerberus.Module.CMS.Service.Article",
				"Cerberus.Tool.TemplateEngine.Service.Template",
				function ($scope, $state, DataBagService, ArticleService, TemplateService)
				{
					var articleId = 3;
					var articleGetCallback = function (article)
					{
						$scope.TemplateCSS = String.format("{0}/Design/{1}/CSS", apiUrl, article.TemplateId);
						
						TemplateService.GetTemplate(article.TemplateId, article.Id, 1)
							.then(function(template)
							{
								$scope.$broadcast("InitializeTemplate", template);
							});
					};

					if (articleId === 0)
					{
						ArticleService.GetStartPage().then(articleGetCallback);
					}
					else
					{
						ArticleService.GetArticle(articleId).then(articleGetCallback);
					}
				}
			]);
	});