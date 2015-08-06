(function() {

    'use strict';

    angular
        .module('services.routine', [])
        .factory('RoutineService', RoutineService);

    RoutineService.$inject = [];

    /**
     * RoutineService
     * @returns {{selected: number, getSelected: getSelected, setSelected: setSelected, createRounds: createRounds, strToTime: strToTime, getData: getData, routineData: *[]}}
     * @constructor
     */
    function RoutineService() {

        return {

            selected: 0,
            getSelected: getSelected,
            setSelected: setSelected,
            createRounds: createRounds,
            strToTime: strToTime,
            getData: getData,
            routineData: [{
                name: 'routine week 1',
                description: 'Routine for first week',
                warmup: '00:00:05',
                interval: [{
                    low: '00:00:05',
                    high: '00:00:05',
                    sets: 1,
                    cycles: 1,
                    rest: '00:00:10'
                }],
                cooldown: '00:00:05'
            }, {
                name: 'routine week 2',
                description: 'Routine for second week',
                warmup: '00:03:00',
                interval: [{
                    low: '00:00:45',
                    high: '00:00:15',
                    sets: 3,
                    cycles: 3,
                    rest: '00:01:00'
                }, {
                    low: '00:00:30',
                    high: '00:00:30',
                    sets: 5,
                    cycles: 3,
                    rest: '00:00:10'
                }],
                cooldown: '00:05:00'
            }
            ]
        };

        /**
         * getSelected
         * @returns {*}
         */
        function getSelected() {
            return this.selected;
        }

        /**
         * setSelected
         * @param activeIdx
         */
        function setSelected(activeIdx) {
            this.selected = activeIdx;
        }

        /**
         * createRounds
         * @returns {{name: Array, time: Array, total: number}}
         * @description
         *  returns total time in seconds, and arrays with round names en time per round in seconds
         */
        function createRounds() {

            var roundsArray = {
                    name: [],
                    time: [],
                    total: 0
                },
                data = this.routineData[this.selected],
                rounds = data.interval.length;

            if (data.warmup !== '00:00:00') {

                roundsArray.name.push('Warm Up');
                roundsArray.time.push(this.strToTime(data.warmup));
                roundsArray.total += this.strToTime(data.warmup);

            }

            for (var d = 0; d < data.interval.length; d++) {

                for (var c = 0; c < data.interval[d].cycles; c++) {

                    for (var s = 0; s < data.interval[d].sets; s++) {

                        roundsArray.name.push('Low Interval', 'High Interval');
                        roundsArray.time.push(this.strToTime(data.interval[d].low), this.strToTime(data.interval[d].high));
                        roundsArray.total += this.strToTime(data.interval[d].low) + this.strToTime(data.interval[d].high);

                    }

                    if (data.interval[d].pause !== '00:00:00') {

                        roundsArray.name.push('Rest between rounds');
                        roundsArray.time.push(this.strToTime(data.interval[d].rest));
                        roundsArray.total += this.strToTime(data.interval[d].rest);

                    }
                }
            }

            if (data.cooldown !== '00:00:00') {

                roundsArray.name.push('Cool Down');
                roundsArray.time.push(this.strToTime(data.cooldown));
                roundsArray.total += this.strToTime(data.cooldown);

            }

            return roundsArray;
        }

        /**
         * getData
         * @returns {Array}
         */
        function getData() {
            return this.routineData;
        }

        /**
         * strToTime
         * @param str
         * @returns {number}
         * @description
         *  returns total seconds of 'hh:mm:ss' string
         */
        function strToTime(str) {

            if (str.indexOf(':') !== 2) {
                return;
            }

            var time = str.split(':');

            return (Number(time[0]) * 60 * 60) + (Number(time[1]) * 60) + (Number(time[2]));
        }
    }

})();
