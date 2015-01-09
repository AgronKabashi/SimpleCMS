define(
	[
		"angular",

		//Modules
		"/Module/CMS/App.js",
		"/Module/TemplateAdmin/App.js",
		"/Module/User/App.js",

		//Globals
		"/SharedApp.js",
		"/Localization.js",

		"/Core/Service/User.js",
		"/Core/Service/HttpInterceptor.js",
		"/Module/CMS/Service/Article.js",
		"/Module/CMS/Service/Folder.js",

		"angular-ui-router",
		"angular-loading-bar"
	],
	function (angular, cmsModule, templateModule, userModule)
	{
		return angular
			.module("Cerberus.Admin",
				[
					"ui.router",
					"angular-loading-bar",
					"Cerberus",

					"Cerberus.Module.CMS",
					"Cerberus.Module.TemplateAdmin",
					"Cerberus.Module.User"
				])
			.config(
			[
				"$stateProvider",
				"$urlRouterProvider",
				"$httpProvider",
				"Cerberus.Tool.TemplateEngine.Service.TemplateProvider",
				"Cerberus.Module.CMS.Service.ArticleProvider",
				"Cerberus.Module.CMS.Service.FolderProvider",
				"Cerberus.Core.Service.UserProvider",
				"Cerberus.Core.Service.UserAuthenticationProvider",
				"Cerberus.Core.Service.HttpInterceptorProvider",
				function ($stateProvider, $urlRouterProvider, $httpProvider, TemplateProvider, ArticleProvider, FolderProvider, UserProvider, UserAuthenticationProvider, HttpInterceptorProvider)
				{
					var apiUrl = "@@APIURL";

					//Configure providers
					ArticleProvider.SetServiceUrl(apiUrl);
					FolderProvider.SetServiceUrl(apiUrl);
					UserProvider.SetServiceUrl(apiUrl);
					UserAuthenticationProvider.SetServiceUrl(apiUrl);
					TemplateProvider.SetProvider(Cerberus.Tool.TemplateEngine.Service.TemplateRestProvider, apiUrl);
					HttpInterceptorProvider.SetUrlFilter(apiUrl);

					$httpProvider.interceptors.push("Cerberus.Core.Service.HttpInterceptor");

					$stateProvider
						.state("AuthorizeUser",
						{
							abstract: true,
							template: "<ui-view></ui-view>",
							resolve:
							{
								AuthorizeUser:
								[
									"$q",
									"$timeout",
									"$state",
									"Cerberus.Core.Service.UserAuthentication",
									function ($q, $timeout, $state, UserAuthenticationService)
									{
										var defer = $q.defer();
										if (UserAuthenticationService.IsAuthenticated())
										{
											defer.resolve();
										}
										else
										{
											defer.reject();
											$timeout(function ()
											{
												$state.go("Login");
											});
										}

										return defer.promise;
									}
								]
							}
						})
						.state("Home",
						{
							url: "/",
							parent: "AuthorizeUser",
							templateUrl: "View/Home.html"
						})
						.state("Login",
						{
							url: "/Login",
							templateUrl: "View/Login.html"
						})
						.state("Unauthorized",
						{
							url: "/Unauthorized",
							templateUrl: "View/UnauthorizedAccess.html"
						});

					$urlRouterProvider.otherwise("/");
				}
			]);
	});