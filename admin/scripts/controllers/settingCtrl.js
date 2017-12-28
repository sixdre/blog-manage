angular.module('app').controller('settingCtrl',
		['$scope','defPopService','alertService','apiService',
		 	function($scope,defPopService,alertService,apiService){
	
	/*
	 * addbanner 添加banner
	 */
	$scope.addbanner=function(){
		var formData = new FormData($("#banner_form")[0]);
		apiService.createBanner(formData).then(function(res){
			var data=res.data;
			if(data.code>0){
				alertService.success('添加成功!').then(function(){
					
				})
			}else{
				alertService.error(data.message).then(function(){
					
				})
			}
		}).catch(function(err){
			
		})
	};
	
}])

