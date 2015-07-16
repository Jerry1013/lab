module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'scripts/vendor/jquery.js',
      'scripts/vendor/angular.js',
      'scripts/vendor/angular-ui-router.js',
      'scripts/vendor/angular-animate.js',
      'scripts/vendor/angular-resource.js',
      'scripts/vendor/ui-bootstrap-tpls.js',
      'scripts/vendor/angular-mocks.js',
      'scripts/app.js',
      'scripts/config/router.js',
      'scripts/controllers/*.js',
      'scripts/directives/*.js',
      'scripts/filters/*.js',
      'scripts/services/*.js',
      'scripts/test/**/*.js',
      'scripts/directives/templates/*.html'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter', 
            'karma-ng-html2js-preprocessor'
            ],
    preprocessors: {
      'scripts/directives/templates/*.html':['ng-html2js']
    },

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit' 
    }

  });
};
