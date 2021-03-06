const webpackConfig = require('./webpack.config');

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
        files: [{
          expand: true,
          cwd: 'dist',
          src: ['*.css', '!*.min.css'],
          dest: 'dist'
        }]
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
    imagemin: {
      dist: {
        files: [{
            expand: true,
            cwd: 'img/',
            src: ['*.{png,jpg,gif}'],
            dest: 'dist/img/'
          }]
      }
    },
    webpack: {
      options: {
        stats: false,
        progress: false,
        watch: false,
      },
      dist: webpackConfig
    },
    watch: {
      grunt: {files: ['Gruntfile.js']},
      options: {
        spawn: false
      },
      sass: {
        files: ['scss/*.scss', 'scss/**/*.scss'],
        tasks: ['sass', 'autoprefixer', 'bsReload:css']
      },
      icons: {
        files: ['icons/source/*.svg', 'icons/source/*.png'],
        tasks: ['svgmin', 'grunticon', 'bsReload:all']
      },
      images: {
        files: ['img/*'],
        tasks: ['imagemin']
      },
      js: {
        files: ['js/*.js'],
        tasks: ['webpack', 'bsReload:js']
      }
    },
    clean: {
      build: ['dist', '!dist/.gitignore'],
      icons: ['icons/source-svg-min']
    },
    makepot: {
      target: {
        options: {
          domainPath: 'lang',
          mainFile: 'style.css',
          potHeaders: {
            'language': 'cs',
            poedit: true,
          },
          type: 'wp-theme',
        }
      }
    },
    browserSync: {
      dev: {
        options: {
          proxy: 'example.com',
          background: true
        }
      }
    },
    bsReload: {
      css: {
        reload: 'dev/style.css'
      },
      js: {
        reload: 'dev/js/*'
      },
      all: {
        reload: true
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-grunticon');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-wp-i18n');

  grunt.registerTask('default', ['sass', 'webpack', 'svgmin', 'grunticon', 'imagemin', 'browserSync', 'watch']);
  grunt.registerTask('styles', ['sass', 'autoprefixer']);
  grunt.registerTask('icons', ['svgmin', 'grunticon']);
  grunt.registerTask('prod', ['clean', 'sass', 'autoprefixer', 'cssmin', 'webpack', 'svgmin', 'imagemin', 'grunticon', 'makepot']);

};