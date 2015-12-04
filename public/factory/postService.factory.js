angular.module('postServiceModule', [])

.factory('postService', function($resource){
	return $resource('/api/posts/:id');
})

.factory('commentService', function($resource){
	return $resource('/api/comments/:id');
});