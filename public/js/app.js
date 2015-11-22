 'use strict';
 
 /* App Module */

 angular.module('angular', [
  'ui.router',
  'ngStorage',
  'imgModule',
  'memberzModule',
  'postModule',
  'postServiceModule'
]).run(function($rootScope) {
  $rootScope.authenticated = false;
  $rootScope.current_user = '';
  
  $rootScope.signout = function(){
      $http.get('auth/signout');
      $rootScope.authenticated = false;
      $rootScope.current_user = '';
  };
})

.config(function($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $locationProvider) {
 	
 	 $urlRouterProvider.when('', '/');
 	 $urlRouterProvider.otherwise("/404");

      $stateProvider
       .state('home', {
      url: '/',
      templateUrl: 'views/main.html',
      controller: 'MemberCtrl'
    })

    	 .state('frontpage', {
      url: '/frontpage',
      templateUrl: 'views/frontpage.html',
      controller: 'postCtrl'

          })

       .state('profile', {
        url: '/profile',
        templateUrl: 'views/profile.html',
        controller: 'imgCtrl'
       });

       $locationProvider.html5Mode(true);


  })


//Used for setting active class on li elements in navs
.directive('bsActiveLink', ['$location', function ($location) {
        return {
                restrict: 'A', //use as attribute
                replace: false,
                link: function (scope, elem) {
                        //after the route has changed
                        scope.$on("$routeChangeSuccess", function () {
                                var hrefs = ['/#' + $location.path(),
                                        '#' + $location.path(), //html5: false
                                        $location.path()]; //html5: true
                                angular.forEach(elem.find('a'), function (a) {
                                        a = angular.element(a);
                                        if (-1 !== hrefs.indexOf(a.attr('href'))) {
                                                a.parent().addClass('active');
                                        } else {
                                                a.parent().removeClass('active');
                                        }
                                });
                        });
                }
        };
}]);
