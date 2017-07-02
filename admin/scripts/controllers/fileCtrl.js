angular.module('app').controller('fileCtrl',
		['$scope','Upload','defPopService','alertService','fileService',
		 	function($scope,Upload,defPopService,alertService,fileService){
	
	$scope.isUploadStatus=false;		//判断是否是上传状态
	/*
	 * getAllFiles 获取所有文件列表
	 */
	function getAllFiles(){
		fileService.getAllFiles().then(function(res){
			$scope.files=res.data.files;
		}).catch(function(err){
			
		})
	}
	getAllFiles();
	
	$scope.uploadFile=function(){
		if(!$scope.file){
			alertService.error('请选择文件');
			return ;
		}
		$scope.isUploadStatus=true;
		fileService.uploadFile($scope.file).then(function(res) {
			$scope.isUploadStatus=false;
			if(res.data.code==1){
				alertService.success(res.data.message);
			}else{
				alertService.error(res.data.message);
			}
			$scope.progress=0;
		}, function(resp) {
			$scope.isUploadStatus=false;
			defPopService.defPop({
				status: 0,
				content: "出错了！"
			});
		}, function(evt) {
			$scope.progress=parseInt(100.0 * evt.loaded / evt.total);
			console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total) + '% file :');
		});
	}
	
	
}])

