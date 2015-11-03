angular.module('memberModule', [])

	.controller('MemberAddController', ['$scope', '$localStorage', function($scope, $localStorage){
		if ($localStorage.members === undefined) {
  			var members = [
				{
					firstName: 'Dann',
					lastName: 'Bos',
					email: 'dannbos@hotmail.com',
					phone: '60452216',
					password: '1234'
				},
				{
					firstName: 'John',
					lastName: 'Doe',
					email: 'J_Doe@nowhere.com',
					phone: '88888888',
					password: '1234'
				}
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

	.controller('AddPostController', ['$scope', '$localStorage', function($scope, $localStorage){
		$scope.member = $localStorage.members[2];

		/*Jeg kan ikke få fat i filnavnet... Tanken var at gemme billedet i en mappe og så gemme navnet i localstorage og så sætte det sammen til sidst, når posten skal vises*/
		$scope.addPost = function(){
			var post = {
				fileName : $scope.uploadFile.value
			}
			console.log(post.fileName);
		};
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

