angular.module('postModule', [])

.controller('postCtrl', function(postService, $scope, $rootScope, $geolocation){

	// Get position
  	$geolocation.getCurrentPosition({
    	timeout: 60000
  	}).then(function(position) {
    	// make "position" available outside by assigning it's value to "myPosition"
		$scope.myPosition = position;
  	});

	$scope.posts = postService.query();
	$scope.newPost = {created_by: '', title: '', desc: '', tags: '', created_at: '', latitude: '', longitude: ''};

	$scope.post = function() {
		$scope.newPost.created_by = $rootScope.current_user.user.username;
		$scope.newPost.created_at = Date.now();
		$scope.newPost.latitude = $scope.myPosition.coords.latitude;
		$scope.newPost.longitude = $scope.myPosition.coords.longitude;
		
		postService.save($scope.newPost, function(){
			$scope.posts = postService.query();
			$scope.newPost = {created_by: '', title: '', desc: '', tags: '', created_at: '', latitude: '', longitude: ''};
		});
	};

	$scope.getUser = function() {
		console.log($rootScope.current_user);
	};
});