<!DOCTYPE html>
<html lang="en" ng-app="todoapp">
<head>
    <?php

    ?>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>ToDo App</title>

    <!--stylesheets-->
    <link rel="stylesheet" href="/vendors/bootstrap/dist/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="/css/main.css"/>



    <!--vender scripts-->
    <script src="/vendors/angular/angular.min.js"></script>
    <script src="/vendors/angular-route/angular-route.min.js"></script>
    <script src="/vendors/angular-cookies/angular-cookies.min.js"></script>

    <!--custom scripts-->
    <script src="/js/todoapp.module.js"></script>
    <script src="/js/todoApiFactory.js"></script>


    <!--controller scripts-->
    <script src="/pages/home/homeController.js"></script>
    <script src="/pages/login/loginController.js"></script>
    <script src="/pages/register/registerController.js"></script>
    <script src="/pages/todo/todoController.js"></script>
    <script src="/pages/reset/resetController.js"></script>
    <script src="/js/main.js"></script>


</head>

<body>

    <div ng-view></div>

<!-- Site footer -->
<footer>
    <p>&copy; Btracy 2016</p>
</footer>

</body>
</html>