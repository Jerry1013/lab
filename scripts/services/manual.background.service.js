'use strict';
/*
*service for lab background.
*/
angular.module("lab.services")
.factory("backgroundService" , ["$resource" , function($resource){
	 	/*$resource("/lab/dummy/labMaterials/materials/:action/:id"*/
		var service = $resource("/lab/dummy/manual/background/:action" ,{},{
			  saveBackground : {
			  	 method : 'POST' ,params : {action : "save.txt" }
			  },
			  getBackground : {
			  	method : 'GET' ,params : {action : "background.txt"}
			  }
		});

		return service;
}]);