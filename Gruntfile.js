module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		htmlbuild: {
			dist: {
				src: 'dev/*.html',
				dest: 'dist/',
				options: {
					beautify: true,
					sections: {
						layout: {
							header: 'dev/includes/header.html',
                        	footer: 'dev/includes/footer.html'
						}
					}
				}
			}
		},
		connect: {
			server: {
				options: {
					port: 8000,
					base: 'dist',
					livereload: true
				}
			}
		},
		less: {
			bootstrap: {
				files: {
					'dist/css/bootstrap.css': 'dist/less/bootstrap/bootstrap.less'
				}
			},
			style: {
				files: {
					'dist/css/style.css': 'dist/less/style.less'
				}
			}
		},
		watch: {
			bootstrap: {
				files: ['dist/less/bootstrap/*.less'],
				tasks: ['less:bootstrap'],
				options: {
					livereload: true
				}
			},
			style: {
				files: ['dist/less/*.less'],
				tasks: ['less:style'],
				options: {
					livereload: true
				}
			},
			html: {
				files: ['dev/*.html', 'dev/includes/*.html'],
				tasks: ['htmlbuild:dist'],
				options: {
					livereload: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-html-build');

	grunt.registerTask('default', ['connect', 'watch']);
}