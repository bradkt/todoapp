angular.module('todoapp')
    .controller('regController', regController);

function regController ($scope, TodoFactory, $location) {
    var rc = this;
    rc.regInfo = {};
    rc.messages = {};

    $scope.submit = function () {
        var data = rc.regInfo;
        console.log(data);
        TodoFactory.insertUser(data).then(function (response) {
            console.log(response);
            if (response) {
                $location.url('login');
            } else {
                rc.messages.error = 'there was an error in your registraition';
                console.log(rc.messages);
            }
        });
    };

    rc.areRegInfoPasswordsEqual = function () {
        return rc.regInfo.password && rc.regInfo.password == rc.regInfo.confirmPass;
    };

 }
