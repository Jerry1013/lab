'use strict';
/*
*service for lab media.
*/
angular.module("lab.services")
.factory("labMediaService" , ["$resource" , function($resource){
		/*var service = $resource("/lab/dummy/media/:action/:id" ,{action : '@action' , id : '@id'},{
			  getMedia : {
			  	 method : 'GET' , params : {action : "media.txt"},isArray : true
			  }
		});*/
		var service = $resource("/lab/dummy/media/:action" ,{action : 'action'},{
			  getMedia : {
			  	 method : 'GET' , params : {action : "media.txt"},isArray : true
			  },
			  deleteMedia : {
			  	 method : 'GET' , params : {action : "save.txt"}
			  },
			  saveMedia : {
			  	 method : 'POST' ,params : {action : "save.txt"}
			  }
		});

		return service;
}]);