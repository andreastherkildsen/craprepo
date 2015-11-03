angular.module('imgModule', ['ngStorage', 'naif.base64'])
.controller('imgCtrl', function($scope, $http, $window, $rootScope, $localStorage){
  $scope.file = '';

  $scope.$storage = $localStorage;

    if($scope.$storage.photos == null) {
      $scope.$storage.photos = [];
    }

    $scope.photos =  $scope.$storage.photos;

    $scope.upload = function() { console.log($scope.file);
      $scope.$storage.photos.push({
          file:$scope.file, 
          title:$scope.title, 
          description:$scope.description,
          createdDate: new Date()
        });
      $scope.file = '';
      $scope.photos = $scope.$storage.photos;
    }

});