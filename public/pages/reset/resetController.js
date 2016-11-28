angular.module('todoapp')
    .controller('resetController', resetController);

function resetController ($scope, TodoFactory, $location, $cookies, $log, $timeout) {
    var res = this;
    res.loginData = {};
    // var id = '';
    var cookieObj = $cookies.getObject('todoUserObject');

    validateUserSession ();
    function validateUserSession () {
        var now = Math.round(new Date() / 1000);
        if (cookieObj){
            var expires = (cookieObj.expires);
            if (now > expires) {
                $log.info("now : " + now);
                $log.info("expires : " + cookieObj.expires);
                $log.info('Cookie expired!');
                $location.url('/login');
            } else {
                $timeout(function () {
                    $log.info("now : " + now);
                    $log.info("expires : " + expires);
                    $log.info('Cookie has not expired');
                    validateUserSession();
                }, 60000);
            }
        } else {
            $location.url('/login');
        }
    }

    $scope.submit = function () {
        var data = res.resetData;
        console.log(data.email);
        TodoFactory.editPassword(data).then(function (response) {
            if (response) {
                console.log(response);
            } else {
                $log.info('unable to reset password');
            }
        });
    };
}