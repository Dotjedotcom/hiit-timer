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
        var vm = this;

        vm.timerRunning = false;
        var _current = RoutineService.getSelected(),
            _routines = RoutineService.getData();

        vm.currentRoutine = _routines[_current];
        // Totaltime view and timer
        vm.totalTime = RoutineService.calculateTotalTime();
        vm.warmupTime = RoutineService.strToTime(vm.currentRoutine.warmup);
        vm.lowTime = RoutineService.strToTime(vm.currentRoutine.interval[0].low);
        vm.highTime = RoutineService.strToTime(vm.currentRoutine.interval[0].high);
        vm.cooldownTime = RoutineService.strToTime(vm.currentRoutine.cooldown);

        vm.states = ['warmup', 'interval', 'cooldown'];
        vm.rounds = vm.currentRoutine.interval[0].rounds;
        vm.activeState = 0;
        vm.activeRound = 0;
        // Start interval high (true), low (false)
        vm.activeInterval = false;
        vm.statusMsg = vm.states[vm.activeState];

        vm.stateTime = vm[vm.states[vm.activeState] + 'Time'];
        vm.callbackTimer = {
            status: vm.states[vm.activeState]
        };
        //vm.callbackTimer.;

        log();

        vm.callbackTimer.finished = function() {
            console.log('vm.activeState', vm.activeState);
            if (vm.activeState === 0) {
                vm.activeState++;
            }
            vm.callbackTimer.status = vm.states[vm.activeState];
            vm.statusMsg = vm.states[vm.activeState] + (vm.activeState === 1 ? ((vm.activeInterval ? ' high' : ' low') + ' ' + vm.activeRound) : '');
            console.log('vm.activeState', vm.activeState);

            if (vm.states[vm.activeState] === 'interval' && vm.activeRound < vm.rounds) {
                console.log('INTERVAL');
                vm.stateTime = vm.activeInterval ? vm['lowTime'] : vm['highTime'];
                angular.element('#timert')[0].addCDSeconds(vm.activeInterval ? vm['lowTime'] : vm['highTime']);

                vm.activeInterval = !vm.activeInterval;
                if (vm.activeInterval === false) {
                    vm.activeRound++;
                }
            } else {
                console.log('WARM/COOL');
                vm.stateTime = vm[vm.states[vm.activeState] + 'Time'];
                angular.element('#timert')[0].addCDSeconds(vm[vm.states[vm.activeState] + 'Time']);

                vm.activeState++;
            }

            $scope.$apply();
            //setTimeout(function(){
            //vm.startTimer();
            //}, 100);
            //vm.startTimer();
            log();

        };


        vm.startTimer = function() {
            $scope.$broadcast('timer-start');
            vm.timerRunning = true;
        };
        vm.stopTimer = function() {
            $scope.$broadcast('timer-stop');
            vm.timerRunning = false;
        };

        vm.addSeconds = function(seconds) {
            $scope.$broadcast('timer-add-cd-seconds', seconds);
        };

        function log() {
            console.group('----- round ' + vm.states[vm.activeState] + (vm.states[vm.activeState] === 'interval' ? (vm.activeInterval ? ' low' : ' high' ) : '') + ' ----');
            console.log('asdasd', vm.states[vm.activeState] === 'interval' && vm.activeRound < vm.rounds);
            //console.log('strToTime', RoutineService.strToTime('01:01:15'));
            //console.log('totalTime:', vm.totalTime);
            //console.log('warmupTime:', vm.warmupTime);
            console.log('activeInterval', vm.activeInterval);
            console.log('stateTime:', vm.stateTime, 'activeState:', vm.states[vm.activeState], vm.activeState);
            console.log('rounds:', vm.rounds, 'active:', vm.activeRound);
            console.groupEnd();
        }

    }
})();
