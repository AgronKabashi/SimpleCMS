define(
	[
		"angular",
		"module",
		"LazyConfig",
		"LazyRouteState",

		"lodash",

		"/Tool/TemplateEngine/Service/Template.js",
		"/SharedApp.js",
		"/Localization.js"
	],
	function (angular, module, LazyConfig, LazyRouteState, lodash)
	{
		var moduleId = "Cerberus.Module.TemplateAdmin",
			modulePath = String.getPath(module.uri);

		var app = angular
				.module(moduleId,
					[
						"Cerberus",
						"Cerberus.Tool.TemplateEngine.Service.Template"
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
										name: "ListTemplates",
										controller: "Cerberus.Module.TemplateAdmin.Controller.ListTemplates",
										route: "/Templates"
									},
									{
										name: "EditTemplateSettings",
										controller: "Cerberus.Module.TemplateAdmin.Controller.EditTemplateSettings",
										route: "/Templates/:TemplateId/Edit"										
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