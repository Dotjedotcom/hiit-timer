(function() {

    'use strict';

    angular
        .module('services.routine', [])
        .factory('RoutineService', RoutineService);

    RoutineService.$inject = [];


    function RoutineService() {

        return {
            total: null,
            selected: 0,
            getSelected: getSelected,
            setSelected: setSelected,
            calculateTotalTime: calculateTotalTime,
            strToTime: strToTime,
            getData: getData,
            routineData: [{
                name: 'routine week 1',
                description: 'Routine for first week',
                warmup: '00:00:10',
                interval: [{
                    low: '00:00:02',
                    high: '00:00:04',
                    rounds: 5
                }],
                cooldown: '00:00:30'
            }, {
                name: 'routine week 2',
                description: 'Routine for second week',
                warmup: '00:03:00',
                interval: [{
                    low: '00:00:45',
                    high: '00:00:15',
                    rounds: 3
                }, {
                    low: '00:00:30',
                    high: '00:00:30',
                    rounds: 5
                }],
                cooldown: '00:05:00'
            }
            ]
        };

        function getSelected() {
            return this.selected;
        }

        function setSelected(activeIdx) {
            this.selected = activeIdx;
        }

        function calculateTotalTime() {
            var data = this.routineData[this.selected],
                total = this.strToTime(data.warmup);

            for (var i = 0; i < data.interval.length; i++) {
                total += this.strToTime(data.interval[i].low) * data.interval[i].rounds;
                total += this.strToTime(data.interval[i].high) * data.interval[i].rounds;
            }

            total += this.strToTime(data.cooldown);

            return total;
        }

        function getData() {
            return this.routineData;
        }

        function strToTime(str) {
            if (str.indexOf(':') !== 2) {
                console.log('exit');
                return;
            }
            var time = str.split(':');

            return (Number(time[0]) * 60 * 60) + (Number(time[1]) * 60) + (Number(time[2]));

        }
    }

})();
