angular.module('angular')

.controller('MemberDetailsController', ['$scope', '$http', function ($scope, $http){
  $http.get('/memberdetails').success(function (data){
    $scope.memberdetails = data;
  });
}]);
