angular.module('postIdModule', [])

.controller('postDetailsCtrl', function(postService, $resource, $http, $scope, $rootScope, $geolocation, $stateParams, $location){
	
	$http.get('/api/posts/'+$stateParams.id).success(function(data){
		$scope.post = data;
	});

	$scope.posts = postService.query();
		$scope.PostComment = function(){
			var post = {};
			post.id = $scope.post._id;
			post.title = $scope.post.title;
			post.desc = $scope.post.desc;
			post.tags = $scope.post.tags;
			post.latitude = $scope.post.latitude;
			post.longitude = $scope.post.longitude;
			post.created_by = $scope.post.created_by;
			post.created_at = $scope.post.created_at;
			
			if(post.comments == null) {		
				post.comments = [];	
			}
			
			post.comments.push({
				comment : $scope.newComment.comment,
				created_by : $rootScope.current_user.user.username,
				created_at : Date.now()
			});
			
			console.log(post);

			$http.put('/api/posts/'+$stateParams.id, post).success(function(data, status){
				console.log(status);
				$scope.post = postService.query();
			});
		};
})
