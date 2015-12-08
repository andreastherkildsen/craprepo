angular.module('postServiceModule', [])

.factory('postService', function($resource){
	return $resource('/api/posts/:id', null, {
		'update': {method:'PUT'}
	});
})