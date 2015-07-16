'use strict';
/*
*controller for lab instruments.
*
*/
angular.module("lab.labMaterials")
    .controller("instrumentsCtrl" ,["$scope" ,"labMatInstServ" , function($scope ,labMatInstServ){

    	   //retrieve instruments from backend.
    	   $scope.getInstruments = function(){
    	   		labMatInstServ.getInstruments().$promise.then(function(data){
    	   			$scope.instruments = data;
    	   		})
    	   };

    	   //save the status after checkbox clicked
    	   $scope.saveStatus = function(instrument){
    	   		/*instrument.$update({action : 'saveStatus.txt'} ,function(data){
                    alert("ID {{"+data.id+"}} of container {{"+data.name+"}} has been updated.");
    	   		})*/
                labMatInstServ.update({instrument : instrument},function(data){
                    alert("ID {{"+instrument.id+"}} of container {{"+instrument.name+"}} has been updated.");
                })
    	   };

    }]);