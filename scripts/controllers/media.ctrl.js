'use strict';
/*
*controller for lab media.
*
*/
angular.module("lab.media")
    .controller("mediaCtrl" ,["$scope" ,"labMediaService" , "$modal", function($scope ,labMediaService ,$modal){
            $scope.media = [];
            /// get all media.
    		$scope.getMedia = function(){
    			labMediaService.getMedia().$promise.then(function(data){
    				 $scope.media = data;
    			});
    		};
            //add a media.
            $scope.addMedia = function(){
                var modalInstance = $modal.open({
                    templateUrl: '/lab/partials/media.save.html',
                    controller: 'mediaSaveCtrl',
                    resolve: {
                        media : function () {
                            return null;
                        }
                    }
                }).result.then(function(item){
                        $scope.media.push(item);
                    }, function () {

                });
            };
            // edit a specified media.
            $scope.editMedia = function(medium ,index){
                var modalInstance = $modal.open({
                    templateUrl: '/lab/partials/media.save.html',
                    controller: 'mediaSaveCtrl',
                    resolve: {
                        media: function () {
                            return medium;
                        }
                    }
                }).result.then(function(item){
                        $scope.media[index] = item;
                    }, function () {

                });
            };
            //delete one specified media
            $scope.deleteMedia = function(medium){
                labMediaService.deleteMedia({action : "remove.txt" , id : medium.id} ,function(status){
                        var index = $scope.media.indexOf(medium);
                        $scope.media.splice(index, 1);
                });
            }
    }]);