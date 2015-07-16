'use strict';
/*
*service for lab procedures.
*/
angular.module("lab.services")
.factory("proceduresService" , ["$resource" , function($resource){
	 	/*$resource("/lab/dummy/manual/procedures/:action/:id"*/
		var service = $resource("/lab/dummy/manual/procedures/:action" ,{},{
			  saveProcedures : {
			  	 method : 'POST' ,params : {action : "save.txt" }
			  },
			  getProcedures : {
			  	method : "GET" , params : {action : 'procedures.txt'}
			  }
		});

		return service;
}]);