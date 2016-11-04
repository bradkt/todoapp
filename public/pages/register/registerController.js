angular.module('todoapp')
    .controller('regController', regController);

function regController ($scope, TodoFactory) {
    var rc = this;
    console.log('regController');
    rc.regInfo = {};

    $scope.submit = function () {

        rc.areRegInfoPasswordsEqual = function () {
            return rc.regInfo.password && rc.regInfo.password == rc.regInfo.confirmPass;
        };
        saveUser()
    };

//? how to create optional parameters
    function saveUser () {
        var data = rc.regInfo;
        TodoFactory.insertUser(data);
    }
 }
