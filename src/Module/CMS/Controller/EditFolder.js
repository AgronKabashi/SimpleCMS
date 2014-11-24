define(
	[
		"../App.js"
	],
	function (app)
	{
		return app.controller("Cerberus.Module.CMS.Controller.EditFolder",
			[
				"$scope",
				"$state",
				"$stateParams",
				"$window",
				"Cerberus.Localization",
				"Cerberus.Module.CMS.Service.Folder",
				function ($scope, $state, $stateParams, $window, Localization, FolderService)
				{
					var folderId = ~~$stateParams.FolderId;
					var parentId = ~~$stateParams.ParentFolderId;

					$scope.Localization = Localization;
					$scope.History = $window.history;

					FolderService.GetFolder(folderId)
						.then(function (folder)
						{
							$scope.Folder = folder || new Cerberus.Module.CMS.Model.Folder();
						});

					$scope.PageTitle = folderId > 0 ? Localization.CMS.EditFolder : Localization.CMS.AddFolder;

					$scope.Save = function ()
					{
						if (!$scope.Folder.ParentId)
						{
							$scope.Folder.ParentId = parentId;
						}

						FolderService.SaveFolder($scope.Folder)
							.then(function (folder)
							{
								$state.go("ListFolders", { FolderId: folder.ParentId });
							});
					};
				}
			]);
	});