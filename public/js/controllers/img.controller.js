angular.module('imgModule', ['ngStorage', 'naif.base64', 'ngGeolocation'])
.controller('imgCtrl',['$scope', '$http', '$window', '$rootScope', '$localStorage', '$geolocation', function($scope, $http, $window, $rootScope, $localStorage, $geolocation){
  // Get member number 3 (this is the one we're "logged in" as)
  $scope.member = $localStorage.members[2]; 

  $scope.file = '';
  $scope.$storage = $localStorage;

  if($localStorage.photos == null) {
    $localStorage.photos = [];
  }

  $scope.photos =  $localStorage.photos;

  // Get position
  $geolocation.getCurrentPosition({
    timeout: 60000
  }).then(function(position) {
    // make "position" available outside by assigning it's value to "myPosition"
    $scope.myPosition = position;
  });

  $scope.upload = function(){
    var newImage = {
      file:$scope.file, 
      title:$scope.title, 
      description:$scope.description,          
      createdDate: new Date(),
      latitude: $scope.myPosition.coords.latitude,
      longitude: $scope.myPosition.coords.longitude
    };
    
    console.log(newImage);
    $localStorage.photos.push(newImage);
    $scope.file = '';
  };
}]);