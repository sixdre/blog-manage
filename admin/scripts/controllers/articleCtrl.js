"use strict";
var uetrue = null;
/*
 * 文章发布控制器
 */
app.controller('articlePublishCtrl', ['$rootScope', '$scope','$state', "$stateParams",'$localStorage',
				'$timeout', '$interval',"defPopService", "alertService", 'DataService','apiService',
	function($rootScope, $scope,$state, $stateParams,$localStorage,$timeout,$interval,
		defPopService, alertService, DataService,apiService) {
		
		if(uetrue) {
			uetrue.destroy();
		}
		uetrue = UE.getEditor('editor', {
			initialFrameHeight: 300 //高度设置
		});
		
		
		$scope.article = {};
		$scope.clearArticle = function() { //注在请求中不要调用此方法,angular会自动脏数据检查
			$scope.$apply(function() {
				$scope.article = {};
			});
		}
		
//		$interval(function(){
//			console.log($localStorage.article_content);
//			$localStorage.article_content=UE.getEditor('editor').getContent();
//		},5000)
		
		
		if($stateParams.id){
			apiService.getArticleById($stateParams.id).then(function(res){
				if(res.data.code==1){
					$scope.isUpdate=true;
					$scope.article=res.data.article;
					if($scope.article.img && $scope.article.img.length) {
						$scope.haveImg = true;
					}
					uetrue.addListener("ready", function() {
						uetrue.setContent($scope.article.tagcontent);
					});
				}
			}).catch(function(err){
				defPopService.defPop({
					status: 0,
					content: "获取文章数据出错！",
					callback:function(){
						$state.go('app.article.list')
					}
				});
				
			})
		}
		
		//文章更新
		$scope.update = function() {
			if($scope.article.tags.length > 3) {
				return defPopService.defPop({
					status: 0,
					content: "标签最多只能添加3个！"
				})
			}
			var article = angular.copy($scope.article);
			if($scope.isFormal) {
				article.status  = 2;
			}
			article.tagcontent = UE.getEditor('editor').getContent();
			article.content = UE.getEditor('editor').getContentTxt();


			apiService.updateArticle(article._id,{
				cover: $scope.file,
				article: article
			}).then(function(res) {
				if(res.data.code ==1) {
					alertService.success('更新成功').then(function(){
						$state.go('app.article.list');
					})
				}else{
					alertService.error(res.data.message);
				}
			}, function(resp) {
				alertService.error('更新失败!');
			}, function(evt) {
				//console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total) + '% file :'+ evt.config.file.name);
			});
		};
		
		
		//发表新文章
		$scope.publish = function(state) {
			if($scope.article_form.$invalid) {
				defPopService.defPop({
					status: 0,
					content: "请检查输入内容！"
				});
				return;
			}
			var article = angular.copy($scope.article);
			article.content=UE.getEditor('editor').getContentTxt();
			article.tagcontent=UE.getEditor('editor').getContent();
			

			if(!article.content.trim().length) {
				return defPopService.defPop({
					status: 0,
					content: "请输入文章内容！"
				});
			}
			if(state && state == "draft") { //存为草稿
				article.isDraft = true; //为草稿
			}
			apiService.createArticle({
				cover: $scope.file,
				article: article
			}).then(function(res) {
				if(res.data.code ==1) {
					alertService.success(res.data.message);
					DataService.ArticleTotal += 1;
					$scope.article = {};
					$scope.file = null;
				}else{
					alertService.error(res.data.message);
				}
			}, function(resp) {
				defPopService.defPop({
					status: 0,
					content: "出错了！"
				});
			}, function(evt) {
				
			});
		}
	}
])

/*
 * 文章列表管理控制器
 */
app.controller('articleListCtrl', ['$rootScope', '$scope','$state', '$stateParams',
	'$http', '$log', '$uibModal', 
	'defPopService', 'alertService', 'toolService', 'DataService','apiService',
	function($rootScope, $scope,$state, $stateParams,
		$http, $log, $uibModal,
		defPopService, alertService, toolService, DataService,apiService) {

		var page = $stateParams.page;
		if(page == ""||page==undefined) {
			page = 1;
		} else {
			page = parseInt(page);
		}
		
		//分页配置参数
		$scope.pageConfig = {
			maxSize: 5, 	//分页页数
			limit: 5, 		//每页显示的文章数
			pageSizes: [5, 10, 20], //每页显示的文章数量下拉列表
			totalItems: DataService.ArticleTotal, //文章总数
			page: page, //当前页
		};
		$scope.checkedIds = []; //id组用来存放选中的文章id

		$scope.flag = 3;

		//分页加载数据
		$scope.loadData = function() {

			var queryParams = {
				page: $scope.pageConfig.page,
				limit: $scope.pageConfig.limit,
				title: $scope.title,
				flag: $scope.flag
			}
			$scope.ArticlePromise=apiService.getArticles(queryParams).then(function(res) {
				$scope.articleList = res.data.articles; //文章列表
				$scope.pageConfig.totalItems = res.data.total;
				$scope.StartNum = ($scope.pageConfig.page - 1) * $scope.pageConfig.limit + 1;
				var End = $scope.pageConfig.page * $scope.pageConfig.limit;
				$scope.EndNum = End < $scope.pageConfig.totalItems ? End : $scope.pageConfig.totalItems;

			}).catch(function(err) {
				defPopService.defPop({
					status: 0,
					content: "服务器错误！"
				});
			})
		};
		//初始化
		$scope.loadData();

		//根据标题查询
		$scope.queryByTitle = function() {
			$scope.pageConfig.page = 1;
			$scope.loadData();
		}

		//检测类型，发生改变重新加载数据
		$scope.$watch('flag', function(newVal, oldVal) {
			if(newVal !== oldVal) {
				$scope.pageConfig.page = 1;
				$scope.loadData();
			}
		})

		//检测文章列表数据
		$scope.$watch('articleList', function(newVal, oldVal) {
			if(newVal !== oldVal) {
				$scope.select_all = false;
				$scope.checkedIds = [];
			}
		})

		//检测下拉文章列表数
		$scope.$watch('pageConfig.limit', function(newVal, oldVal) {
			if(newVal !== oldVal) {
				$scope.loadData();
			}
		})

		//文章全选操作
		$scope.selectAll = function(allCheck) {
			if(allCheck == true) { //全选
				angular.forEach($scope.articleList, function(value) {
					if($scope.checkedIds.indexOf(value._id) == -1) {
						$scope.checkedIds.push(value._id);
					}
				});
			} else { //取消全选
				$scope.checkedIds = [];
			}
		}
		//单选
		$scope.selectOne = function(id) {
			toolService.addSelect($scope.checkedIds, id);
		}
		

		
		//删除文章
		$scope.remove = function(ids){
			alertService.confirm().then(function() {
				apiService.removeArticle(ids).then(function(res) {
					if(res.data.code > 0) {
						alertService.success('删除成功');
						$scope.loadData();
					}
				}).catch(function(err) {
					console.log(err);
					defPopService.defPop({
						status: 0,
						content: "删除失败服务器错误！"
					});
				});
			}, function() {
				
			})
		}
		
		//图标点击删除 单个删除
		$scope.removeOne = function(id) {
			$scope.remove(id)
		};

		//多选或单选删除
		$scope.removeMulti = function() {
			if($scope.checkedIds.length == 0) {
				return defPopService.defPop({
					status: 0,
					content: "请选择要删除的文章！"
				});
			}
			var ids = $scope.checkedIds.toString();
			$scope.remove(ids);
		}


		$scope.edit = function(item) {
			$state.go('app.article.publish',{id:item._id});
		}

	}
])
