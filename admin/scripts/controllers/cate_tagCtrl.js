angular.module('app')
	.controller('CateTagCtrl',
			['$rootScope','$scope','$timeout','$window','defPopService',
			'alertService','apiService','toolService','DataService',
   function($rootScope,$scope,$timeout,$window,defPopService,alertService,apiService,toolService,DataService){
	
	
	$scope.iscNew=true;   //判断类型是更新还是添加
	$scope.istNew=true;   //判断标签是更新还是添加

	//获取类型列表
	function getCategorys(){
		apiService.getCategories().then(function(res){
			if(res.data.code==1){
				DataService.Categorys=res.data.data;
			}else{
				defPopService.defPop({
					status:0,
					content:res.data.message
				});
			}
		}).catch(function(){
			defPopService.defPop({
				status:0,
				content:'服务器错误'
			});
		});
	}
	getCategorys();
	
	//获取类型列表
	function getTags(){
		apiService.getTags().then(function(res){
			if(res.data.code==1){
				DataService.Tags=res.data.data;
			}else{
				defPopService.defPop({
					status:0,
					content:res.data.message
				});
			}
		}).catch(function(){
			defPopService.defPop({
				status:0,
				content:'服务器错误'
			});
		})
	}
	getTags();
	
	//修改
	$scope.revise=function(type,data){
		var data=angular.copy(data);		//用copy可解决数据修改同时列表数据发生改变问题
		if(type=="category"){
			$scope.category=data;
			$scope.iscNew=false;
		}else if(type="tag"){
			$scope.tag=data;
			$scope.istNew=false;
		}
	}

	
	//添加分类
	$scope.addCategory=function(){
		apiService.createCategory($scope.category).then(function(res){
			if(res.data.code==1){
				defPopService.defPop({
					status:1,
					content:res.data.message,
					callback:function(){
						getCategorys()
//						DataService.Categorys.push(res.data.category);
						$scope.category={};
					}
				});
			}else{
				defPopService.defPop({
					status:0,
					content:res.data.message
				});
			}
		}).catch(function(){
			defPopService.defPop({
				status:0,
				content:'服务器错误'
			});
		});
	}
	//更新分类
	$scope.updateCategory=function(){
		apiService.updateCategory($scope.category._id,$scope.category).then(function(res){
			if(res.data.code==1){
				defPopService.defPop({
					status:1,
					content:res.data.message,
					callback:function(){
						$scope.iscNew=true;
						getCategorys();
						$scope.category={};
					}
				});
			}else{
				defPopService.defPop({
					status:0,
					content:res.data.message
				});
			}
		}).catch(function(){
			defPopService.defPop({
				status:0,
				content:'服务器错误'
			});
		});
	}
	//删除分类
	$scope.removeCategory=function(item){
		alertService.confirm().then(function(){
			apiService.removeCategory(item._id).then(function(res){
				if(res.data.code==1){
					alertService.success(res.data.message);
					DataService.Categorys.splice(DataService.Categorys.indexOf(item), 1);
				}
			}).catch(function(){
				defPopService.defPop({
					status:0,
					content:'服务器错误'
				});
			});
		});
	}
	
	//添加标签
	$scope.addTag=function(){
		apiService.createTag($scope.tag).then(function(res){
			if(res.data.code==1){
				defPopService.defPop({
					status:1,
					content:"添加成功",
					callback:function(){
						//DataService.Tags.push(res.data.tag);
						getTags();
						$scope.tag={};
					}
				});
			}else{
				defPopService.defPop({
					status:0,
					content:res.data.message
				});
			}
		}).catch(function(){
			defPopService.defPop({
				status:0,
				content:'服务器错误'
			});
		});
	}
	
	//更新标签
	$scope.updateTag=function(){
		apiService.updateTag($scope.tag._id,$scope.tag).then(function(res){
			if(res.data.code==1){
				defPopService.defPop({
					status:1,
					content:"更新成功",
					callback:function(){
						$scope.istNew=true;
						getTags();
						$scope.tag={};
					}
				});
			}else{
				defPopService.defPop({
					status:0,
					content:res.data.message
				});
			}
		}).catch(function(){
			defPopService.defPop({
				status:0,
				content:'服务器错误'
			});
		});
	}
	//删除标签
	$scope.removeTag=function(item){
		alertService.confirm().then(function(){
			apiService.removeTag(item._id).then(function(res){
				if(res.data.code==1){
					alertService.success('删除成功');
					DataService.Tags.splice(DataService.Tags.indexOf(item), 1);
				}
			}).catch(function(){
				defPopService.defPop({
					status:0,
					content:'服务器错误'
				});
			});
		});
	}

	//取消
	$scope.cancel=function(type){
		if(type=="category"){
			$scope.iscNew = true;  
            $scope.category={};
		}else if(type=="tag"){
			$scope.istNew=true;
			$scope.tag={};
		}
	}
	
}]);