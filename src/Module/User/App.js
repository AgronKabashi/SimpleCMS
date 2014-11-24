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
		var moduleId = "Cerberus.Module.User",
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
										name: "ListUsers",
										controller: "Cerberus.Module.User.Controller.ListUsers",
										route: "/Users"
									},
									{
										name: "ViewUser",
										controller: "Cerberus.Module.User.Controller.ViewUser",
										route: "/Users/:UserId"										
									},
									{
										name: "EditUser",
										controller: "Cerberus.Module.User.Controller.EditUser",
										route: "/Users/:UserId/Edit"										
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