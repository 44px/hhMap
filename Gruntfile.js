'use strict';

module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		connect: {
			options: {
				port: 9001,
				hostname: '0.0.0.0'
			},

			simple: {
				options: {
					base: './src'
				}
			}
		},


        sass: {
            dist: {
                files: {
                    'tmp/css/main.css': 'src/assets/scss/main.scss'
                }
            }
        },


		autoprefixer: {
            options: {
                browsers: ['last 2 versions']
            },

			dist: {
				expand: true,
				flatten: true,
				src: 'tmp/css/*.css',
				dest: 'src/assets/css'
			}
		},


        copy: {
            dist: {
                files: [
                    {
						expand: true,
						cwd: 'src',
						src: ['*.html', 'favicon.png', 'assets/css/*', 'assets/img/**'],
						dest: 'dist/'
					}
                ]
            }
        },


        clean: {
            dist: ['dist']
        },


		watch: {
			css: {
				files: ['src/assets/scss/**'],
				tasks: ['sass', 'autoprefixer']
			},

			livereload: {
				files: ['src/assets/css/*.css'],
				options: {
					livereload: true
				}
			}
		}
	});

	/* -------------------------------------------------------------------------------------------------------------- */

    grunt.registerTask('compile', [
        'sass',
        'autoprefixer'
    ]);


    grunt.registerTask('build', [
        'clean',
        'compile'
        /*'copy'*/
    ]);


    grunt.registerTask('default', [
        'compile',
        'connect',
        'watch'
    ]);
};
