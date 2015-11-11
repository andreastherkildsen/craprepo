angular.module('memberModule', [])

	.controller('MemberAddController', ['$scope', '$localStorage', function($scope, $localStorage){
		if ($localStorage.members == null) {
  			var members = [
				// {
				// 	firstName: 'Dann',
				// 	lastName: 'Bos',
				// 	email: 'dannbos@hotmail.com',
				// 	phone: '60452216',
				// 	password: '1234'
				// },
				// {
				// 	firstName: 'John',
				// 	lastName: 'Doe',
				// 	email: 'J_Doe@nowhere.com',
				// 	phone: '88888888',
				// 	password: '1234'
				// }
			];

			$localStorage.members = members;
		}

		$scope.addMember = function(){
			var newMember = {
				firstName: $scope.firstName,
				lastName: $scope.lastName,
				email: $scope.email,
				phone: $scope.phone,
				password: $scope.password
			}
			$localStorage.members.push(newMember);
		};

		console.log($localStorage.members);
	}])

/*
   .controller('MemberController', ['$scope', '$http', function ($scope, $http){
   	$http.get('./member').success(function (data){
   		$scope.member = data;
   	});
   }])

   .controller('MemberDetailsController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
	   $http.get('./member/'+$routeParams.id).success(function (data){
		$scope.member = data;
		});
   }])

   .controller('MemberDetailsController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
   	$scope.addMember = function(){
   		$http.get('/memberdetails').success(function (data){
   			var name = member.name; 
   			var email = member.email; 

   			var newMember = {
   				name: $scope.name,
   				emai: $scope.email
   			}

   			$http.post('./member', newMember).success(function (newMember, status){
   				console.log(newMember);
   				console.log(status);
   				console.log(newMember._id);
   			});
   		});
   	};
   }]);
*/

