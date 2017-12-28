'use strict';
/* Controllers */
// signin controller
app.controller('SigninFormController', 
["$rootScope", '$scope','$cookies', '$http', '$state','USER','AUTH_EVENTS','auth',
function($rootScope, $scope,$cookies,$http, $state,USER,AUTH_EVENTS,auth) {
	$scope.user = {};
	$scope.authError = null; //错误信息
	var expireDate = new Date();
    expireDate.setMinutes(expireDate.getMinutes()+10*6);		//一小时
	$scope.login = function() {
		$http.post('/api/admin_login', { 
			username: $scope.user.username, 
			password: $scope.user.password })
			.then(function(res) {
				var code = res.data.code;
				var message=res.data.message;
				var token = res.data.token;
				if(code==1){
					$cookies.put(USER.user_name,$scope.user.username,{'expires': expireDate});
					auth.setToken(token)
					$scope.$emit(AUTH_EVENTS.loginSuccess,'登陆成功');
					$state.go('app.article.list');
				}else{
					$scope.authError = message;
				}
			}, function(err) {
				$scope.authError = 'Server Error';
			});
	};
}]);