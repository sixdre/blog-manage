angular.module('app').controller('userCtrl',
		['$scope','defPopService','alertService','apiService',
		 	function($scope,defPopService,alertService,apiService){
		 		
		 		
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
		apiService.getUsers().then(function(res){
			$scope.Users=res.data.users;
			$scope.totalServerItems=res.data.users.length;
		}).catch(function(err){
			
		})
	}
	getUsers();
	

	
	
	
}])

