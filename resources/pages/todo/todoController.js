angular.module('todoapp')
    .controller('todoController', todoController);

function todoController (TodoFactory, $routeParams, $scope, $cookies, $log, $timeout, $location, $http, Upload) {
    var tc = this;
    var id = $routeParams.id;
    tc.todoData = {};
    tc.messages = {};
    var repeat_duration = 1;
    var cookieObj = $cookies.getObject('todoUserObject');

    getusertodos();
    validateUserSession();
    setProfileImage();

    $scope.uploadFiles = function(file, errFiles) {
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            file.upload = Upload.upload({
                url: 'http://localhost:8888/api/post/image/multi',
                data: {
                    file: file,
                    'id': id
                }
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                    evt.loaded / evt.total));
            });
        }
    };

     function setProfileImage() {
         var image = 'images/' + id + '.png';
        $("#profileImage").attr("src", image);
    };

    function getusertodos() {
        TodoFactory.getTodos(id).then(function (response) {
            if (response) {
                $scope.displayUcData = [];
                $scope.displayWeekData = [];
                $scope.displayMonthData = [];
                $scope.displayQuarterData = [];

                for (i in response) {
                    $log.info(response[i]);
                    if (response[i].repeat_duration == 1 && response[i].complete == 0) {
                        $scope.displayUcData.push(response[i]);
                    } else if (response[i].repeat_duration == 7 && response[i].complete == 0) {
                        var weekMatch = Math.round(new Date() / 1000);
                        $scope.displayWeekData.push(response[i]);
                    } else if (response[i].repeat_duration == 30 && response[i].complete == 0) {
                        $scope.displayMonthData.push(response[i]);
                    } else if (response[i].repeat_duration == 90 && response[i].complete == 0) {
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
        console.log(data);
        // $scope.strikeOut = true;
        TodoFactory.completeTodo(data).then(function (response) {
            if (response) {
                $log.info(response);
                getusertodos();
            } else {
                $log.info('error completing this todo');
            }
        });

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

    $scope.saveNote = function(id) {
        var note = prompt("Please enter your note", "");
        data = {
            todo_id: id,
            note: note
        }
        TodoFactory.setNote(data).then(function (response) {
            if (response) {
                $log.info('note saved successfully');
            } else {
                tc.messages.error = 'error adding note';
                $log.info(tc.messages);
            }
        });
    };

    $scope.showNote = function(id) {
        TodoFactory.getNote(id).then(function (response) {
            if (response) {
                // $log.info(response);
                alert(response.note);
            } else {
                tc.messages.error = 'error getting note';
                $log.info(tc.messages);
            }
        });
    };

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
    };

    $scope.uploadImage = function() {
        var profileImage = document.getElementById("profileImage").files[0];

        if (window.File && window.FileReader && window.FileList && window.Blob) {
            var fr = new FileReader();

            fr.addEventListener("load", function () {

                $("#image").attr("src", fr.result);
                TodoFactory.saveImage(profileImage);

            }, false);

            if (profileImage) {
                fr.readAsDataURL(profileImage);
            }
        } else {
            alert('The File APIs are not fully supported in this browser.');
        }
    };
}




