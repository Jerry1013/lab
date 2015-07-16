'use strict';
/*
*service for lab materials.
*/
angular.module("lab.services")
.factory("labMatMaterialsServ" , ["$resource" , function($resource){
	 	/*$resource("/lab/dummy/labMaterials/materials/:action/:id"*/
		var service = $resource("/lab/dummy/labMaterials/materials/:action" ,{},{
			  getMaterials : {
			  	 method : 'GET' ,params : {action : 'materials.txt'},isArray : true
			  },
			  update : {
			  	 method : 'POST' ,params : {action : "saveStatus.txt" }
			  }
		});

		return service;
}]);