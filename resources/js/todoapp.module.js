angular.module('todoapp', ['ngRoute', 'ngCookies', 'ngFileUpload'])
    .config(config);

function config($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home/home.html',
            controller: 'homeController',
            controllerAs: 'hc'
        })
        .when('/mytodos/:id', {
            templateUrl: 'pages/todo/todo.html',
            controller: 'todoController',
            controllerAs: 'tc'
        })
        .when('/login', {
            templateUrl: 'pages/login/login.html',
            controller: 'loginController',
            controllerAs: 'lc'
        })
        .when('/register', {
            templateUrl: 'pages/register/register.html',
            controller: 'regController',
            controllerAs: 'rc'
        })
        .when('/reset', {
            templateUrl: 'pages/reset/reset.html',
            controller: 'resetController',
            controllerAs: 'res'
        })
        .when('/404', {
            templateUrl: 'pages/404.html'
        })
        .otherwise({
            redirectTo: '/404'
        });
}