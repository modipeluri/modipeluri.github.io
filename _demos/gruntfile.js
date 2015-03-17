'use strict';

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks
    // Project configuration.
    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            gruntfile: {
                src: 'Gruntfile.js'
            }
        },
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/css',
                    src: ['*.scss'],
                    dest: 'dest/css',
                    ext: '.css'
                }],
            },
            dist_bower: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/bootstrap-sass/assets/stylesheets',
                    src: ['*.scss'],
                    dest: 'dest/css',
                    ext: '.css'
                }]
            },
            tasks: ['autoprefixer']
        },
        jade: {
            compile: {
                options: {
                    data: {
                        debug: true
                    }
                },
                files: {
                    "dest/index.html": ["src/jade/*.jade"]
                }
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            jade: {
                files: 'src/jade/*.jade',
                tasks: ['jade'],
                options: {
                    reload: true
                },
            },
            sass: {
                files: ['src/css/*.scss'],
                tasks: ['sass'],
                options: {
                    reload: true
                }
            },
            bower_components: {
                files: ['bower_components/bootstrap-sass/assets/stylesheets/*.scss'],
                tasks: ['sass'],
                options: {
                    reload: true
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9']
            },
            // multiple_files: {
            //     expand: true,
            //     flatten: true,
            //     src: 'src/css/*.css', // -> src/css/file1.css, src/css/file2.css
            //     dest: 'dest/css/' // -> dest/css/file1.css, dest/css/file2.css
            // }
            no_dest: {
                src: 'dest/css/'
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.registerTask('default', ['jshint', 'sass', 'jade', 'watch']);
};
