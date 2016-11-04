angular.module('todoapp').factory('TodoFactory', TodoFactory);

function TodoFactory($http) {
    return {
        insertUser: insertUser,
        getTodos: getTodos,
        setTodo: setTodo,
    };

    function insertUser(data) {
        $http.post('http://localhost:8888/api/user', data).then(complete).catch(failed);
    }

    function getUser(email) {
        $http.get('http://localhost:8888/api/users/', {params:{"email": email}})
            .then(complete).catch(failed);
    }

    function getTodos(user) {
        $http.get('http://localhost:8888/api/todos/', {params:{"user": user}})
            .then(complete).catch(failed);
    }

    function setTodo(data) {
        $http.post('http://localhost:8888/api/todo/', data)
            .then(complete).catch(failed);
    }

    function complete(response) {
        return response.data;
    }

    function failed(error) {
        return error.data;
    }
}

