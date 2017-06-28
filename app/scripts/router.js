app.config(
		function($stateProvider, $urlRouterProvider,$locationProvider) {
			$locationProvider.hashPrefix('');  //处理地址栏中的!问题
			
			$urlRouterProvider.when("", "app/article/publish");
			$urlRouterProvider
				.otherwise('/access/404');
			$stateProvider
				.state('app', {
					abstract: true,
					url: '/app',
					templateUrl: '/views/blocks/app.html'
				})
				.state('app.dashboard', {
					url: '/dashboard',
					templateUrl: '/views/dashboard.html',
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
					template: '<div ui-view class="fade-in-up"></div>',			//new
					resolve: {
	                      deps: ['uiLoad',
	                        function( uiLoad){
	                          return uiLoad.load([
	                              	'/scripts/services/articleService.js',
									'/scripts/controllers/articleCtrl.js'
	                          ]);
	                      }]
		            }
//					resolve: {
//	                      deps: ['$ocLazyLoad',
//	                        function( $ocLazyLoad ){
//	                          return $ocLazyLoad.load(['ui.select']).then(
//	                              function(){
//	                                  return $ocLazyLoad.load([
//											'/scripts/services/articleService.js',
//											'/scripts/controllers/articleCtrl.js'
//	                                  ]);
//	                              }
//	                          );
//	                      }]
//	                  }					
				})
				.state('app.article.publish', {					//new
					url: '/publish?id',
					templateUrl: '/views/article/publish.html',
					controller:'articlePublishCtrl',
				})
				.state('app.article.list', {					//new
					url: '/list/:page',
					templateUrl: '/views/article/list.html',
					controller:"articleListCtrl"
				})
				.state('app.article.search', {
					url: '/search',
					templateUrl: '/views/article/search.html',
					controller:'articleSearchCtrl'
				})
				.state("app.friend",{
					url:"/friend",
					templateUrl:'/views/indep/friends.html',
					controller:"friendCtrl",
					resolve: {
	                      deps: ['uiLoad',
	                        function( uiLoad){
	                          return uiLoad.load([
	                                '/scripts/services/friendService.js',
	                                '/scripts/controllers/friendCtrl.js'
	                          ]);
	                      }]
		            }
				})
				.state("app.catetag",{
					url:"/catetag",
					templateUrl:'/views/indep/cate_tag.html',
					controller:'CateTagCtrl',
					resolve: {
                      deps: ['uiLoad',
                        function( uiLoad){
                          return uiLoad.load([
                                '/scripts/services/cate_tagService.js',
                                '/scripts/controllers/cate_tagCtrl.js'
                          ]);
                      }]
	                },
				})
				.state("app.users",{
					url:"/users",
					templateUrl:'/views/indep/users.html',
					controller:'userCtrl',
					resolve: {
	                      deps: ['uiLoad',
	                        function( uiLoad){
	                          return uiLoad.load([
	                                '/scripts/services/userService.js',
	                                '/scripts/controllers/userCtrl.js'
	                          ]);
	                      }]
	                },
				})
				.state("app.file",{
					url:"/file",
					templateUrl:'/views/indep/file.html',
					controller:'fileCtrl',
					resolve: {
	                      deps: ['uiLoad',
	                        function( uiLoad){
	                          return uiLoad.load([
	                                '/scripts/services/fileService.js',
	                                '/scripts/controllers/fileCtrl.js'
	                          ]);
	                      }]
	                },
				})
				.state('app.setting', {
					abstract: true,
					url: '/setting',
					template: '<div ui-view class="fade-in-up"></div>',
					resolve: {
	                      deps: ['uiLoad',
	                        function( uiLoad){
	                          return uiLoad.load([
	                                '/scripts/services/settingService.js',
	                                '/scripts/controllers/settingCtrl.js'
	                          ]);
	                      }]
		                },
				})
				.state('app.setting.banner', {
					url: '/banner',
					templateUrl: '/views/setting/banner.html'
				})
				.state('app.setting.banner.add', {
					url: '/banner_add',
					templateUrl: '/views/setting/banner_add.html'
				})
				.state('app.setting.banner.list', {
					url: '/banner_list',
					templateUrl: '/views/setting/banner_list.html'
				})
				.state('access', {
	                  url: '/access',
	                  template: '<div ui-view class="fade-in-right-big smooth"></div>'
	             })
	             .state('access.signin', {
	            	 url: '/signin',
	                  templateUrl: '/views/signin.html',
	                  resolve: {
	                      deps: ['uiLoad',
	                        function( uiLoad ){
	                          return uiLoad.load( ['/scripts/controllers/signin.js'] );
	                      }]
	                  }
	             })
	             .state('access.signup', {
	            	 url: '/signup',
	                  templateUrl: '/views/signup.html',
	                  resolve: {
	                      deps: ['uiLoad',
	                        function( uiLoad ){
	                          return uiLoad.load( ['/scripts/controllers/signup.js'] );
	                      }]
	                  }
	             })
				.state('access.404', {
	                  url: '/404',
	                  templateUrl: '/views/404.html'
	             })
				
		}
	);