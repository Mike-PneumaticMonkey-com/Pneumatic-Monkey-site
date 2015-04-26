module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		connect: {
			server: {
				options: {
					port: 9000,
					hostname: 'localhost',
					base: 'build'
				}
			}
		},

		cssmin: {
			my_target: {
				files: [{
					expand: true,
					cwd: 'build/assets/styles/',
					src: ['*.css', '!*.min.css'],
					dest: 'build/assets/styles/',
					ext: '.min.css'
				}]
			}
		},

		compass: {
			dist: {
				options: {
					config: 'config.rb',
					sassDir: 'source/styles/',
					cssDir: 'build/assets/styles/',
					outputStyle: 'compressed'
				}
			}
		},

		clean: {
			js: ["build/assets/styles/*.css", "!build/assets/styles/*.min.css"]
		},

		uglify: {
			options: {
				mangle: false, // Don't alter variable or function names in affected js files
				sourceMap: true,
				beautify: true
			},
			scripts: {
				files: [{
					'build/assets/scripts/scripts.min.js': ['source/scripts/lib/jquery.js', 'source/scripts/lib/angular.js', 'source/scripts/lib/jquery.waypoints.js','source/scripts/scripts.js','source/scripts/lib/isotope.pkgd.min.js']
				}]
			},
			html5shiv: {
				files: [{
					'build/assets/scripts/ie8/html5shiv.min.js': ['source/scripts/ie8/html5shiv.js']
				}]
			},
			modernizr: {
				files: [{
					'build/assets/scripts/modernizr/modernizr.min.js': ['source/scripts/lib/modernizr.js']
				}]
			}
		},

		copy: {
			bower_js: {
				files: [
				// Copy html5shiv
				{expand: true, src: ['bower_components/html5shiv/dist/html5shiv.js'], dest: 'source/scripts/ie8', flatten: true},
				// Copy AngularJS
				{expand: true, src: ['bower_components/angularjs/angular.js'], dest: 'source/scripts/lib', flatten: true},
				// Copy jQuery
				{expand: true, src: ['bower_components/jquery/dist/jquery.js'], dest: 'source/scripts/lib', flatten: true},
				// Copy jQuery waypoints
				{expand: true, src: ['bower_components/jquery-waypoints/lib/jquery.waypoints.js'], dest: 'source/scripts/lib', flatten: true},
				// Copy Modernizr
				{expand: true, src: ['bower_components/modernizr/modernizr.js'], dest: 'source/scripts/lib', flatten: true},
				],
			},
			bower_css: {
				files: [
				// Copy Normalize
				{expand: true, src: ['bower_components/normalize.css/normalize.css'], dest: 'source/styles/lib', flatten: true},
				// Copy Bourbon
				{expand: true, cwd: 'bower_components/', src: ['bourbon/**'], dest: 'source/styles/lib'},
				],
			},
		},

		rename: {
			bower_css: {
				files: [
				{src: ['source/styles/lib/normalize.css'], dest: 'source/styles/lib/_normalize.scss'},
				{src: ['source/styles/lib/_bourbon.css'], dest: 'source/styles/lib/_bourbon.scss'},
				]
			}
		},

		watch: {
			html: {
				files: '**/*.scss',
				options: {
                    livereload: true
                }
			},
			sass: {
				files: ['source/styles/**/*.scss' ],
				tasks: ['compass', 'cssmin', 'clean'],
				options: {
					livereload: true
				}
			},
			uglify: {
				files: ['source/scripts/*.js'],
				tasks: ['uglify'],
				options: {
					livereload: true
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-rename');

	grunt.registerTask('default', ['watch']);

		// Start web server
		grunt.registerTask('serve', [
			'connect:server',
			'watch'
		]);
};
