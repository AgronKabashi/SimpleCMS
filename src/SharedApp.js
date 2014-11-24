define(
	[
		"angular",
		"LazyConfig"
	],
	function (angular, LazyConfig)
	{
		var moduleId = "Cerberus";

		return angular
			.module(moduleId, [])
			.config(LazyConfig(moduleId))
			.service("Cerberus.Service.Promise",
			[
				"$q",
				function ($q)
				{
					this.Clean = function (promise)
					{
						var defer = $q.defer();

						promise
							.then(function (response)
							{
								defer.resolve(response.data);
							})
							.catch(function ()
							{
								defer.reject();
							});

						return defer.promise;
					};
				}
			]);
	});