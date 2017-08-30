'use strict';

/**
 * @ngdoc overview
 * @name gitAppApp
 * @description
 * # gitAppApp
 *
 * Main module of the application.
 */
angular
  .module('gitAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngTable'
  ])
  .config(function ($routeProvider,$compileProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/);
  });
