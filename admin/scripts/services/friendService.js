angular.module('app').factory('friendService',['$http','$q',function($http,$q){

	function handelRequest(method,url,data){
		var config={
			method:method,
			url:url
		};
		if(method==="POST"||method==="PUT"){
			config.data=data;
		}else{
			config.params=data;
		}
		
		return $http(config);		
	}
	
	
	return {
		list:function(params){			
			return handelRequest("GET","/api/friends",params);
		},
		add:function(data){
			return handelRequest("POST","/api/friends",data);
		},
		update:function(id,data){
			return handelRequest("PUT","/api/friends/"+id,data);
		},
		remove:function(id){
			return handelRequest("DELETE","/api/friends/"+id);
		},
	}
	
}])