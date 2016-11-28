angular.module('todoapp')
    .controller('loginController', loginController);

function loginController ($scope, TodoFactory, $location, $cookies, $log) {
    var lc = this;
    lc.loginData = {};
    var id = '';

    $scope.submit = function () {
        var data = lc.loginData;
        console.log(data.email);
        TodoFactory.loginUser(data).then(function (response) {
            console.log(response);
            if (response === "guest") {
                console.log('Email and/or Password are incorrect');
            } else {
                var expired = Math.round(new Date() / 1000) + 500;
                $log.info('------------------------------');

                $log.info(expired);
                // expired.setMinutes(expired.getMinutes() + 3);

                var todoUserCookie = {
                        'username': response[1],
                        'expires' : expired,
                        'cookie' : 'oatmealRasin'
                };
                $cookies.putObject('todoUserObject', todoUserCookie);

                $location.url('mytodos/' + response[0]);
            }
        });

    };

//? how to create optional parameters
    function validateUser(response) {
        console.log(response.password);
        if (lc.loginData.password === response.password) {
            // $cookies.put('user', response.id);
            // var username = $cookies.get('user');
            $location.url('mytodos/' + response.id);
        } else {
            console.log('Email and/or Password are incorrect')
        }
    }
}