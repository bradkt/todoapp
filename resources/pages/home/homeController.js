angular.module('todoapp')
    .controller('homeController', homeController);

function homeController ($scope) {
    var hc = this;
    hc.firstName = "John";
    hc.lastName = "Doe";
    console.log('homeController');
}