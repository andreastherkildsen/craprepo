angular.module('postModule', [])

.controller('postCtrl', function($scope){
	$scope.posts = postService.query();
	$scope.newPost = {created_by: '', title: '', desc: '', tags: '', created_at: ''};

	$scope.post = function() {
		$scope.newPost.created_by = $rootScope.current_user;
		$scope.newPost.created_at = Date.now();
			postService.save($scope.newPost, function(){
				$scope.posts = postService.query();
				$scope.newPost = {created_by: '', title: '', desc: '', tags: '', created_at: ''};
			});
	};

});