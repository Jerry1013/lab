'use strict';
/*
*controller for lab materials.
*
*/
angular.module("lab.labMaterials")
    .controller("materialsCtrl" ,["$scope" ,"labMatMaterialsServ" , function($scope ,labMatMaterialsServ){

                //init the specified items for dropdown.
                $scope.dropdownList = ['name' , 'formula' ,'type' ,'class', 'flll'];

    			//retrieve materials from backend.
    			$scope.getMaterials = function(){
    				labMatMaterialsServ.getMaterials().$promise.then(function(data){
    						$scope.materials = data;
    				});	
    			};

    			//save the status after checkbox clicked
	    	    $scope.saveStatus = function(material){
	    	   		/*material.$update({action : 'saveStatus.txt'} ,function(data){
	    	   			alert("ID {{"+data.id+"}} of container {{"+data.name+"}} has been updated.");
	    	   		})*/
                    labMatMaterialsServ.update({material : material},function(data){
                        alert("ID {{"+material.id+"}} of container {{"+material.name+"}} has been updated.");
                    });
	    	    };

    }]);