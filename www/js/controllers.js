
angular.module('app.controllers', [])



    .controller('MainController', [ '$scope', function($scope) {
        $scope.toggleMenu = function() {
            $scope.sideMenuController.toggleLeft();
        }
    }])

    .controller('EntryPageController', [ '$scope', '$state', function($scope, $http ,$state) {
        $scope.navTitle = '<img class="popuplogo" src="gallery/logos/POPUPBLVD-logo-wht.png" height="38" />';

        $scope.signIn = function() {
            $http.get('http://echo.jsontest.com/conditions/frightful').then(function(resp) {
                $scope.conditions = resp.data.conditions;
            }, function(err) {
                console.error('ERR', err);
                // err.status will contain the status code
            })

            //$state.go('main.home');
        }
    }])

    .controller('HomePageController', [ '$scope', '$state', function($scope, $state) {
        $scope.navTitle = 'Home Page';

        $scope.leftButtons = [{
            type: 'button-icon icon ion-navicon"',
            tap: function(e) {
                $scope.toggleMenu();
            }
        }];
    }])

    .controller('InfoPageController', [ '$scope', '$state', function($scope, $state) {
        $scope.navTitle = 'Info Page';

        $scope.leftButtons = [{
            type: 'button-icon icon ion-navicon',
            tap: function(e) {
                $scope.toggleMenu();
            }
        }];
    }])

    .controller('SignUpController', [ '$scope', '$state', '$http', function($scope, $http, $state) {
        $scope.navTitle = 'Sign Up';

        $scope.leftButtons = [{
            type: 'button-icon icon ion-navicon',
            tap: function(e) {
                $scope.toggleMenu();
            }
        }];
    }])

    .controller('SignInController', [ '$scope', '$state', '$http', function($scope, $http,  $state) {
        $scope.navTitle = 'Sign In';

        $scope.leftButtons = [{
            type: 'button-icon icon ion-navicon',
            tap: function(e) {
                $scope.toggleMenu();
            }
        }];



    }])

    .controller('DemoController', [ '$scope', '$state', '$http', function($scope, $state) {
        //$scope.navTitle = '';

        /*$scope.leftButtons = [{
         type: 'button-icon icon ion-navicon button-balanced',
         tap: function(e) {
         $scope.toggleMenu();
         }
         }];*/
        $http.get('http://localhost:8000/pages').
            success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                console.log(data);
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

    }])

    .controller('TabsPageController', [ '$scope', '$state', function($scope, $state) {
        $scope.navTitle = 'Tab Page';

        $scope.leftButtons = [{
            type: 'button-icon icon ion-navicon',
            tap: function(e) {
                $scope.toggleMenu();
            }
        }];
    }]);
