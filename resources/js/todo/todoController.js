(function () {
    'use strict';

    angular.module('todo', ['ngRoute'])
        .controller('todoController', todoController);

    function todoController ($http) {
        var tc = this;

        $http.get('http://localhost:8888/api/todos').then(function (res) {
            console.log(res);
        });


    }

})();