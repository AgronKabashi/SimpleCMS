define(
	[
		"angular",
		"module",
		"LazyConfig",
		"LazyRouteState",

		"lodash",

		"/SharedApp.js",
		"/Localization.js"
	],
	function (angular, module, LazyConfig, LazyRouteState, lodash)
	{
		var moduleId = "Cerberus.Module.CMS",
			modulePath = String.getPath(module.uri);

		var app = angular
				.module(moduleId,
					[
						"Cerberus"
					])
				.config(LazyConfig(moduleId))
				.config(
					[
						"$stateProvider",
						"$urlRouterProvider",
						function ($stateProvider, $urlRouterProvider)
						{
							var states =
								[
									{
										name: "ListFolders",
										controller: "Cerberus.Module.CMS.Controller.ListFolders",
										route: "/Folders/:FolderId"
									},
									{
										name: "EditFolder",
										controller: "Cerberus.Module.CMS.Controller.EditFolder",
										route: "/Folders/:FolderId/:ParentFolderId/Edit"										
									},
									{
										name: "EditArticleSettings",
										controller: "Cerberus.Module.CMS.Controller.EditArticleSettings",
										route: "/Article/:ArticleId/:FolderId/Edit"										
									}
								];

							lodash.forEach(states, function (state)
							{
								$stateProvider.state(state.name, LazyRouteState(state.controller, state.route, state.name, modulePath));
							});
						}
					]);

		return app;
	});