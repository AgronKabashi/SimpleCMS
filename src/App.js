define(
	[
		"angular",

		"/GlobalApp.js",

		"/Tool/TemplateEngine/App.js",
		"/Tool/TemplateEngine/Directive/TemplateRenderer.js",

		"/Module/CMS/Service/Article.js"
	],
	function (angular)
	{
		return angular
			.module("Cerberus.Module.CMS.Viewer",
			[
				"Cerberus",
				"Cerberus.Tool.TemplateEngine"
			])
			.config(
			[
				"Cerberus.Tool.TemplateEngine.Service.TemplateProvider",
				function (TemplateProvider)
				{
					TemplateProvider.SetServiceUrl("/App_WebServices/TemplateEngineServiceRead.svc");
				}
			])
			.controller("Cerberus.Module.CMS.Viewer",
			[
				"$scope",
				"Cerberus.Tool.TemplateEngine.Service.DataBag",
				"Cerberus.Module.CMS.Service.Article",
				"Cerberus.Tool.TemplateEngine.Service.Template",
				function ($scope, DataBagService, CMSService, TemplateService)
				{
					var articleId = window.GetQueryParameter("Id") || 0;
					var articleGetCallback = function (article, response)
					{
						$scope.TemplateCSS = String.format("/TemplateCSS.dcss?TemplateId={0}", article.TemplateId);
						$scope.$broadcast("ReloadTemplate", TemplateService.GetTemplate(article.TemplateId, article.Id, 1));
					};

					if (articleId === 0)
					{
						CMSService.GetStartPage(articleGetCallback);
					}
					else
					{
						CMSService.GetArticle(articleId, articleGetCallback);
					}
				}
			]);
	});