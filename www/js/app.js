(function () {
	'use strict';
	var app = angular.module('app', ['ionic'], function config($httpProvider) {
		//$httpProvider.interceptors.push('AuthInterceptor');
	});

	app.config(function($httpProvider) {
		//Enable cross domain calls
		$httpProvider.defaults.useXDomain = true;

		//Remove the header used to identify ajax call  that would prevent CORS from working
		delete $httpProvider.defaults.headers.common['X-Requested-With'];

		$stateProvider
			.state('entry', {
				url : '/entry',
				templateUrl : 'entry.html',
				controller : 'EntryPageController'
			})

			.state('main', {
				url : '/main',
				templateUrl : 'mainContainer.html',
				abstract : true,
				controller : 'MainController'
			})

			.state('main.home', {
				url: '/home',
				views: {
					'main': {
						templateUrl: 'home.html',
						controller : 'HomePageController'
					}
				}
			})
			.state('main.signup', {
				url: '/signup',
				views: {
					'main': {
						templateUrl: 'signup.html',
						controller : 'SignUpController'
					}
				}
			})
			.state('main.signin', {
				url: '/signin',
				views: {
					'main': {
						templateUrl: 'signin.html',
						controller : 'SignInController'
					}
				}
			})

			.state('main.info', {
				url: '/info',
				views: {
					'main': {
						templateUrl: 'info.html',
						controller : 'InfoPageController'
					}
				}
			})

			.state('main.tabs', {
				url: '/tabs',
				views: {
					'main': {
						templateUrl: 'tabs.html',
						controller : 'TabsPageController'
					}
				}
			})

			.state('main.demo', {
				url: '/demo',
				views: {
					'main': {
						templateUrl: 'demo.html',
						controller : 'DemoController'
					}
				}
			})

		$urlRouterProvider.otherwise('/entry');




	});


	app.constant('API_URL', 'http://boulvard.popupblvd.us');
	//app.constant('API_URL', 'http://localhost:8000');

	app.controller('MainCtrl', function MainCtrl(DataFactory, UserFactory) {
		'use strict';
		var vm = this;
		console.log(this);
		vm.getData = getData;
		vm.login = login;
		vm.logout = logout;

		// initialization
		/*
		 UserFactory.getUser().then(function success(response) {
		 vm.user = response.data;
		 });
		 */

		function getData() {
			DataFactory.getData().then(function success(response) {
				vm.data = response.data;
			}, handleError);
		}

		function login(email, password) {
			UserFactory.login(email, password).then(function success(response) {
				vm.user = response.data;
				console.log(vm.user);

			}, handleError);
		}

		function logout() {
			UserFactory.logout();
			vm.user = null;
		}

		function handleError(response) {
			console.log(response.data);
		}
	});






	app.factory('DataFactory', function DataFactory($http, API_URL) {
		'use strict';
		return {
			getData: getData
		};

		function getData() {
			return $http.post(API_URL + '/pages');
		}
	});

	// https://auth0.com/blog/2014/01/07/angularjs-authentication-with-cookies-vs-token/

	app.factory('UserFactory', function UserFactory($http, API_URL, AuthTokenFactory, $q) {
		'use strict';
		return {
			login: login,
			logout: logout,
			getUser: getUser,
			register: registerUser
		};

		function login(email, password) {
			return $http.post(API_URL + '/sessions' + '?email=' + email + '&password=' + password).then(function success(response) {
				AuthTokenFactory.setToken(response.data.token);
				console.log(AuthTokenFactory.getToken());
				return response;
			});
		}

		function registerUser(username, email, password, confirm_password) {
			return $http.post(API_URL + '/sessions' + '?username=' + username + '?email=' + email + '&password=' + password + '&confirm_password=' + confirm_password).then(function success(response) {
				AuthTokenFactory.setToken(response.data.token);
				return response;
			});
		}

		function logout() {
			AuthTokenFactory.setToken();
		}

		function getUser() {
			if (AuthTokenFactory.getToken()) {
				return $http.get(API_URL + '/user');
			} else {
				return $q.reject({ data: 'client has no auth token' });
			}
		}
	});

	app.factory('AuthTokenFactory', function AuthTokenFactory($window) {
		'use strict';
		var store = $window.localStorage;
		var key = 'auth-token';

		return {
			getToken: getToken,
			setToken: setToken
		};

		function getToken() {
			return store.getItem(key);
		}

		function setToken(token) {
			if (token) {
				store.setItem(key, token);
			} else {
				store.removeItem(key);
			}
		}

	});

	app.factory('AuthInterceptor', function AuthInterceptor(AuthTokenFactory) {
		'use strict';
		return {
			request: addToken
		};

		function addToken(config) {
			var token = AuthTokenFactory.getToken();
			if (token) {
				config.headers = config.headers || {};
				config.headers.Authorization = 'Bearer ' + token;
			}
			return config;
		}
	});
})();