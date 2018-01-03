angular.module('app').controller('userCtrl',
		['$scope','defPopService','alertService','apiService',
		 	function($scope,defPopService,alertService,apiService){
		 		
		 		
    $scope.pagingOptions = {
        pageSizes: [2, 5, 10],
        pageSize: 2,
        currentPage: 1
     };  
	/*
	 * getUsers 获取用户列表
	 */
	function getUsers(){
		apiService.getUsers().then(function(res){
			$scope.users=res.data.data;
		}).catch(function(err){
			
		})
	}
	getUsers();
	

	
	
	
}])

