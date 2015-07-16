describe("Test the lab scroll top directive" ,function(){
    var element, scope, $compile  ,$timeout;
    beforeEach(module('labApp'));

     //inject the necessary services before the
     beforeEach(inject(function(_$compile_, $rootScope , _$timeout_) {
        scope = $rootScope;
        $compile = _$compile_;
        $timeout = _$timeout_;
     }));

     it("should be equal 0 of scrolltop after date changed." ,function(){
         scope.date = (new Date()).getTime();
         //wrap an element and invoke lab-scrolltop directive.
         element = angular.element('<div lab-scrolltop="{{date}}"></div>');

         //compile element.
         $compile(element)(scope); // Compile the directive

         scope.$digest(); // Update the HTML

         element.scrollTop(2000);//scroll to 2000

         $timeout(function(){
             scope.date = (new Date()).getTime();
             expect($(window).scrollTop).toEqual(0);
         });

     });
});