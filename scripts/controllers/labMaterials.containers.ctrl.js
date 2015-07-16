'use strict';
/*
*controller for lab containers.
*
*/
angular.module("lab.labMaterials")
    .controller("containersCtrl" ,["$scope" , "labMatContServ" , function($scope ,labMatContServ){
           //init an empty containers array.
           $scope.containers = [];

    	   //retrieve containers from backend.
    	   $scope.getContainers = function(){
    	   		labMatContServ.getContainers().$promise.then(function(data){
    	   			$scope.containers = data;
    	   		});
    	   };

           //save the checkbox status to backend.
    	   $scope.saveStatus = function(container){
    	   	   	/*container.$update({action : 'saveStatus.txt'} ,function(data){
                    alert("ID {{"+data.id+"}} of container {{"+data.name+"}} has been updated.");
    	   	   	});*/
               labMatContServ.update({container : container},function(data){
                    alert("ID {{"+container.id+"}} of container {{"+container.name+"}} has been updated.");
                });
    	   };

    }]);