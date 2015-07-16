'use strict';
/*
*controller for lab background of manual.
*
*/
angular.module("lab.manual")
    .controller("backgroundCtrl" ,["$scope" , "backgroundService" ,"$timeout" ,"$rootScope" ,
     function($scope ,backgroundService ,$timeout ,$rootScope){
          //init an empty alerts.
    	  $scope.alerts = [];
          //editor content ngModel.
    	  $scope.tiny = {
    	  	 content : ''
    	  };

          //get one background content.
          $scope.getBackground = function(){
                backgroundService.getBackground().$promise.then(function(data){
                    $scope.tiny.content = data.content;
                });
          }

    	  //save editor content.
    	  $scope.save = function(){
                 $scope.date = (new Date()).getTime();
    	  		 backgroundService.saveBackground({content : $scope.tiny.content} , function(data){
    	  		 	var successMsg = { type: 'success', msg: 'success - Editor saved.' };
                        //show saved success message once getting respond.
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