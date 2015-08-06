/**
 * @ngdoc overview
 * @name hiitTimerApp
 * @description
 * # hiitTimerApp
 *
 * Main module of the application.
 */
(function() {

    'use strict';

    angular
        .module('hiitTimerApp', [
            'ngAnimate',
            'ngCookies',
            'ngResource',
            'ngRoute',
            'ngSanitize',
            'ngTouch',
            'ui.bootstrap',
            'timer',
            'services.routine'
        ])
        .config(appConfig);


    /**
     * appConfig
     * @param $routeProvider
     */
    function appConfig($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
})();
