define(
	[
		"/SharedApp.js"
	],
	function (app)
	{
		return app
			.factory("Cerberus.Localization", function ()
			{
				return {
					Generic:
					{
						Back: "Back",

						Restore: "Restore to Default",
						Save: "Save",
						SaveEdit: "Save and Edit",
						SaveExit: "Save and Exit",
						Cancel: "Cancel",

						Yes: "Yes",
						No: "No",

						Exit: "Exit",

						EditSettings: "Edit Settings",

						Add: "Add",
						Edit: "Edit",
						Update: "Update",
						Remove: "Remove",

						Clone: "Clone",

						NoDataAvailable: "No data available",

						Name: "Name",
						LastModified: "Last Modified"
					},
					Login:
					{
						Title: "Login",
						EnterUserName: "Enter Username",
						EnterPassword: "Enter Password"
					},
					User:
					{
						UserName: "User Name",
						FirstName: "First Name",
						LastName: "Last Name",
						Users: "Users",
						AddUser: "Add User",
						EditUser: "Edit User",

						NewPassword: "New Password",
						RepeatPassword: "Repeat Password",

						PasswordNoMatch: "Passwords do not match",

						Roles: "Roles",
						RoleNames:
						{
							AdministrateUsers: "Administrate Users",
							AdministrateTemplates: "Administrate Templates",
							AdministrateArticles: "Administrate Articles",
							CreateUsers: "Create Users",
							CreateTemplates: "Create Templates",
							CreateArticles: "Create Articles"
						}
					},
					CMS:
					{
						Folders: "Folders",
						AddFolder: "Add Folder",
						AddArticle: "Add Article",

						EditFolder: "Edit Folder",
						EditArticle: "Edit Article",
						Name: "Name",
						Templates: "Templates"
					},
					Template:
					{
						Templates: "Templates",
						AddTemplate: "Add Template",
						EditTemplate: "Edit Template",
						AddTemplate: "Add Template",
						Name: "Name"
					}
				}
			});
	});