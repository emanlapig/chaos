module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        files: {
          'css/style.css' : 'css/style.scss',
          'css/theme_blue.css' : 'css/theme_blue.scss',
          'css/theme_purple.css' : 'css/theme_purple.scss',
          'css/theme_turq.css' : 'css/theme_turq.scss',
        }
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'css/min/style.min.css': ['css/style.css'],
          'css/min/theme_blue.min.css': ['css/theme_blue.css'],
          'css/min/theme_purple.min.css': ['css/theme_purple.css'],
          'css/min/theme_turq.min.css': ['css/theme_turq.css'],
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'js/min/Model.min.js' : 'js/Model.js',
          'js/min/Model.keys.min.js' : 'js/Model.keys.js',
          'js/min/Controller.min.js' : 'js/Controller.js',
        }
      }
    },
    watch: {
      css: {
        files: ['css/*.scss', 'js/*.js'],
        tasks: ['sass', 'cssmin', 'uglify']
      }
    }
  });

  // Load the plugin(s).
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['sass', 'cssmin', 'uglify', 'watch']);

};