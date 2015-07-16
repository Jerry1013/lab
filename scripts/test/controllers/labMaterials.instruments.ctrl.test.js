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

    //test the labMaterails instruments controller.
    describe("labMaterials instruments controller" , function(){
        var controller,scope,labMatInstSvc,httpBackend ,createController ,rootScope;
        //setup the home controller.
        beforeEach(inject(function($controller,_$rootScope_,labMatInstServ,$httpBackend){
            //new a scope from rootscope for controller.
            scope = _$rootScope_.$new();
            httpBackend = $httpBackend;
            labMatInstSvc = labMatInstServ;
            rootScope = _$rootScope_;
            //define a create controller function for returning a controller.
            createController = function(){
                controller = $controller('instrumentsCtrl',{
                    $scope: scope,
                    labMatInstSvc : labMatInstSvc
                });
            };
            
        }));

        //get instruments.
        it("get instruments" ,function(){  
            createController();        
            //call  api
            httpBackend.whenGET("/lab/dummy/labMaterials/instruments/instruments.txt").respond([{
                "id": 6,
                "name": "Balance",
                "description": "This should be a description of Balance.",
                "used": 1
            }]);
            //execute the getInstruments method.
            labMatInstSvc.getInstruments().$promise.then(function(data){
                scope.instruments  = data;
                expect(scope.instruments).toEqualData([{
                    "id": 6,
                    "name": "Balance",
                    "description": "This should be a description of Balance.",
                    "used": 1
                }]);
            });
            //send the request to backend.
            httpBackend.flush();
        });

        it("instrument save status" ,function(){
            //call  api
            createController();
            httpBackend.whenPOST("/lab/dummy/labMaterials/instruments/saveStatus.txt").respond({"status" : "ok"
            });
            //invoke the update method of labMatInstSvc.
            labMatInstSvc.update({id : 8} ,function(data){
                 expect(data).toEqualData({"status" : "ok"});
            });
            //send the request to backend.
            httpBackend.flush();

        });

    });
});