angular.module('todoapp')
    .controller('loginController', loginController);

function loginController ($scope) {
    var lc = this;
    lc.loginData = {};

    $scope.submit = function () {


        validateUser()
    };

//? how to create optional parameters
    function validateUser () {
        var data = lc.loginData;
        console.log(data);
        // TodoFactory.validateUser(data);
    }
}