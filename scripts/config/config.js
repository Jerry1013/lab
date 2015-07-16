angular.module("labApp")
    .run(["$rootScope" ,"paginationConfig" ,"$state", function($rootScope , paginationConfig ,$state){
        //config the pagination
        paginationConfig.firstText = "<<";
        paginationConfig.lastText = ">>";
        paginationConfig.previousText = "<";
        paginationConfig.nextText = ">";
        paginationConfig.boundaryLinks = true;
        paginationConfig.maxSize = 10;

        //watch the ui-router state changed event.
        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams){
                if(fromState.name === 'manual.background' || fromState.name === 'manual.procedures'){
                    //watch if tiny content changed.
                    if($rootScope.tinyContent){
                        if(confirm("You have unsaved changes. Are you sure you want to leave this page?")){
                            $rootScope.tinyContent = false;
                            //go to the target state.
                            $state.go(toState.name);
                        }else{
                            //prevent to jump into another page.
                            event.preventDefault();
                        }
                    }
                }
         })
}]);