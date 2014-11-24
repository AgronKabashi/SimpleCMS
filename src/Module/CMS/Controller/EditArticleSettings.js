define(
	[
		"../App.js",
	],
	function (app)
	{
		return app.controller("Cerberus.Module.CMS.Controller.EditArticleSettings",
			[
				"$scope",
				"$state",
				"$stateParams",
				"$window",
				"Cerberus.Localization",
				"Cerberus.Module.CMS.Service.Article",
				"Cerberus.Tool.TemplateEngine.Service.Template",
				function ($scope, $state, $stateParams, $window, Localization, ArticleService, TemplateService)
				{
					var articleId = ~~$stateParams.ArticleId;
					var folderId = ~~$stateParams.FolderId;

					$scope.Localization = Localization;
					$scope.History = $window.history;

					ArticleService.GetArticle(articleId)
						.then(function (article)
						{
							$scope.Article = article || new Cerberus.Module.CMS.Model.Article();
						});

					TemplateService.GetTemplates()
						.then(function(template)
						{
							$scope.Templates = template;
						});

					$scope.PageTitle = articleId > 0 ? Localization.CMS.EditArticle : Localization.CMS.AddArticle;

					$scope.Save = function ()
					{
						if (articleId === 0 && ~~$scope.Article.TemplateId === 0 || !$scope.Article)
						{
							return;
						}

						if (!$scope.Article.FolderId)
						{
							$scope.Article.FolderId = folderId;
						}

						ArticleService.SaveArticle($scope.Article)
							.then(function (article)
							{
								$state.go("ListFolders", { FolderId: article.FolderId });
							});
					};
				}
			]);
	});