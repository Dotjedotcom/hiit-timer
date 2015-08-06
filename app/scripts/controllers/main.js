/**
 * @ngdoc function
 * @name hiitTimerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hiitTimerApp
 */
(function() {

    'use strict';

    angular
        .module('hiitTimerApp')
        .controller('MainCtrl', Main);

    function Main($scope, RoutineService) {

        var vm = this,
            _current,
            _routines,
            _rounds,
            _active;

        vm.startTimer = startTimer;
        vm.stopTimer = stopTimer;
        vm.toggleTimer = toggleTimer;
        vm.reset = reset;
        vm.addSeconds = addSeconds;

        init();

        /**
         * init
         * @description
         *  initializes application, hook for reset
         */
        function init() {

            _current = RoutineService.getSelected();
            _routines = RoutineService.getData();
            _rounds = RoutineService.createRounds();
            _active = 0;

            vm.txt = 'Start';
            vm.timerRunning = false;
            vm.currentRoutine = _routines[_current];
            vm.totalTime = _rounds.total;
            vm.warmupTime = RoutineService.strToTime(vm.currentRoutine.warmup);
            vm.cooldownTime = RoutineService.strToTime(vm.currentRoutine.cooldown);
            vm.stateTime = _rounds.time[_active];
            vm.statusMsg = _rounds.name[_active];

            log();

            /**
             * callbackTimer
             * @returns {boolean}
             * @description
             *  used for handling sets, cycles and rounds
             */
            vm.callbackTimer = function() {

                _active++;

                // complete
                if (_active === _rounds.time.length) {

                    vm.statusMsg = 'Complete';
                    vm.stateTime = 0;
                    vm.stopTimer();

                    $scope.$apply();

                    return false;
                }
                else {
                    vm.statusMsg = _rounds.name[_active];
                }

                // push new round seconds to timer
                angular.element('#timert')[0].addCDSeconds(_rounds.time[_active]);

                $scope.$apply();

                log();
            };
        }

        function startTimer() {

            $scope.$broadcast('timer-start');
            vm.timerRunning = true;
        };

        function stopTimer() {

            $scope.$broadcast('timer-stop');
            vm.timerRunning = false;
        };

        function toggleTimer() {

            var bc = vm.timerRunning ? 'timer-stop' : 'timer-start';

            vm.txt = vm.timerRunning ? 'Start' : 'Pause';
            vm.timerRunning = !vm.timerRunning;

            $scope.$broadcast(bc);
        };

        function reset() {

            console.clear();

            _active = 0;

            vm.stateTime = 0;
            vm.stopTimer();

            init();
        }

        function addSeconds(seconds) {

            $scope.$broadcast('timer-add-cd-seconds', seconds);
        };

        function log() {

            console.group('----- round ' + _rounds.name[_active] + ' ----');
            console.log('createRounds', _rounds);
            console.log('totalTime:', vm.totalTime);
            console.log('warmupTime:', vm.warmupTime);
            console.log('cooldownTime:', vm.cooldownTime);
            console.log('activeInterval', _active);
            console.log('stateTime:', _rounds.time[_active]);
            //console.log('rounds:', vm.rounds, 'active:', vm.activeRound);
            console.groupEnd();
        }

    }
})();
