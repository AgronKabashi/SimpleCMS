namespace("Cerberus.Module.CMS.Model")
	.Article = function ()
	{
		this.Id = 0;
		this.Name = "";
		this.Description = "";
		this.SEOName = "";
		this.FolderId = 0;
		this.TemplateId = 0;
		this.Image = "";
		this.Thumbnail = "";
		this.Publication =
		{
			IsPublished: false,
			PublishStartDate: new Date().ToWcf(),
			PublishEndDate: new Date().ToWcf()
		};
	};