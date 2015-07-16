//scroll to window top directive.
angular.module("lab.directives")
	.directive("labScrolltop" ,[function(){
		 return {
		 	 restrict : "A",
		 	 link : function(scope , element ,attrs){
                  //observe the lab-scrolltop attribute.
                  //if any changes, will animate page to top.
		 	 	  attrs.$observe("labScrolltop" , function(){
			 	 	  	$("html,body").animate({scrollTop:0},200);
		 	 	  });
		 	 }
		 }
	}]);