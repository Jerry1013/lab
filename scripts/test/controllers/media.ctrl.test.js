'use strict';

//describe a name for a spec suite.
describe('myApp module', function() {
    //setup basic env before run spec suite.
    beforeEach(module('labApp'));

    beforeEach(function(){
        this.addMatchers({
          toEqualData: function(expected) {
            return angular.equals(this.actual, expected);
          }
        });
    });

    //test the media  controller.
    describe("media controller" , function(){
        var controller,scope,labMediaService,httpBackend ,rootScope ,modalInstance;
        //setup the media controller.
        beforeEach(inject(function($controller,_$rootScope_,_labMediaService_,_$httpBackend_){
            //new a scope from rootscope for controller.
            scope = _$rootScope_.$new();
            httpBackend = _$httpBackend_;
            labMediaService = _labMediaService_;
            rootScope = _$rootScope_;
            //define a create controller function for returning a controller.
            modalInstance = {                    // Create a mock object using spies
                close: jasmine.createSpy('modalInstance.close'),
                open: jasmine.createSpy('modalInstance.open'),
                dismiss: jasmine.createSpy('modalInstance.dismiss'),
                result: {
                    then: jasmine.createSpy('modalInstance.result.then')
                }
            };
            controller = $controller('mediaCtrl',{
                $scope: scope,
                labMediaService : labMediaService,
                $modal : modalInstance
            });

        }));

        //get media.
        it("get media" ,function(){
            //call  api
            httpBackend.whenGET("/lab/dummy/media/media.txt").respond([{
                "id": 6,
                "lab": "Density",
                "title": "My Uploaded Image1.",
                "description": "An Image I uploaded.",
                "duration": 0,
                "position": 2
            }]);

            //invoke getMedia method to get Media.
            scope.getMedia();
            //send the request to backend.
            httpBackend.flush();
            expect(scope.media).toEqualData([{
                "id": 6,
                "lab": "Density",
                "title": "My Uploaded Image1.",
                "description": "An Image I uploaded.",
                "duration": 0,
                "position": 2
            }]);
        });

        it("delete media" ,function(){
            //assume get one media from getMedia method before.
            scope.media = [{
                "id": 6,
                "lab": "Density",
                "title": "My Uploaded Image1.",
                "description": "An Image I uploaded.",
                "duration": 0,
                "position": 2
            }];
            //call  api
            httpBackend.whenGET("/lab/dummy/media/remove.txt?id=6").respond({"status" : "ok"
            });
            //invoke delete media method.
            scope.deleteMedia(scope.media[0]);
            httpBackend.flush(); 
            //after deleted, the media array should be empty.
            expect(scope.media.length).toEqual(0);
        });

    });

    describe("test popup to add one media" ,function(){
        var controller,scope,labMediaService,httpBackend ,rootScope ,modalInstance;
        //setup the media controller.
        beforeEach(inject(function($controller,_$rootScope_,_labMediaService_,_$httpBackend_){
            //new a scope from rootscope for controller.
            scope = _$rootScope_.$new();
            httpBackend = _$httpBackend_;
            labMediaService = _labMediaService_;
            rootScope = _$rootScope_;
            var modalResult = {
                then: function(callback) {
                    callback({
                        "lab": "Density",
                        "title": "My Uploaded Image1.",
                        "description": "An Image I uploaded.",
                        "duration": 0,
                        "position": 2
                    }); // passing fake value as result
                }
            };
            // Create a mock object using spies
            modalInstance = {
                open: function(options) {
                }
            };
            spyOn(modalInstance, "open")
                .andReturn({ result: modalResult });
            //define a create controller function for returning a controller.
            controller = $controller('mediaCtrl',{
                $scope: scope,
                labMediaService : labMediaService,
                $modal : modalInstance
            });

            scope.addMedia();
        }));

        it("should display modal dialog open method" ,function(){
            expect(modalInstance.open).toHaveBeenCalled();
        });

        it("the size of scope.media array should increase 1" ,function(){
            expect(scope.media.length).toEqual(1);
        });

        it("should display  entered media info through modal window", function() {
            expect(scope.media[scope.media.length-1]).toEqual({
                "lab": "Density",
                    "title": "My Uploaded Image1.",
                    "description": "An Image I uploaded.",
                    "duration": 0,
                    "position": 2
            });
        });
    });

    describe("test popup to edit one media" ,function(){
        var controller,scope,labMediaService,httpBackend ,rootScope ,modalInstance;
        //setup the media controller.
        beforeEach(inject(function($controller,_$rootScope_,_labMediaService_,_$httpBackend_){
            //new a scope from rootscope for controller.
            scope = _$rootScope_.$new();
            httpBackend = _$httpBackend_;
            labMediaService = _labMediaService_;
            rootScope = _$rootScope_;
            var modalResult = {
                then: function(callback) {
                    callback({
                        "id" : 6,
                        "lab": "Density1",
                        "title": "My Uploaded Image2.",
                        "description": "An Image I uploaded1.",
                        "duration": 2,
                        "position": 2
                    }); // passing fake value as result
                }
            };
            // Create a mock object using spies
            modalInstance = {
                open: function(options) {
                }
            };
            spyOn(modalInstance, "open")
                .andReturn({ result: modalResult });
            //define a create controller function for returning a controller.
            controller = $controller('mediaCtrl',{
                $scope: scope,
                labMediaService : labMediaService,
                $modal : modalInstance
            });

            scope.media = [{
                "id" : 6,
                "lab": "Density",
                "title": "My Uploaded Image1.",
                "description": "An Image I uploaded.",
                "duration": 0,
                "position": 2
            }];

            scope.editMedia(scope.media[0] ,0);
        }));

        it("should display modal dialog open method" ,function(){
            expect(modalInstance.open).toHaveBeenCalled();
        });

        it("updated item should be equal to the specified one of scope.media array.", function() {
            expect(scope.media[0]).toEqual({
                "id" : 6,
                "lab": "Density1",
                "title": "My Uploaded Image2.",
                "description": "An Image I uploaded1.",
                "duration": 2,
                "position": 2
            });
        });
    });
});