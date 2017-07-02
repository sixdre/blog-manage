angular.module('app').controller('userCtrl',
		['$scope','defPopService','alertService','userService',
		 	function($scope,defPopService,alertService,userService){
		 		
		 		
	$scope.totalServerItems = 0;
     $scope.pagingOptions = {
        pageSizes: [2, 5, 10],
        pageSize: 2,
        currentPage: 1
     };  
	/*
	 * getUsers 获取用户
	 */
	function getUsers(){
		userService.getUsers().then(function(res){
			$scope.Users=res.data.users;
			$scope.totalServerItems=res.data.users.length;
		}).catch(function(err){
			
		})
	}
	getUsers();
	

	
	
	
}])

