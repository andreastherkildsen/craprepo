angular.module('postIdModule', [])

.controller('postDetailsCtrl', function(postService, commentService, $resource, $http, $scope, $rootScope, $geolocation, $stateParams){
	$http.get('/api/posts/'+$stateParams.id).success(function(data){
		$scope.post = data;
		$scope.comments = data;
	})


	$scope.post = postService.query();
	$scope.newComment = {};
	$scope.PostComment = function(data){
		$scope.newComment.created_by = $rootScope.current_user.user.username;
		$scope.newComment.created_at = Date.now();

		postService.save($scope.newComment, function(){
			$scope.comments = commentService.query();
			$scope.newComment = {created_by: '', comment: ''};
		});

		console.log($scope.comments);
	};
})
