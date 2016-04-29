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
            jspm: {
                command: 'jspm bundle-sfx app public/app.js'
            }
        },

    });

    // load the tasks
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-shell');
    grunt.registerTask('default', ['clean', 'copy', 'shell:jspm']);

}
