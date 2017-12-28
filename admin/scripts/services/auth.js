angular.module('app').factory('auth',['$http','USER',function($http,USER){

	return {
	  	setToken:function (data) {
	    	sessionStorage.setItem(USER.user_token, data);
	  	},
	  	getToken:function(){
	  		return sessionStorage.getItem(USER.user_token)
	  	},
	  	authenticated:function () {
		    var t = sessionStorage.getItem(USER.user_token)
		    return t && t.length > 0
	  	},
	  	logout:function() {
		    sessionStorage.removeItem(USER.user_token)
		}
	}
	
}])