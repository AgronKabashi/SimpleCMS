'use strict';

module.exports = function (grunt)
{
	//load grunt modules
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
	require("node-neat");
	require("node-bourbon");

	grunt.registerTask("build",
	[
	  "clean:all",
	  "copy",
	  "sass",
	  "replace"
	]);

	grunt.registerTask("debug",
	[
	  "build",
	  "connect:livereload",
	  "watch"
	]);

	grunt.registerTask("release",
	  [
		"build",
		"htmlmin",
		"uglify"
	  ]);

	grunt.registerTask("default",
	  [
		  "debug"
	  ]);

	grunt.initConfig(
	{
		config:
		{
			src: "src",
			dist: "dist",
			apiUrl: "http://localhost:9001/api"
		},
		connect: {
			options: {
				port: 9002,
				// change this to '0.0.0.0' to access the server from outside
				hostname: 'localhost'
			},
			livereload: {
				options: {
					open: "http://localhost:9002/Admin",
					base: [
					  '<%= config.dist %>'
					]
				}
			}
		},
		watch:
		{
			options:
			{
				livereload: 35730
			},
			binaries:
			{
				files: ["bin/**/*.dll"],
				tasks: ["clean:binaries", "newer:copy:binaries"]
			},
			css:
			{
				files: ["<%= config.src %>/**/*.css"],
				tasks: ["newer:copy:css"]
			},
			sass:
			{
				files: ["<%= config.src %>/**/*.scss"],
				tasks: ["sass"]
			},
			images:
			{
				files: ["<%= config.src %>/**/*.{png,jpg}"],
				tasks: ["newer:copy:images"]
			},
			markup:
			{
				files: ["<%= config.src %>/**/*.html"],
				tasks: ["newer:copy:markup"]
			},
			scripts:
			{
				files: ["<%= config.src %>/**/*.js"],
				tasks: ["newer:copy:scripts"]
			}
		},
		htmlmin:
		{
			dist:
			{
				options:
				{
					removeComments: true,
					collapseWhitespace: true,
					conservativeCollapse: true,
					minifyCSS: true,
					caseSensitive: true
				},
				files:
				[
					{
						expand: true,
						cwd: "<%= config.dist %>",
						src: "**/*.html",
						dest: "<%= config.dist %>"
					}
				]
			}
		},
		uglify:
		{
			options:
			{
				mangle:
				{
					except: ["jQuery", "*.min.js"]
				}
			},
			all:
			{
				files:
				[
					{
						expand: true,
						cwd: "<%= config.dist %>",
						src: "**/*.js",
						dest: "<%= config.dist %>"
					}
				]
			}
		},
		sass:
		{
			dist:
			{
				options:
				{
					includePaths: require("node-neat").includePaths,
					outputStyle: "compressed"
				},
				files:
				[
					{
						expand: true,
						cwd: "<%= config.src %>",
						src: "**/*.scss",
						dest: "<%= config.dist %>",
						ext: ".css"
					}
				]
			}
		},
		copy:
		{
			binaries:
			{
				files:
				[
					{
						expand: true,
						cwd: "bin",
						src: "**/*.dll",
						dest: "<%= config.dist %>/bin"
					}
				]
			},
			fonts:
			{
				files:
				[
					{
						expand: true,
						cwd: "<%= config.src %>",
						src: "**/*.{ttf,woff,eot}",
						dest: "<%= config.dist %>"
					}
				]
			},
			css:
			{
				files:
				[
					{
						expand: true,
						cwd: "<%= config.src %>",
						src: "**/*.css",
						dest: "<%= config.dist %>"
					}
				]
			},
			images:
			{
				files:
				[
					{
						expand: true,
						cwd: "<%= config.src %>",
						src: "**/*.{jpg,png}",
						dest: "<%= config.dist %>"
					}
				]
			},
			scripts:
			{
				files:
				[
					{
						expand: true,
						cwd: "<%= config.src %>",
						src: "**/*.js",
						dest: "<%= config.dist %>"
					}
				]
			},
			markup:
			{
				files:
				[
					{
						expand: true,
						cwd: "<%= config.src %>",
						src: "**/*.html",
						dest: "<%= config.dist %>"
					}
				]
			},
			//templateEngine:
			//{
			//	files:
			//	[
			//		{
			//			expand: true,
			//			cwd: "node_modules/TemplateEngine/dist/TemplateEngine",
			//			src: "**/*",
			//			dest: "<%= config.dist %>/Tool/TemplateEngine"
			//		},
			//		{
			//			expand: true,
			//			cwd: "node_modules/TemplateEngine/dist/TemplateEditor",
			//			src: "**/*",
			//			dest: "<%= config.dist %>/Tool/TemplateEditor"
			//		}
			//	]
			//}
		},
		jshint:
		{
			all: ['<%= config.src %>/**/*.js']
		},
		replace:
		{
			inject_apiUrl:
			{
				options:
				{
					patterns:
					[
						{
							match: "APIURL",
							replacement: "<%= config.apiUrl %>"
						}
					]
				},
				files:
				[
					{
						expand: true,
						flatten: true,
						src: ["<%= config.dist %>/Admin/App.js"],
						dest: "<%= config.dist %>/Admin"
					},
					{
						expand: true,
						flatten: true,
						src: ["<%= config.dist %>/Tool/TemplateEditor/App.js"],
						dest: "<%= config.dist %>/Tool/TemplateEditor"
					}
				]
			}
		},
		clean:
		{
			binaries: ["<%= config.dist %>/bin/**/*"],
			all: ["<%= config.dist %>/**/*"]
		}
	});
};
