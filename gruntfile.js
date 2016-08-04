module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({

        clean: ['build/'],

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                ignores: [
                    'src/js/vendor/**'
                ]
            },
            all: {
                files: {
                    src: [ 'src/js/**/*.js', 'gruntfile.js' ]
                }
            }
        },

        concat: {
            js: {
                options: {
                    sourceMap: true
                },
                src: ['src/js/todo.module.js', 'src/js/*.js'],
                dest: 'build/js/main.js'
            }
        },

        sass: {
            all: {
                files: {
                    'build/css/styles.css': 'src/sass/main.scss'
                }
            }
        },

        copy: {
            html: { //arbitrary target name, but nice to name what you're targeting if multiple
                files: [
                    { expand: true, cwd: 'src/', src: ['*.html'], dest: 'build/' }
                ]
            },
            vendorjs: {
                files: [
                    { expand: true, cwd: 'src/js', src: ['vendor/angular/angular.min.js'], dest: 'build/js/'}
                ]
            }

        },

        watch: {
            sass: {
                files: [ 'src/sass/**/*.scss' ],
                tasks: [ 'sass' ],
            },
            js: {
                files: [ 'src/js/**/*.js' ],
                tasks: [ 'jshint', 'test', 'concat' ]
            },
            html: {
                files: [ 'src/**/*.html' ],
                tasks: [ 'copy:html' ]
            }
        },

        karma: {
            all: {
                options: {
                    frameworks: ['mocha', 'chai'],
                    client: {
                        mocha: {
                            ui: 'tdd'
                        }
                    },
                    browsers: ['PhantomJS'],
                    singleRun: true,
                    files: [
                        'node_modules/angular/angular.js',
                        'node_modules/angular-mocks/angular-mocks.js',
                        'src/js/todo.module.js',
                        'src/js/**/*.js',
                        'test/specs/**/*.spec.js'
                    ]
                }
            }
        }

    });

    //loading plugins

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');


    //setting up task aliases
    grunt.registerTask('test', ['karma']);
    grunt.registerTask('build', [ 'clean', 'jshint', 'concat', 'sass', 'copy']);
    grunt.registerTask('default', [ 'build' ]);
};
