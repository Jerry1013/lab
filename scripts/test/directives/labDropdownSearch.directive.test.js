describe('test lab dropdown search directive', function() {
	var element, scope, $compile;
	beforeEach(module('labApp'));
	beforeEach(module('scripts/directives/templates/lab.dropdown.search.html'));
	//setup necessary env.
   	beforeEach(inject(function(_$compile_, $rootScope) {
        scope = $rootScope;
        $compile = _$compile_;
    }));

    it("test link function" , function(){
        scope.dropdownList = ['name' , 'formula' ,'type' ,'class', 'flll'];
        scope.searchText = "";
        scope.show = false;
        scope.currentItem = scope.dropdownList[0];
        scope.type = scope.dropdownList[0];
        element = angular.element('<lab-dropdown-search dropdown-list="dropdownList" search-type="type"   search-text="searchText"></lab-dropdown-search>');

        $compile(element)(scope); // Compile the directive

        scope.$digest(); // Update the HTML

        //check if the default selected item is 'name' or not.
        expect(element.find(">a").text()).toMatch("name");

        //check if the dropdown length equal to the specified array length.
        expect(element.find(".list-group a").length).toEqual(scope.dropdownList.length);

        // Get the isolate scope for the directive
        var isoScope = element.isolateScope();

        //check the default toggle show value.
        expect(isoScope.show).toBe(false);

        //check the default selected item.
        expect(isoScope.currentItem).toEqual(scope.dropdownList[0]);

        //check the default search type.
        expect(isoScope.searchType).toEqual(scope.dropdownList[0]);

        //execute the toggleList method.
        isoScope.toggleList();
        //after toggled, the show should be true.
        expect(isoScope.show).toBe(true);

        //execute the select item method.
        isoScope.selectItem(scope.dropdownList[3]);
        //after selected one item, the show should be false
        expect(isoScope.show).toBe(false);

        //check the selected item.
        expect(isoScope.currentItem).toEqual(scope.dropdownList[3]);

        //check the selected type.
        expect(isoScope.searchType).toEqual(scope.dropdownList[3]);
    
    });

});