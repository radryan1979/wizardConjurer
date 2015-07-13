// the directive
(function() {
	angular.module('conjurer')
	.directive('wizardController', wizardController);
	
	wizardController.$inject = ['wizardServiceApi'];
	
	function wizardController(wizardServiceApi){
		return {
			restrict: 'AEC',
			replace: true,
			transclude: true,
			scope: {
				name: '@wizardName'
				},
			
			controller: function($scope,$element,$attrs,$transclue) {
				var vm = this;
				
				vm.templateUrl = "conjure.template.html";
				
				_wizardName = $scope.name;
				vm.currentStep = null;
				vm.wizardSteps = null;
				
				vm.initialize = function(){
					vm.currentStep = wizardServiceApi.getCurrentStep(_wizardName);
					vm.wizardSteps = wizardServiceApi.getWizardProperty(_wizardName,steps);
					// get steps and populate directive navbar
					// set default values for step configs
					// set current step to beginning
					// set directive to show first step
				};
				vm.configureIbox = function(){};
				
				vm.movePrevious = function(){
					var canEnterPrevious = true;
					
					// get current step
					vm.currentStep = wizardServiceApi.getCurrentStep(_wizardName);			
					var stepFlags = wizardServiceApi.getStepFlags(_wizardname,vm.currentStep);
					
					// if this is the first step, there is no previous step
					if (!stepFlags.isFirstStep){
						// peek destination step - canEnter?
						canEnterPrevious = wizardServiceApi.getStepProperty(
							_wizardname,(vm.currentStep-1),'canEnter');						
					};
					// can exit this step and enter next step
					if (canEnterPrevious && stepFlags.canExit) {
						wizardServiceApi.setCurrentStep(_wizardName,vm.currentStep-1);
						vm.currentStep = vm.currentStep--;
					}	
					// TODO: update controller and set new step active
					
				};
				
				vm.moveNext = function(){
					var canEnterNext = true;
					
					// get current step
					vm.currentStep = wizardServiceApi.getCurrentStep(_wizardName);			
					var stepFlags = wizardServiceApi.getStepFlags(_wizardname,vm.currentStep);
					
					// if this is the first step, there is no previous step
					if (!stepFlags.isLastStep){
						// peek destination step - canEnter?
						canEnterNext = wizardServiceApi.getStepProperty(
							_wizardname,(vm.currentStep+1),'canEnter');						
					};
					// can exit this step and enter next step
					if (canEnterNext && stepFlags.canExit) {
						wizardServiceApi.setCurrentStep(_wizardName,vm.currentStep+1);
						vm.currentStep = vm.currentStep++;
					}	
					// TODO: update controller and set new step active

					// if this is the last step, change the button to be a finish button
					// this still gets called on the last step, but will call the finish method
				};
				
				vm.goTo = function(stepNumer){
					// check to see if current step can exit
					// check to see if destination step can enter
					// update directive to display new step
				};
				
				$scope.$on('$destroy', function() {
					wizardServiceApi.removeWizard(name);					
				})
			},
			
			controllerAs: 'vm',
			template: '<div ng-include="vm.tempalteUrl"></div>',
			compile: function(element) {
				return recursionHelper.compile(element);
				}
		}
	}
})();
