angular.module('postModule', [])

.controller('postCtrl', function(postService, $scope, multipartForm, $rootScope, $geolocation){

	// Get position
  	$geolocation.getCurrentPosition({
    	timeout: 60000
  	}).then(function(position) {
    	// make "position" available outside by assigning it's value to "myPosition"
		$scope.myPosition = position;
  	});

	$scope.posts = postService.query();
	$scope.newPost = {};

	$scope.post = function() {
		var file = $scope.newPost.file;
		var uploadUrl = '/posts';		
		$scope.newPost.created_by = $rootScope.current_user.user.username;
		$scope.newPost.created_at = Date.now();
		$scope.newPost.latitude = $scope.myPosition.coords.latitude;
		$scope.newPost.longitude = $scope.myPosition.coords.longitude;
		multipartForm.post(uploadUrl, $scope.newPost);
		
		postService.save($scope.newPost, function(){
			$scope.posts = postService.query();
			$scope.newPost = {created_by: '', title: '', desc: '', tags: '', created_at: '', latitude: '', longitude: ''};
		});

	};
});