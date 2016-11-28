angular.module('todoapp')
    .controller('todoController', todoController);

function todoController (TodoFactory, $routeParams, $scope, $cookies, $log, $timeout, $location) {
    var tc = this;
    var id = $routeParams.id;
    tc.todoData = {};
    tc.messages = {};
    var repeat_duration = 1;
    var cookieObj = $cookies.getObject('todoUserObject');


    getusertodos();
    validateUserSession();

    function getusertodos() {
        TodoFactory.getTodos(id).then(function (response) {
            if (response) {
                $scope.displayUcData = [];
                $scope.displayWeekData = [];
                $scope.displayMonthData = [];
                $scope.displayQuarterData = [];
                for (i in response) {
                    if (response[i].repeat_duration == 1) {
                        $scope.displayUcData.push(response[i]);
                    } else if (response[i].repeat_duration == 7) {
                        $scope.displayWeekData.push(response[i]);
                    } else if (response[i].repeat_duration == 30) {
                        $scope.displayMonthData.push(response[i]);
                    } else if (response[i].repeat_duration == 90) {
                        $scope.displayQuarterData.push(response[i]);
                    }
                }

            } else {
                tc.messages.error = 'error getting your todos';
                $log.info(tc.messages);
            }
        });
    }

    $scope.complete = function (data) {
        console.log($scope.strikeOut);
        $scope.strikeOut = true;
    };

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
        if (tc.todoData.week) {
            repeat_duration = 7;
        } else if (tc.todoData.month) {
            repeat_duration = 30;
        } else if (tc.todoData.quarter) {
            repeat_duration = 90;
        }

        data = {
            "todo": tc.todoData.todo,
            "user_id": id,
            "complete": 0,
            "repeat_duration": repeat_duration,
            "last_update": 0
        };

        TodoFactory.setTodo(data).then(function (response) {
            if (response) {
                $log.info('todo added');
                getusertodos(); //rather then making another call just add it locally to the model (push update)
            } else {
                tc.messages.error = 'error inserting todo';
                $log.info(tc.messages);
            }
        });
        clearCheckboxes();
        tc.todoData.todo = "";
    };

    $scope.delete = function (data) {
        TodoFactory.deleteTodo(data).then(function (response) {
            if (response) {
                $log.info('todo deleted successfully');
                getusertodos();
            } else {
                tc.messages.error = 'error deleting todo';
                $log.info(tc.messages);
            }
        });
    };

    function clearCheckboxes () {
        $scope.checkedWeek = false;
        $scope.checkedMonth = false;
        $scope.checkedQuarter = false;
        $scope.checkeduc = false;
    }

    // function getCheckedBox() {
    //
    //     if ($scope.checkedWeek = true) {
    //         return 7;
    //         $log.info("Checked fuct found 7");
    //     } else if ($scope.checkedMonth = true) {
    //         return 30;
    //         $log.info("Checked fuct found 30");
    //     } else if ($scope.checkedQuarter = true) {
    //         return 90;
    //         $log.info("Checked fuct found 90");
    //     } else {
    //         return 1;
    //         $log.info("Checked fuct found nothing else so its 1");
    //     }
    // };

    $scope.edit = function (data) {
        $scope.editThisTodoID = data.id;
        $scope.editTodoUserID = data.user_id;
        tc.todoData.todo = data.todo;

        // clear checkboxes
        clearCheckboxes();

        if (data.repeat_duration === 7) {
            $scope.checkedWeek = true;
            $log.info("found repeat_duration at 7");
        } else if (data.repeat_duration === 30) {
            $scope.checkedMonth = true;
            $log.info("found repeat_duration at 30");
        } else if (data.repeat_duration === 90) {
            $scope.checkedQuarter = true;
            $log.info("found repeat_duration at 90");
        } else {
            $scope.checkeduc = true;
            $log.info("found repeat_duration at not others");
        }

    };

    $scope.saveEdit = function () {

        if (tc.todoData.week) {
            repeat_duration = 7;
        } else if (tc.todoData.month) {
            repeat_duration = 30;
        } else if (tc.todoData.quarter) {
            repeat_duration = 90;
        }

        editedData = {
            "id": $scope.editThisTodoID,
            "todo": tc.todoData.todo,
            // "user_id": $scope.editTodoUserID,
            // "complete": 0,
            "repeat_duration": repeat_duration,
        };

        $log.info(editedData);

        TodoFactory.editTodo(editedData).then(function (response) {
            if (response) {
                $log.info('todo edited');
                getusertodos(); //rather then making another call just add it locally to the model (push update)
            } else {
                tc.messages.error = 'error editing todo';
                $log.info(tc.messages);
            }
        });

        clearCheckboxes();
        tc.todoData.todo = "";
    }

}



