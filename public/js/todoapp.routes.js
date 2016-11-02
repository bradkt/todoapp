/**
 * Created by brad on 10/30/16.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.tables', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('tables', {
                url: '/tables',
                controller: 'TablesPageCtrl',
                controllerAs: 'tc',
                title: 'Tables',
                sidebarMeta: {
                    icon: 'ion-grid',
                    order: 300,
                },
            }).state('tables.basic', {
            url: '/admin',
            templateUrl: 'app/pages/tables/basic/tables.html',
            title: 'Admin Tables',
            sidebarMeta: {
                order: 0,
            },
        });
        $urlRouterProvider.when('/tables','/tables/basic');
    }

})();