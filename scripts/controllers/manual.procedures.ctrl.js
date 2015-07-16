'use strict';
/*
*controller for lab procedures of manual.
*
*/
angular.module("lab.manual")
    .controller("proceduresCtrl" ,["$scope" ,"proceduresService" ,"$timeout" ,"$rootScope" ,
        function($scope , proceduresService ,$timeout ,$rootScope){
          //init a empty alerts.
    	  $scope.alerts = [];
          //editor content model.
    	  $scope.tiny = {
    	  	 content : ''
    	  };

          //get one procedures content
          $scope.getProcedures = function(){
                proceduresService.getProcedures().$promise.then(function(data){
                    $scope.tiny.content = data.content;
                });
          };
    	  //save editor content.
    	  $scope.save = function(){
                 //change the scope.date value to scroll browser to top.
                 $scope.date = (new Date()).getTime();
    	  		 proceduresService.saveProcedures({content : $scope.tiny.content} , function(data){
    	  		 	var successMsg = { type: 'success', msg: 'success - Editor saved.' };
                        //show the saved success message once getting respond.
    	  		 		$scope.alerts.push(successMsg);
                        $rootScope.tinyContent = false;
                        //remove the alert after 5mins.
                        $timeout(function(){
                            $scope.closeAlert(0);
                        } , 5000);
    	  		 });
    	  };
    	  //close the alert.
    	  $scope.closeAlert = function(index) {
    			$scope.alerts.splice(index, 1);
  		  };

    }]);