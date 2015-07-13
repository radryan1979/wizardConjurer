// the directive
(function() {
	angular.module('conjurer')
	.directive('wizardController', wizard);
	
	wizardController.$inject = ['wizardService'];
	
	function wizardController(wizardService){
		return {
			restrict: 'AEC',
			replace: true,
			transclude: true,
			scope: {
				name: '@'
				}
			},
			
			controller: function($scope,$element,$attrs,$transclue) {
				var vm = this;
				
				vm.initialize = function(){
					// get steps and populate directive navbar
					// set default values for step configs
					// set current step to beginning
					// set directive to show first step
				};
				vm.configureIbox = function(){};
				
				vm.movePrevious = function(){
					// get current step
					// can exit this step?
					// peek current step - canEnter?
					// update controller and set new step active
					// if this is the first step, there is no previous step
				};
				
				vm.moveNext = function(){
					// get current step
					// can exit this step?
					// peek current step - canEnter?
					// update controller and set new step active
					// if this is the last step, change the button to be a finish button
				};
				
				vm.goTo = function(stepNumer){
					// check to see if current step can exit
					// check to see if destination step can enter
					// update directive to display new step
				};
				
				vm.finishWizard = function(){
					// finish logic goes here
				};	
				
			},
			
			controllerAs: 'vm',
			template: '<div ng-include="vm.tempalteUrl"></div>',
			compile: function(element) {
				return recursionHelper.compile(element);
				}
		}
})();
