describe("test manual procedures controller" ,function(){
    //setup basic env before run spec suite.
    var proceduresService,scope , $httpBackend ,createController ,controller ,rootScope , timeout;
    beforeEach(module('labApp'));

    //inject the necessary dependencies.
    beforeEach(inject(function(_proceduresService_,_$rootScope_,_$httpBackend_,_$timeout_ ,$controller){
        //init the specified variables.
        proceduresService = _proceduresService_;
        scope = _$rootScope_.$new();
        $httpBackend = _$httpBackend_;
        rootScope = _$rootScope_;
        timeout = _$timeout_;
        //define a create controller method.
        controller = $controller('proceduresCtrl',{
            $scope: scope,
            proceduresService : proceduresService,
            $rootScope : _$rootScope_,
            $timeout : _$timeout_
        });
    }));

    it("test save editor content" , function(){
        $httpBackend.whenPOST("/lab/dummy/manual/procedures/save.txt").respond({"status" : "ok"});
        scope.save();
        //update the date once save method invoked.
        expect(scope.date).not.toBeNull();

        $httpBackend.flush();

        //once save successfully,push one msg to alerts.
        expect(scope.alerts.length).toEqual(1);

        //a specified success msg pushed.
        expect(scope.alerts[0]).toEqual({ type: 'success', msg: 'success - Editor saved.' });

        //after saved successfully, set to tinyContent indicator to false.
        expect(rootScope.tinyContent).toBeFalsy();

        // saved successfully, remove the success msg after 5 secs.
        timeout(function(){
            expect(scope.alerts.length).toEqual(0);
        },5000);
        //flush timeout.
        timeout.flush();
    });

    it("remove the msg after invoking the closeAlert method" ,function(){
        //init a msg for alerts.
        scope.alerts=[{ type: 'success', msg: 'success - Editor saved.' }];
        expect(scope.alerts.length).toEqual(1);
        //invoke the closeAlert method.
        scope.closeAlert(0);
        expect(scope.alerts.length).toEqual(0);
    });

});