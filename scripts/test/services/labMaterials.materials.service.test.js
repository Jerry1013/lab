describe("lab materials service test" ,function(){
      var labMatMaterialsServ , httpBackend;

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
        beforeEach(inject(function(_labMatMaterialsServ_ ,_$httpBackend_){
            labMatMaterialsServ = _labMatMaterialsServ_;
            httpBackend = _$httpBackend_;
        }));

        it("test getMaterials method" ,function(){
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

            //invoke getMaterials method.
            labMatMaterialsServ.getMaterials().$promise.then(function(data){
                    expect(data).toEqualData([{
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

            httpBackend.flush();

        });

        it("test update material method" ,function(){
            httpBackend.whenPOST("/lab/dummy/labMaterials/materials/saveStatus.txt").respond({"status" : "ok"});

            //invoke the materials service update method.
            labMatMaterialsServ.update({"material" : {
                "id": 6,
                "name": "Air",
                "formula" : "02+N2",
                "type" : "Chemical",
                "class" : "Gas",
                "flll" : "Gas",
                "used" : 0,
                "onShelf" : 0
            }}).$promise.then(function(data){
                   expect(data).toEqualData({"status" : "ok"});
                });

            httpBackend.flush();
        });
});