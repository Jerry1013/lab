describe("test media save controller" , function(){
    //setup basic env before run spec suite.
    beforeEach(module('labApp'));

    describe("save one media" ,function(){
        var controller,scope,labMediaService,httpBackend ,rootScope ,modalInstance ,media;
        //setup the media controller.
        beforeEach(inject(function($controller,_$rootScope_,_labMediaService_,_$httpBackend_){
            //new a scope from rootscope for controller.
            scope = _$rootScope_.$new();
            httpBackend = _$httpBackend_;
            labMediaService = _labMediaService_;
            rootScope = _$rootScope_;
            media = {
                "id" : 6,
                "lab": "Density1",
                "title": "My Uploaded Image2.",
                "description": "An Image I uploaded1.",
                "duration": 2,
                "position": 2
            };

            // Create a mock object using spies
            modalInstance = {
                close: function(result) {
                },
                dismiss : function(reason){
                }
            };
            spyOn(modalInstance, "close");
            //define a create controller function for returning a controller.
            controller = $controller('mediaSaveCtrl',{
                $scope: scope,
                labMediaService : labMediaService,
                $modalInstance : modalInstance,
                media : media
            });

        }));

        it("should close the modal after saved successfully." ,function(){
            httpBackend.whenPOST("/lab/dummy/media/save.txt").respond({"status" : "ok"});
            //invoke save Media method.
            scope.saveMedia();
            httpBackend.flush();
            expect(modalInstance.close).toHaveBeenCalled();
        });
    });
});