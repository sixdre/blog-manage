'use strict';
/*main Controllers */
angular.module('app').controller('AppCtrl', 
	['$rootScope', '$scope', '$location','$cookies','$localStorage', '$window',
	'$http', '$state', '$uibModal','DataService', 'SETTINGS','AUTH_EVENTS','USER','apiService',
		function($rootScope, $scope,$location,$cookies, $localStorage, 
			$window, $http, $state, $uibModal,DataService, SETTINGS,AUTH_EVENTS,USER,apiService) {
			var Manager=$rootScope.Manager={};
			
			//向后台请求主页面要展示的数据（文章总数，未读留言）
			function getUserInfo(){
				apiService.getUserInfo().then(function(res) {
					DataService.ArticleTotal=res.data.articleTotal;
					DataService.Words=res.data.words;
					DataService.Categorys=res.data.categorys;
					DataService.Tags=res.data.tags;
					$rootScope.CommonData=DataService;
				}).catch(function(err) {
	
				})
			}
			//如果是登陆页面或者注册页面,不做请求数据处理
			if($location.path().indexOf('signin')>-1||$location.path().indexOf('signup')>-1){
				
			}else{
				getUserInfo();
			}
			

			//管理员
			Manager.name=$cookies.get(USER.user_name);
			
			//登陆成功
			$scope.$on(AUTH_EVENTS.loginSuccess,function(event,data){
//				alert('欢迎您回来');
				Manager.name=$cookies.get(USER.user_name);
				getUserInfo();
			})
			
			//用户验证失败
			$scope.$on(AUTH_EVENTS.notAuthorized,function(event,data){
				$state.go('access.signin');
			})

			//用户验证失败
			$scope.$on(AUTH_EVENTS.notAuthenticated,function(event,data){
				$state.go('access.signin');
			})

			//退出登录
			$scope.logout = function() {
				$cookies.remove(USER.user_name);
				$state.go("access.signin");
			}

			//留言回复
			$scope.reply = function(item) {
				$uibModal.open({
					templateUrl: '/admin/views/modal/wordModal.html',
					size: 'md',
					controller: 'WordModalInstanceCtrl',
					resolve: {
						wordItem: function() {
							return item;
						}
					}
				}).result.then(function(data) {
					if(data.code == 1) {
						//http://blog.csdn.net/u013415189/article/details/51451431
					}
				},function(){
					
				})
			}
			
			
			//网站布局设置
			$scope.app = SETTINGS;

			// save settings to local storage
			if(angular.isDefined($localStorage.settings)) {
				$scope.app.settings = $localStorage.settings;
			} else {
				$localStorage.settings = $scope.app.settings;
			}
			$scope.$watch('app.settings', function() {
				if($scope.app.settings.asideDock && $scope.app.settings.asideFixed) {
					// aside dock and fixed must set the header fixed.
					$scope.app.settings.headerFixed = true;
				}
				// save to local storage
				$localStorage.settings = $scope.app.settings;
			}, true);

		}
	]);