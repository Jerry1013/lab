//set lab app routers.
angular.module("labApp")
.config(['$stateProvider','$urlRouterProvider' ,function($stateProvider , $urlRouterProvider){
        //set state mappings.
        $urlRouterProvider
            .when('/manual', '/manual/background')
            .when('/labMaterials', '/labMaterials/containers')
            .otherwise("/manual/background");

        //navigation router.
        $stateProvider
            .state('manual', {
                url: "/manual",
                templateUrl: "/lab/partials/manual.html",
                controller : "manualCtrl"
            })
            .state('labMaterials', {
                url: "/labMaterials",
                templateUrl: "/lab/partials/labMaterials.html",
                controller : "labMaterialsCtrl"
            })
            .state('media', {
                url: "/media",
                templateUrl: "/lab/partials/media.html",
                controller : "mediaCtrl"
            });
}]);

//set lab manual routers.
angular.module("lab.manual")
.config(['$stateProvider', function($stateProvider){
        $stateProvider
            .state('manual.background', {
                url: "/background",
                templateUrl: "/lab/partials/manual.background.html",
                controller : "backgroundCtrl"
            })
            .state('manual.procedures', {
                url: "/procedures",
                templateUrl: "/lab/partials/manual.procedures.html",
                controller : "proceduresCtrl"
            });
    }]);

//set lab materials routers.
angular.module("lab.labMaterials")
    .config(['$stateProvider' , function($stateProvider){
        $stateProvider
            .state('labMaterials.containers', {
                url: "/containers",
                templateUrl: "/lab/partials/labMaterials.containers.html",
                controller : "containersCtrl"
            })
            .state('labMaterials.instruments', {
                url: "/instruments",
                templateUrl: "/lab/partials/labMaterials.instruments.html",
                controller : "instrumentsCtrl"
            })
            .state('labMaterials.materials', {
                url: "/materials",
                templateUrl: "/lab/partials/labMaterials.materials.html",
                controller : "materialsCtrl"
            });
    }]);

//set lab media routers.
angular.module("lab.media")
    .config(['$stateProvider' , function($stateProvider){

    }]);