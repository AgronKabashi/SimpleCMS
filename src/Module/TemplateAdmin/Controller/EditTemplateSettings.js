define(
	[
		"../App.js"
	],
	function (app)
	{
		return app.controller("Cerberus.Module.TemplateAdmin.Controller.EditTemplateSettings",
			[
				"$scope",
				"$state",
				"$stateParams",
				"$window",
				"Cerberus.Localization",
				"Cerberus.Tool.TemplateEngine.Service.Template",
				function ($scope, $state, $stateParams, $window, Localization, TemplateService)
				{
					var templateId = $stateParams.TemplateId || 0;

					$scope.Localization = Localization;
					$scope.History = $window.history;
					$scope.PageTitle = templateId > 0 ? Localization.Template.EditTemplate : Localization.Template.AddTemplate;

					TemplateService.GetTemplateInfo(templateId)
						.then(function(template)
						{
							$scope.Template = template || new Cerberus.Tool.TemplateEngine.Model.Template();
						});

					$scope.SaveAndEdit = function ()
					{
						TemplateService.SaveTemplateInfo($scope.Template)
							.then(function(template)
							{
								document.location.href = String.format("/Tool/TemplateEditor/#/Design/{0}?ExitUrl={1}", template.Id, $state.href("ListTemplates", {}, {absolute: true}));
							});
					};

					$scope.Save = function ()
					{
						TemplateService.SaveTemplateInfo($scope.Template)
							.then(function (template)
							{
								$state.go("ListTemplates");
							});
					};
				}
			]);
	});