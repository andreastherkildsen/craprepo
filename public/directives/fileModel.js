angular.module('fileModelD', [])

.directive('fileModelDirective', ['$parse', function($parse){

	return{
		restrict: 'A', //A for attribute
		link: function(scope, element, attrs){
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;

			element.bind('change', function(){
				scope.$apply(function(){
					modelSetter(scope, element[0].files[0]);
				})
			})
		}
	}
}]);