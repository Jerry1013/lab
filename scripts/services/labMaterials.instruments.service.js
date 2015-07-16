'use strict';
/*
*lab service for lab instruments.
*/

angular.module("lab.services")
.factory("labMatInstServ" , ["$resource" , function($resource){
	         /*$resource("/lab/dummy/labMaterials/instruments/:action/:id"*/
		var service = $resource("/lab/dummy/labMaterials/instruments/:action" ,{},{
			  getInstruments : {
			  	 method : 'GET' ,params : {action : "instruments.txt" } , isArray : true
			  },
			  update : {
			  	 method : 'POST' ,params : {action : "saveStatus.txt" }
			  }
		});

		return service;
}]);