/*jshint esversion: 6 */
(function() {
    "use strict";

    angular.module('LeaderBoard', [])
        .controller('BoardCtrl', function($scope, $timeout, FileService) {
            FileService.read(function(data){
                console.log('read!')
                console.log(data);
                $scope.rows = data;
                save();
            });

            function save() {
                FileService.save($scope.rows);
                console.log('save!');
                $timeout(save, 5*1000);
            }

            $scope.add = function(name, score) {
                var index = $scope.rows.find(item => item.name == name);
                if (index)
                    index.score = score;
                else
                    $scope.rows.push({
                        name: name,
                        score: score
                    });
            };

            $scope.remove = function(index) {
                $scope.rows.pop(index);
            };
        })

    .factory('FileService', function() {
        var fs = require('fs');

        var file = 'score.json';

        return {
            save(data) {
                fs.writeFile(file, JSON.stringify(data, null, 4), function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("JSON saved to " + file);
                    }
                });
            },
            read(cb) {
                fs.readFile(file, 'utf8', function(err, data) {
                    if (err) cb([]);
                    else cb(JSON.parse(data));
                });
            }
        };

    });

}());
