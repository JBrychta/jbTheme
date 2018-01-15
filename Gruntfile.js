module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'dist/style.css': 'scss/style.scss'
        }
      }
    },
    autoprefixer: {
      dist: {
        options: {
          browsers: ['last 2 versions']
        },
        files: {
          'dist/style.css': 'dist/style.css'
        }
      }
    },
    cssmin: {
      target: {
        files: {
          'dist/style.css': 'dist/style.css'
        }
      }
    },
    svgmin: {
      dist: {
        options: {
          plugins: [
            {removeXMLProcInst: false}
          ]
        },
        files: [{
            expand: true,
            cwd: 'icons/source',
            src: ['*.svg'],
            dest: 'icons/source-svg-min'
          }]
      }
    },
    grunticon: {
      icons: {
        files: [{
            expand: true,
            cwd: 'icons',
            src: ['source-svg-min/*.svg', 'source/*.png'],
            dest: 'dist'
          }],
        options: {
          enhanceSVG: true,
          customselectors: {
            '*': ['.icon-$1:after']
          }
        }
      }
    },
    uglify: {
      dist: {
        options: {
          mangle: false,
          beautify: true
        },
        files: [{
            expand: true,
            src: 'js/*.js',
            dest: 'dist'
          }]
      },
      prod: {
        options: {
          mangle: false,
          beautify: false
        },
        files: [{
            expand: true,
            src: 'js/*.js',
            dest: 'dist'
          }]
      }
    },
    watch: {
      grunt: {files: ['Gruntfile.js']},
      sass: {
        files: ['scss/*.scss', 'scss/**/*.scss'],
        tasks: ['sass', 'autoprefixer']
      },
      icons: {
        files: ['icons/source/*.svg', 'icons/source/*.png'],
        tasks: ['svgmin', 'grunticon']
      },
      js: {
        files: ['js/*.js'],
        tasks: ['uglify:dist']
      }
    },
    clean: {
      build: ['dist', '!dist/.gitignore']
    },
    browserSync: {
      bsFiles: {
        src: 'dist/*'
      },
      options: {
        watchTask: true,
        proxy: 'example.com'
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-grunticon');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browser-sync');

  grunt.registerTask('default', ['browserSync', 'watch']);
  grunt.registerTask('styles', ['sass', 'autoprefixer']);
  grunt.registerTask('icons', ['svgmin', 'grunticon']);
  grunt.registerTask('prod', ['clean', 'sass', 'autoprefixer', 'cssmin', 'uglify:prod', 'svgmin', 'grunticon']);

};