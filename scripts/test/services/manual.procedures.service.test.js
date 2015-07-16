describe("manual procedures service test" , function(){
    var proceduresService, httpBackend;
    //launch labApp module.
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
    beforeEach(inject(function(_proceduresService_ ,_$httpBackend_){
        proceduresService = _proceduresService_;
        httpBackend = _$httpBackend_;
    }));


    it("save procedures method" ,function(){
        httpBackend.whenPOST("/lab/dummy/manual/procedures/save.txt").respond({"status" : "ok"});

        //invoke saveProcedures method.
        proceduresService.saveProcedures({content : "hello content"}).$promise.then(function(data){
            expect(data).toEqualData({"status" : "ok"});
        });

        httpBackend.flush();
    });
});