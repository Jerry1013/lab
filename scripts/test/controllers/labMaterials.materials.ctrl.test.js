'use strict';

//describe a name for a spec suite.
describe('myApp module', function() {
    //setup basic env before run spec suite.
    beforeEach(module('labApp'));
    //add a customized method to jasmine to compare the actual value of resource returned.
    beforeEach(function(){
        this.addMatchers({
          toEqualData: function(expected) {
            return angular.equals(this.actual, expected);
          }
        });
    });

    //test the labMaterails materials controller.
    describe("labMaterials materials controller" , function(){
        var controller,scope,labMatMaterialsSvc,httpBackend ,createController ,rootScope;
        //setup the materials controller.
        beforeEach(inject(function($controller,_$rootScope_,labMatMaterialsServ,$httpBackend){
            //init the specified variables.
            scope = _$rootScope_.$new();
            httpBackend = $httpBackend;
            labMatMaterialsSvc = labMatMaterialsServ;
            rootScope = _$rootScope_;
            //define a create controller function for returning a controller.
            createController = function(){
                controller = $controller('containersCtrl',{
                    $scope: scope,
                    labMatMaterialsServ : labMatMaterialsSvc
                });
            };
            
        }));

        //get materials.
        it("get materials" ,function(){          
            //call  api
            httpBackend.whenGET("/lab/dummy/labMaterials/materials/materials.txt").respond([{
                "id": 6,
                "name": "Air",
                "formula" : "02+N2",
                "type" : "Chemical",
                "class" : "Gas",
                "flll" : "Gas",
                "used" : 0,
                "onShelf" : 0
            }]);
            //execute the getMaterials method.
            labMatMaterialsSvc.getMaterials().$promise.then(function(data){
                scope.materials  = data;
                expect(scope.materials).toEqualData([{
                        "id": 6,
                        "name": "Air",
                        "formula" : "02+N2",
                        "type" : "Chemical",
                        "class" : "Gas",
                        "flll" : "Gas",
                        "used" : 0,
                        "onShelf" : 0
                    }]);
            });
            //send the request to backend.
            httpBackend.flush();
        });

        it("materials save status" ,function(){
            //call  api
            createController();
            httpBackend.whenPOST("/lab/dummy/labMaterials/materials/saveStatus.txt").respond({"status" : "ok"
            });
            //invoke the update method of labMatMaterialServ.
            labMatMaterialsSvc.update({ id :9}).$promise.then(function(data){
                expect(data).toEqualData({"status" : "ok"});
            });
            //send the request to backend.
            httpBackend.flush();

        });

    });
});