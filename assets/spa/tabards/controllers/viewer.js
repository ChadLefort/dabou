(function() {
    'use strict';

    angular
        .module('dabou.tabards')
        .controller('ViewerController', ViewerController);

    /**
     * @ngdoc controller
     * @name dabou.tabards.controller:ViewerController
     * @description
     *
     */
    ViewerController.$inject = ['_', 'urlS3Bucket', 'viewerService', 'tabardsService', 'mainService', '$stateParams'];

    function ViewerController(_, urlS3Bucket, viewerService, tabardsService, mainService, $stateParams) {
        var vm = this,
            tabardId = $stateParams.id;

        // PUBLIC PROPERTIES
        vm.loading = true;
        vm.viewer = {
          gender: 0,
          race: 2,
          open: true
        };

        // PUBLIC FUNCTIONS
        vm.changeModel = changeModel;

        // init
        activate();

        //
        // PRIVATE FUNCTIONS

        function activate() {
            viewerService.init({
                canvasId: 'viewer',
                containerId: 'viewer-container'
            });

            getLookups();
            getTabard(tabardId);
            loadOBJMTL(urlS3Bucket + '/assets/tabards/52252/' + vm.viewer.race + '/' +  vm.viewer.gender + '/model.obj', urlS3Bucket + '/assets/tabards/52252/' + vm.viewer.race + '/' +  vm.viewer.gender + '/model.mtl', 'model');
        }

        /*
         * @private
         * @function
         * 
         * @description :: Get all of the lookup tables
         */
        function getLookups() {
          mainService.getLookups()
            .then(function (data) {
              vm.races = _.filter(data.lookups.races, function(race) {
                if (race.id != 25 && race.id != 26) {
                  return race;
                }
              });
              vm.genders = data.lookups.genders;
            });
        }


        /*
         * @private
         * @function
         * @param {Integer} id - A tabard's id
         * @description :: Get's a tabard by id
         */
        function getTabard(tabardId) {
          tabardsService.getTabard(tabardId)
            .then(function (data) {
              vm.tabard = data;
            }).catch(function (error) {
              vm.noTabard = true;
            });
        }

        function loadOBJ(id, race, gender, obj, name) {
            var info = {
                s3bucket: urlS3Bucket,
                id: id,
                race: race,
                gender: gender,
                obj: obj,
                name: name,
                type: 'obj'
            }

            viewerService.loadOBJ(info);
        }

        function loadOBJMTL(obj, mtl, name) {
            var info = {
                obj: obj,
                mtl: mtl,
                name: name,
                type: 'objmtl'
            };

            viewerService.loadOBJMTL(info);
        }

        function changeModel() {
            if(vm.viewer.race == 22) {
              loadOBJ(52252, 22, vm.viewer.gender, urlS3Bucket +  '/assets/tabards/52252/22/' + vm.viewer.gender + '/model.obj', 'model');
            } else {
              loadOBJMTL(urlS3Bucket + '/assets/tabards/52252/' + vm.viewer.race + '/' +  vm.viewer.gender + '/model.obj', urlS3Bucket + '/assets/tabards/52252/' + vm.viewer.race + '/' +  vm.viewer.gender + '/model.mtl', 'model');
            }
        }
    }
})();
