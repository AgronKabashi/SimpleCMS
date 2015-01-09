define(
	[
		"../App.js"
	],
	function (app)
	{
		return app.controller("Cerberus.Module.TemplateAdmin.Controller.ListTemplates",
			[
				"$scope",
				"$state",
				"$stateParams",
				"Cerberus.Localization",
				"Cerberus.Tool.TemplateEngine.Service.Template",
				function ($scope, $state, $stateParams, Localization, TemplateService)
				{
					$scope.Localization = Localization;
					TemplateService.GetTemplates()
						.then(function (templates)
						{
							$scope.Templates = templates;
						});

					$scope.EditTemplate = function (template)
					{
						document.location.href = String.format("/Tool/TemplateEditor/#/Design/{0}", template.Id);
					};

					$scope.RemoveTemplate = function (template)
					{
						TemplateService.RemoveTemplate(template.Id)
							.then(function (result)
							{
								if (result)
								{
									$scope.Templates.RemoveValue("Id", template.Id);
								}
							});
					};

					$scope.CloneTemplate = function (template)
					{
						TemplateService.CloneTemplate(template.Id)
							.then(function (template)
							{
								$state.go("EditTemplateSettings", { TemplateId: template.Id });
							});
					};
				}
			]);
	});