describe("manual background service test" , function(){
      var backgroundService, httpBackend;
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
        beforeEach(inject(function(_backgroundService_ ,_$httpBackend_){
            backgroundService = _backgroundService_;
            httpBackend = _$httpBackend_;
        }));


        it("save background method" ,function(){
            httpBackend.whenPOST("/lab/dummy/manual/background/save.txt").respond({"status" : "ok"});

            //invoke saveBackground method.
            backgroundService.saveBackground({content : "hello content"}).$promise.then(function(data){
                  expect(data).toEqualData({"status" : "ok"});
            });

            httpBackend.flush();
        });
});