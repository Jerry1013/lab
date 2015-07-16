//dropdown search box directive.
angular.module("lab.directives")
    .directive("labDropdownSearch" ,[function(){
        return {
            restrict : "EA",
            replace : true,
            templateUrl : "scripts/directives/templates/lab.dropdown.search.html",
            scope : {
                dropdownList : "=",
                searchText : "=",
                searchType : "="
            },
            link : function(scope , element ,attrs){
                //default to hide the dropdown.
                scope.show = false;
                //init the default selected item&type
                scope.currentItem = scope.dropdownList[0];
                scope.searchType = scope.dropdownList[0];
                //toggle to show or hide the dropdown.
                scope.toggleList = function(){
                    scope.show = !scope.show;
                };
                //select one item in dropdown.
                scope.selectItem = function(item){
                    scope.show = !scope.show;
                    scope.currentItem = item;
                    scope.searchType = item;
                };

            }
        }
    }]);