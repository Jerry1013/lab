//angular filter for dropdown search input box.
angular.module("lab.filters")
    .filter("searchBoxFilter" ,[function(){
        return function(list , searchText ,prop){
            var result =[];
            //if list,searchText and prop are valid, then loop to filter.
            if(list&&searchText&&prop){
                //loop the list to filter.
                angular.forEach(list , function(object , index){
                    //check if Object has the specified prop.
                    if(object.hasOwnProperty(prop)){
                        //new a regExp and ignore the sensitive case
                        var searchStr = new RegExp(searchText, "i");
                        //search the specified value of property of object if has the matched string.
                        if(object[prop].search(searchStr)!=-1){
                            //found and push to result array.
                            result.push(object);
                        }
                    }else{
                        //throw the Error if not find the specified prop in object.
                        throw  Error("the object has no '"+prop+"' attribute");
                    }
                });
                return result;
            }else{
                return list;
            }
        }
    }]);