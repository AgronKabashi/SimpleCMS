﻿'use strict';

module.exports = function (grunt)
{
	//load grunt modules
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
	require("node-neat");
	require("node-bourbon");
	
	grunt.registerTask("debug",
	[
	  "clean:all",
	  "copy",
	  "sass",
	  "connect:livereload",
	  "watch"
	]);

	grunt.registerTask("release",
	  [
		"clean:all",
		"copy",
		"sass",
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
			dist: "dist"
		},
		connect: {
			options: {
				port: 9000,
				livereload: 35729,
				// change this to '0.0.0.0' to access the server from outside
				hostname: 'localhost'
			},
			livereload: {
				options: {
					open: "http://localhost:9000/Admin",
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
				livereload: true
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
			dotnet:
			{
				files: ["<%= config.src %>/**/*.{svc,config,svc,asax,aspx,ascx,cs}"],
				tasks: ["newer:copy:dotnet"]
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
			dotnet:
			{
				files:
				[
					{
						expand: true,
						cwd: "<%= config.src %>",
						src: "**/*.{svc,config,svc,asax,aspx,ascx,cs}",
						dest: "<%= config.dist %>"
					},
					{
						"<%= config.dist %>/web.config": "web.debug.config"
					},
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
			templateEngine:
			{
				files:
				[
					{
						expand: true,
						cwd: "node_modules/TemplateEngine/dist/TemplateEngine",
						src: "**/*",
						dest: "<%= config.dist %>/Tool/TemplateEngine"
					},
					{
						expand: true,
						cwd: "node_modules/TemplateEngine/dist/TemplateEditor",
						src: "**/*",
						dest: "<%= config.dist %>/Tool/TemplateEditor"
					}
				]
			}
		},
		jshint:
		{
			all: ['<%= config.src %>/**/*.js']
		},
		clean:
		{
			binaries: ["<%= config.dist %>/bin/**/*"],
			all: ["<%= config.dist %>/**/*"]
		}
	});
};
