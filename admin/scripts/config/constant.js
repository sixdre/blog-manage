angular.module('app').constant('AUTH_EVENTS', {
	loginSuccess: 'login-success',
	loginFailed: 'login-failed',
	logoutSuccess: 'logout-success',
	sessionTimeout: 'session-timeout',
	notAuthenticated: 'not-authenticated',		//没有生效，不真实
	notAuthorized: 'not-authorized'			//没有授权
})
.constant('USER', {
	user_name: "USER_NAME", //存储到cookie中的登录用户用户名
	user_id: "USER_ID", //存储到cookie中的登录用户id键值
	user_token:"USER_TOKEN"
})
.constant('cgBusyDefaults',{		//loading 配置
	message:'努力加载中...',
//	minDuration:1000000,
	templateUrl: '/admin/views/blocks/loading.html',
//	wrapperClass: 'my-class my-class2'
})
