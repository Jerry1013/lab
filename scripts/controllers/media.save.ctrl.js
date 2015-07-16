'use strict';
/*
 *controller for lab media.
 *
 */
angular.module("lab.media")
    .controller("mediaSaveCtrl" ,["$scope" ,"labMediaService" , "$modalInstance" ,"media" , function($scope ,labMediaService ,$modalInstance ,media){
        //check if add a new media or edit one media.
        $scope.media = media||{};
        //cancel the modal
        $scope.close = function(){
            $modalInstance.dismiss('cancel');
        };
        //save media
        $scope.saveMedia = function(){
            labMediaService.saveMedia({media : $scope.media}).$promise.then(function(resp){
                /*$modalInstance.close(resp);*/
                  $modalInstance.close($scope.media);
            });
        }
    }]);