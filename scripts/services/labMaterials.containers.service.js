'use strict';
/*
*lab service for lab containers.
*/
angular.module("lab.services")
.factory("labMatContServ" , ["$resource" , function($resource){
		/*$resource("/lab/dummy/labMaterials/containers/:action/:id"*/
		var service = $resource("/lab/dummy/labMaterials/containers/:action" ,{},{
			  getContainers : {
			  	 method : 'GET' , params : {action : "containers.txt"},isArray : true
			  },
			  update : {
                  method : 'POST' , params : {action : "saveStatus.txt" }
			  }
		});

		return service;
}]);