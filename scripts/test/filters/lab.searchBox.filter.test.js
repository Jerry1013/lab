describe("Lab search box filter" ,function(){
    var searchBoxFilter;
    beforeEach(module('labApp'));

    //inject the necessary $filter provider and assign value to searchBoxFilter
    beforeEach(inject(function($filter) {
        searchBoxFilter = $filter('searchBoxFilter');
    }));

    it("returned the matched items" ,function(){
        var list = [{
            "id": 6,
            "name": "Air",
            "formula" : "02+N2",
            "type" : "Chemical",
            "class" : "Gas",
            "flll" : "Gas1"
        }, {
            "id": 7,
            "name": "Aluminium",
            "formula" : "Al",
            "type" : "Chemical",
            "class" : "Solid",
            "flll" : "Solid"
        },{
            "id": 8,
            "name": "Air",
            "formula" : "02+N2",
            "type" : "Chemical",
            "class" : "Gas",
            "flll" : "Gas"
        }, {
            "id": 9,
            "name": "Aluminium",
            "formula" : "Al",
            "type" : "Chemical",
            "class" : "Solid",
            "flll" : "Solid"
        }];

        //if searchText and prop not yet to set, then no filter.
        expect(searchBoxFilter(list,"","")).toEqual(list);

        //if only set searchText and not for prop, then no filter.
        expect(searchBoxFilter(list,"a","")).toEqual(list);

        //if only set prop and not for searchText, then no filter.
        expect(searchBoxFilter(list,"","name")).toEqual(list);

        //search by name
        expect(searchBoxFilter(list,"Air","name")).toEqual([{
            "id": 6,
            "name": "Air",
            "formula" : "02+N2",
            "type" : "Chemical",
            "class" : "Gas",
            "flll" : "Gas1"
        },{
            "id": 8,
            "name": "Air",
            "formula" : "02+N2",
            "type" : "Chemical",
            "class" : "Gas",
            "flll" : "Gas"
        }]);

        //search by flll
        expect(searchBoxFilter(list,"Gas1","flll")).toEqual([{
            "id": 6,
            "name": "Air",
            "formula" : "02+N2",
            "type" : "Chemical",
            "class" : "Gas",
            "flll" : "Gas1"
        }]);

        //not record matched
        expect(searchBoxFilter(list,"Gas11","flll")).toEqual([]);

        //throw an error if no the specified property in object.
        //expect(searchBoxFilter(list,"Gas11","hello")).toThrow();
    })
});