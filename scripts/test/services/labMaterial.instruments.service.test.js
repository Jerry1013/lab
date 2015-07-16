describe("lab instruments service test" ,function(){
    var labMatInstServ , httpBackend;

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
    beforeEach(inject(function(_labMatInstServ_ ,_$httpBackend_){
        labMatInstServ = _labMatInstServ_;
        httpBackend = _$httpBackend_;
    }));

    it("test getInstruments method" ,function(){
        httpBackend.whenGET("/lab/dummy/labMaterials/instruments/instruments.txt").respond([{
            "id": 6,
            "name": "Balance",
            "description": "This should be a description of Balance.",
            "used": 1
        }]);

        //invoke getInstruments method.
        labMatInstServ.getInstruments().$promise.then(function(data){
                expect(data).toEqualData([{
                    "id": 6,
                    "name": "Balance",
                    "description": "This should be a description of Balance.",
                    "used": 1
                }]);
        });

        httpBackend.flush();

    });

    it("test update material method" ,function(){
        httpBackend.whenPOST("/lab/dummy/labMaterials/instruments/saveStatus.txt").respond({"status" : "ok"});

        //invoke the instruments service update method.
        labMatInstServ.update({"instrument" : {
            "id": 6,
            "name": "Balance",
            "description": "This should be a description of Balance.",
            "used": 1
        }}).$promise.then(function(data){
                expect(data).toEqualData({"status" : "ok"});
            });

        httpBackend.flush();
    });
});