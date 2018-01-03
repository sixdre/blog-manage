angular.module('app').factory('apiService',['$http','Upload',function($http,Upload){
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
	var api = {
		//登录
		login:function(username,password) {
			return handelRequest("POST",'/api/admin_login',{username:username,password:password});
		},
		//注册
		regist:function(username,email,password) {
			return handelRequest("POST",'/api/admin_regist',{username:username,email:email,password:password});
		},
		//获取登录用户信息
		getUserInfo:function() {
			return handelRequest("GET",'/api/userInfo');
		},
		/*获取文章*/
		getArticles:function(params){
			return handelRequest("GET",'/api/articles',params);
		},
		//发布文章
		createArticle:function(data){
			return Upload.upload({
				url: '/api/articles',
				data: data
			})
		},
		//更新文章
		updateArticle:function(id,data){
			return Upload.upload({
				url: '/api/articles/'+id,
				method:"PUT",
				data:data
			})
		},
		//删除文章
		removeArticle:function(ids){		
			return handelRequest("DELETE",'/api/articles/'+ids);
		},
		//根据id获取文章
		getArticleById:function(id){
			return handelRequest("GET",'/api/articles/'+id);
		},
		//获取分类
		getCategories:function(params){
			return handelRequest("GET",'/api/categories',params);
		},
		//创建分类
		createCategory:function(data){
			return handelRequest("POST",'/api/categories',data);
		},
		//更新分类
		updateCategory:function(id,data){
			return handelRequest("PUT",'/api/categories/'+id,data);
		},
		//删除分类
		removeCategory:function(id){
			return handelRequest("DELETE",'/api/categories/'+id);
		},
		//获取标签
		getTags:function(){
			return handelRequest("GET",'/api/tags');
		},
		//创建标签
		createTag:function(data){
			return handelRequest("POST",'/api/tags',data);
		},
		//更新标签
		updateTag:function(id,data){
			return handelRequest("PUT",'/api/tags/'+id,data);
		},
		//删除标签
		removeTag:function(id){
			return handelRequest("DELETE",'/api/tags/'+id);
		},
		//获取友情链接
		getFriends:function(params){			
			return handelRequest("GET","/api/friends",params);
		},
		//创建友情链接
		createFrined:function(data){
			return handelRequest("POST","/api/friends",data);
		},
		//更新友情链接
		updateFrined:function(id,data){
			return handelRequest("PUT","/api/friends/"+id,data);
		},
		//删除友情链接
		removeFrined:function(id){
			return handelRequest("DELETE","/api/friends/"+id);
		},
		//获取用户列表
		getUsers:function(){
			return handelRequest("GET","/api/users");
		},
		//获取文件列表
		getAllFiles:function(){			
			return handelRequest("GET","/api/allFiles");
		},
		//上传文件
		uploadFile:function(file){
			return 	Upload.upload({			//上传文件
				url: '/api/upload/addFile',
				data: {
					file: file
				}
			})
		},
		//上传banner
		createBanner:function(data){
			var config={
				method:"POST",
				url:'/api/upload/addBanner',
				data:data,
				headers: {'Content-Type':undefined},
          		transformRequest:angular.identity   
			};
			return $http(config)
		}
		
	}
	
	return api;
}])