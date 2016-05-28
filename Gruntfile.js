// Gruntfile.js
module.exports = function(grunt) {
    grunt.initConfig({
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'app',
                    src: ['**/*.html', '*.html'],
                    dest: 'public/app'
                }, {
                    expand: true,
                    src: ['index.html'],
                    dest: 'public'
                }]
            }
        },

        clean: {
            main: {
                src: ['public']
            },
        },

        shell: {
            prod: {
                command: 'jspm build app public/app.js --minify'
            },
            deploy: {
                command: 'firebase deploy'
            },  
            dev: {
                command: "concurrent \"npm run tsc:w\" \"npm run lite\" \"jspm bundle app public/app.js -wid\""
            }
        },

        sass: {
            dist: {
              files: [{
                expand: true,
                cwd: 'app/scss',
                src: ['*.scss'],
                dest: 'public/app/css',
                ext: '.css'
              }]
            }
        },

        watch: {
            css: {
                files: 'app/scss/*.scss',
                tasks: ['sass']
            }
        },

        processhtml: {
            options: {
              data: {
                message: 'Hello world!'
              }
            },
            dist: {
              files: {
                'public/index.html': ['index.html']
              }
            }
        }

        

    });

    // load the tasks
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-processhtml');

    grunt.registerTask('default', ['clean', 'copy', 'shell:jspm']);
    grunt.registerTask('prod', ['clean', 'copy', 'sass', 'processhtml', 'shell:prod']);
    grunt.registerTask('serve', ['clean', 'copy', 'sass', 'shell:dev']);
    grunt.registerTask('deploy', ['shell:deploy']);

}
