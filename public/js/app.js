 'use strict';
 
 /* App Module */

 angular.module('angular', [
  'ui.router',
  'ngStorage',
  'ngResource',
  'ngGeolocation',
  'imgModule',
  'memberzModule',
  'postModule',
  'postServiceModule',
  'postIdModule'

]).run(function($rootScope) {
  $rootScope.authenticated = false;
  $rootScope.current_user = '';
  
  $rootScope.signout = function(){
      $http.get('auth/signout');
      $rootScope.authenticated = false;
      $rootScope.current_user = '';
      $$location.path('/');
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
    controller: 'MemberCtrl'
  })

  .state('newpost', {
    url: '/newpost',
    templateUrl: 'views/newpost.html',
    controller: 'postCtrl'
  })

  .state('frontfagedetail', {
    url: '/frontpage/:frontpageId',
    templateUrl: 'views/newpost-single.html',
    controller: 'postIdCtrl'
  });

  $locationProvider.html5Mode(true);
})


