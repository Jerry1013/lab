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

    //test the labMaterails container controller.
    describe("labMaterials containers controller" , function(){
        var controller,scope,labMatContSvc,httpBackend ,createController ,rootScope;
        //setup the home controller.
        beforeEach(inject(function($controller,_$rootScope_,labMatContServ,$httpBackend){
            //init the specified variables.
            scope = _$rootScope_.$new();
            httpBackend = $httpBackend;
            labMatContSvc = labMatContServ;
            rootScope = _$rootScope_;
            //define a create controller function for returning a controller.
            createController = function(){
                controller = $controller('containersCtrl',{
                    $scope: scope,
                    labMatContServ : labMatContSvc
                });
            };
            
        }));

        //get containers.
        it("get containers" ,function(){          
            //call  api
            httpBackend.whenGET("/lab/dummy/labMaterials/containers/containers.txt").respond([{
                "id": 6,
                "name": "Graduated Cylinder.",
                "description": "Graduated Cylinder. Has a capacity of 50 ml and weight of 54g.",
                "capacity": 50,
                "used": 1,
                "onShelf": 0
            }]);
            //execute the getContainers method.
            labMatContSvc.getContainers().$promise.then(function(data){
                scope.containers  = data;
                expect(scope.containers).toEqualData([{
                    "id": 6,
                    "name": "Graduated Cylinder.",
                    "description": "Graduated Cylinder. Has a capacity of 50 ml and weight of 54g.",
                    "capacity": 50,
                    "used": 1,
                    "onShelf": 0
                }]);
            });
            //send the request to backend.
            httpBackend.flush();
        });

        it("container save status" ,function(){
            //call  api
            createController();
            httpBackend.whenPOST("/lab/dummy/labMaterials/containers/saveStatus.txt").respond({"status" : "ok"
            });
            //invoke update method of labMatContSvc.
            labMatContSvc.update({id :7}).$promise.then(function(data){
                expect(data).toEqualData({"status" : "ok"});
            });
            //send the request to backend.
            httpBackend.flush();

        });

    });
});