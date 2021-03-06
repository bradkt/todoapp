angular.module('todoapp').factory('TodoFactory', TodoFactory);

function TodoFactory($http) {
    return {
        insertUser: insertUser,
        getTodos: getTodos,
        setTodo: setTodo,
        loginUser: loginUser,
        deleteTodo: deleteTodo,
        editTodo: editTodo,
        editPassword: editPassword,
        completeTodo: completeTodo,
        resetCompleted: resetCompleted,
        setNote: setNote,
        getNote: getNote,
        // saveImage: saveImage,
        getImage: getImage
    };

    // function saveImage(data) {
    //     return $http.post('http://localhost:8888/api/post/image/multi', data).then(complete).catch(failed);
    // }

    function getImage(data) {
        return $http({
            url: 'http://localhost:8888/api/get/image',
            method: "GET",
            params: {'id': data },
            responseType: 'arraybuffer'
        }).then(complete).catch(failed);

        //
        // $http({
        //     method: 'GET',
        //     url: 'http://localhost:8888/api/get/image',
        //     responseType: 'arraybuffer'
        // }).then(function(response) {
        //     console.log(response);
        //     var str = _arrayBufferToBase64(response.data);
        //     console.log(str);
        //     // str is base64 encoded.
        // }, function(response) {
        //     console.error('error in getting static img.');
        // });
    }

    function setTodo(data) {
        return $http.post('http://localhost:8888/api/todo', data).then(complete).catch(failed);
    }

    function editPassword(data) {
        return $http({
            url: 'http://localhost:8888/api/user/edit',
            method: "GET",
            params: data
        }).then(complete).catch(failed);
    }

    function editTodo(data) {
        return $http.post('http://localhost:8888/api/todo/edit', data).then(complete).catch(failed);
    }

    function completeTodo(data) {
        return $http.post('http://localhost:8888/api/todo/complete', data).then(complete).catch(failed);
    }

    function resetCompleted(data) {
        return $http({
            url: 'http://localhost:8888/api/todo/cron',
            method: "GET",
            params: {rd: data}
        }).then(complete).catch(failed);
    }


    function deleteTodo(data) {
        return $http({
            url: 'http://localhost:8888/api/todo/delete',
            method: "GET",
            params: {id: data}
        }).then(complete).catch(failed);
    }

    function insertUser(data) {
        return $http.post('http://localhost:8888/api/user', data).then(complete).catch(failed);
    }

    function loginUser(data){
        return $http.post('http://localhost:8888/user/login', data)
            .then(complete).catch(failed);
    }

    function getTodos(data) {
        return $http({
            url: 'http://localhost:8888/api/todos',
            method: "GET",
            params: {id: data}
        }).then(complete).catch(failed);
    }

    function setNote (data){
        return $http.post('http://localhost:8888/api/note', data)
            .then(complete).catch(failed);
    }

    function getNote (data){
        return $http({
            url: 'http://localhost:8888/api/note/one',
            method: "GET",
            params: {id: data}
        }).then(complete).catch(failed);
    }

    function complete(response) {
        return response.data;
    }

    function failed(error) {
        console.log(error.statusText);
    }
}

