angular.module('todoapp')
    .controller('todoController', todoController);

function todoController ($http, $routeParams) {
    var tc = this;
    var id = $routeParams.id;
    console.log('todoController');
    $http.get('http://localhost:8880/api/todos').then(function (res) {
        console.log(res);
    });
}