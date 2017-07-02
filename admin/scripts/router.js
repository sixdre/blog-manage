app.config(['$stateProvider','$urlRouterProvider','$locationProvider',
		function($stateProvider, $urlRouterProvider,$locationProvider) {
			$locationProvider.hashPrefix('');  //处理地址栏中的!问题
			
			$urlRouterProvider.when("", "app/article/publish");
			$urlRouterProvider
				.otherwise('/access/404');
			$stateProvider
				.state('app', {
					abstract: true,
					url: '/app',
					templateUrl: '/admin/views/blocks/app.html'
				})
				.state('app.dashboard', {
					url: '/dashboard',
					templateUrl: '/admin/views/dashboard.html',
					/*onEnter:function($rootScope){
					
					},
					onExit:function(){
						console.log(2);
					}*/
					/*controllerProvider :function($rootScope){
						if($rootScope.$state.isLogin == false){
		                    $rootScope.$state.go('access.signin');
		                }
		                return function(){};
					}*/
				})
				.state('app.article', {
					abstract: true,
					url: '/article',
					template: '<div ui-view class="fade-in-up"></div>'				
				})
				.state('app.article.publish', {					
					url: '/publish?id',
					templateUrl: '/admin/views/article/publish.html',
					controller:'articlePublishCtrl',
				})
				.state('app.article.list', {					
					url: '/list/:page',
					templateUrl: '/admin/views/article/list.html',
					controller:"articleListCtrl"
				})
				.state("app.friend",{
					url:"/friend",
					templateUrl:'/admin/views/indep/friends.html',
					controller:"friendCtrl"
				})
				.state("app.catetag",{
					url:"/catetag",
					templateUrl:'/admin/views/indep/cate_tag.html',
					controller:'CateTagCtrl'
				})
				.state("app.users",{
					url:"/users",
					templateUrl:'/admin/views/indep/users.html',
					controller:'userCtrl'
				})
				.state("app.file",{
					url:"/file",
					templateUrl:'/admin/views/indep/file.html',
					controller:'fileCtrl'
				})
				.state('app.setting', {
					abstract: true,
					url: '/setting',
					template: '<div ui-view class="fade-in-up"></div>'
				})
				.state('app.setting.banner', {
					url: '/banner',
					templateUrl: '/admin/views/setting/banner.html'
				})
				.state('app.setting.banner.add', {
					url: '/banner_add',
					templateUrl: '/admin/views/setting/banner_add.html'
				})
				.state('app.setting.banner.list', {
					url: '/banner_list',
					templateUrl: '/admin/views/setting/banner_list.html'
				})
				.state('access', {
	                  url: '/access',
	                  template: '<div ui-view class="fade-in-right-big smooth"></div>'
	             })
	             .state('access.signin', {
	            	 url: '/signin',
	                  templateUrl: '/admin/views/signin.html'
	             })
	             .state('access.signup', {
	            	 url: '/signup',
	                  templateUrl: '/admin/views/signup.html'
	             })
				.state('access.404', {
	                  url: '/404',
	                  templateUrl: '/admin/views/404.html'
	             })
				
		}
	]);