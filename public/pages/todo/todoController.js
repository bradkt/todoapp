angular.module('todoapp')
    .controller('todoController', todoController);

function todoController (TodoFactory, $routeParams, $scope) {
    var tc = this;
    var id = $routeParams.id;
    console.log('todoController');
    tc.todoData = {};

    // $http.get('http://localhost:8880/api/todos').then(function (res) {
    //     tc.todoData.display = res;
    //     console.log(res);
    // });

    $scope.submit = function () {
        var data = tc.todoData;
        console.log(data);
        // TodoFactory.setTodo(data)
    };
}



