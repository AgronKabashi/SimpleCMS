define(
	[
		"../App.js",
		"../Service/Folder.js",
		"../Service/Article.js"
	],
	function (app)
	{
		return app.controller("Cerberus.Module.CMS.Controller.ListFolders",
			[
				"$scope",
				"$state",
				"$stateParams",
				"Cerberus.Localization",
				"Cerberus.Module.CMS.Service.Folder",
				"Cerberus.Module.CMS.Service.Article",
				function ($scope, $state, $stateParams, Localization, FolderService, ArticleService)
				{
					var folderId = ~~$stateParams.FolderId;

					$scope.Localization = Localization;
					FolderService.GetFolder(folderId)
						.then(function (folder)
						{
							$scope.Folder = folder;
						});

					FolderService.GetFolders(folderId)
						.then(function (folders)
						{
							$scope.Folders = folders;
						});

					ArticleService.GetArticles(folderId)
						.then(function (articles)
						{
							$scope.Articles = articles;
						});

					$scope.AddFolder = function ()
					{
						$state.go("EditFolder", { FolderId: 0, ParentFolderId: folderId });
					};

					$scope.EditFolder = function (folder)
					{
						$state.go("EditFolder", { FolderId: folder.Id, ParentFolderId: folder.ParentId });
					};

					$scope.AddArticle = function ()
					{
						$state.go("EditArticleSettings", { ArticleId: 0, FolderId: folderId });
					};

					$scope.EditArticle = function (article)
					{
						document.location.href = String.format("/Tool/TemplateEditor/#/Content/{0}/{1}/1", article.TemplateId, article.Id);
					};

					$scope.CloneArticle = function (article)
					{
						ArticleService.CloneArticle(article.Id)
							.then(function (newArticleId)
							{
								if (newArticleId > 0)
								{
									$state.go("EditArticleSettings", { ArticleId: newArticleId });
								}
							});
					};

					$scope.RemoveFolder = function (folder)
					{
						FolderService.RemoveFolder(folder.Id)
							.then(function (success)
							{
								if (success)
								{
									$scope.Folders.RemoveValue("Id", folder.Id);
								}
							});
					};

					$scope.RemoveArticle = function (article)
					{
						ArticleService.RemoveArticle(article.Id)
							.then(function (success)
							{
								if (success)
								{
									$scope.Articles.RemoveValue("Id", article.Id);
								}
							});
					};

					$scope.ShowArticle = function (article)
					{
						document.location.href = String.format("/?Id={0}", article.Id);
					};
				}
			]);
	});