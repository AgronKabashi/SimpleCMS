﻿define(function ()
{
	return {
		BuildResourceUrl: function ()
		{
			return angular.extend([], arguments).slice(0).join("/");
		}
	};
});