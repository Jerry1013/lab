describe("Lab media service test" ,function(){
    var labMediaService, httpBackend;
    beforeEach(module('labApp'));

    //add customized matcher for jasmine
    beforeEach(function(){
        this.addMatchers({
            toEqualData: function(expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });

    //inject the specified service.
    beforeEach(inject(function(_labMediaService_ ,_$httpBackend_){
        labMediaService = _labMediaService_;
        httpBackend = _$httpBackend_;
    }));

    it("get media method" ,function(){
        httpBackend.whenGET("/lab/dummy/media/media.txt").respond([{
            "id": 6,
            "lab": "Density",
            "title": "My Uploaded Image1.",
            "description": "An Image I uploaded.",
            "duration": 0,
            "position": 2
        }]);

        //invoke the getMedia method.
        labMediaService.getMedia().$promise.then(function(data){
            expect(data).toEqualData([{
                "id": 6,
                "lab": "Density",
                "title": "My Uploaded Image1.",
                "description": "An Image I uploaded.",
                "duration": 0,
                "position": 2
            }]);
        });

        httpBackend.flush();
    });

    it("delete media method" ,function(){
        httpBackend.whenGET("/lab/dummy/media/save.txt").respond({"status" : "ok"});

        //invoke the deleteMedia method
        labMediaService.deleteMedia().$promise.then(function(data){
             expect(data).toEqualData({"status" : "ok"});
        });

        httpBackend.flush();
    });

    it("save media method" ,function(){
        httpBackend.whenPOST("/lab/dummy/media/save.txt").respond({"status" : "ok"});

        //invoke the saveMedia method
        labMediaService.saveMedia().$promise.then(function(data){
            expect(data).toEqualData({"status" : "ok"});
        });

        httpBackend.flush();
    });
});