define(
	[
		"/GlobalApp.js"
	],
	function (globalApp)
	{
		globalApp
			.factory("Cerberus.Tool.Login.Localization", function ()
			{
				return {
					Login: "Login",
					EnterUserName: "Enter username",
					EnterPassword: "Enter password",
					LoginFailed: "Login failed. Please check your credentials.",
					LoginSuccess: "Login successful. Redirecting...",
					Error: "Could not connect to the authentication service. Please try again later."
				};
			});
	});