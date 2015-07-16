describe("lab containers service test" ,function(){
    var labMatContServ , httpBackend;

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
    beforeEach(inject(function(_labMatContServ_ ,_$httpBackend_){
        labMatContServ = _labMatContServ_;
        httpBackend = _$httpBackend_;
    }));

    it("getContainers method" , function(){
        httpBackend.whenGET("/lab/dummy/labMaterials/containers/containers.txt").respond([{
            "id": 6,
            "name": "Graduated Cylinder.",
            "description": "Graduated Cylinder. Has a capacity of 50 ml and weight of 54g.",
            "capacity": 50,
            "used": 1,
            "onShelf": 0
        }]);

        //invoke getContainers method.
        labMatContServ.getContainers().$promise.then(function(data){
            expect(data).toEqualData([{
                "id": 6,
                "name": "Graduated Cylinder.",
                "description": "Graduated Cylinder. Has a capacity of 50 ml and weight of 54g.",
                "capacity": 50,
                "used": 1,
                "onShelf": 0
            }]);
        });

        httpBackend.flush();
    });

    it("test update container method" ,function(){
        httpBackend.whenPOST("/lab/dummy/labMaterials/containers/saveStatus.txt").respond({"status" : "ok"});

        //invoke the containers service update method.
        labMatContServ.update({"container" : {
            "id": 6,
            "name": "Graduated Cylinder.",
            "description": "Graduated Cylinder. Has a capacity of 50 ml and weight of 54g.",
            "capacity": 50,
            "used": 1,
            "onShelf": 0
        }}).$promise.then(function(data){
                expect(data).toEqualData({"status" : "ok"});
            });

        httpBackend.flush();
    });
});