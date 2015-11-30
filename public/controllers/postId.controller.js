angular.module('postIdModule', [])

.controller('postIdCtrl', function(postService, $resource, $http, $scope, $rootScope, $geolocation){
	var postId = $resource.postId;
	$http.get('/api/posts/:id').success(function(data){
		$scope.post = $filter('filter')(data, function(d){
			return d.id == postId;
		})[0];
})

});