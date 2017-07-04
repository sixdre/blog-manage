angular.module('app').factory('catetagService',['$http','$q',function($http,$q){

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

	var api={
		category:{
			list:function(params){
				return handelRequest("GET",'/api/categories',params);
			},
			add:function(data){
				return handelRequest("POST",'/api/categories',data);
			},
			update:function(id,data){
				return handelRequest("PUT",'/api/categories/'+id,data);
			},
			remove:function(id){
				return handelRequest("DELETE",'/api/categories/'+id);
			}
			
		},
		tag:{
			list:function(){
				return handelRequest("GET",'/api/tags');
			},
			add:function(data){
				return handelRequest("POST",'/api/tags',data);
			},
			update:function(id,data){
				return handelRequest("PUT",'/api/tags/'+id,data);
			},
			remove:function(id){
				return handelRequest("DELETE",'/api/tags/'+id);
			}
		}
	}
	
	return api;
	
}])