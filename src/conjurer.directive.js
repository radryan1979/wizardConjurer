// the directive
(function() {
	'use strict';
	
	angular.module('conjurer')
	.directive('wizardControl', wizardControl);
	
	wizardControl.$inject = ['wizardServiceApi','$compile'];
	
	function wizardControl(wizardServiceApi,$transclude,$compile){
		return {
			restrict: 'AE',
			transclude: true,
			scope: {
				wizname: '@wizardName'
				},
			
			controller: function($scope,wizardServiceApi, $compile) {
				var vm = this;
				
				vm.wizardName = $scope.wizname;
				vm.currentStep = null;
				vm.wizardSteps = null;
				vm.currentStep = wizardServiceApi.getCurrentStep(vm.wizardName);
				vm.wizardSteps = wizardServiceApi.getWizardSteps(vm.wizardName);
				
				vm.movePrevious = function(){
					var canEnterPrevious = false;
					
					// get current step
					vm.currentStep = wizardServiceApi.getCurrentStep(vm.wizardName);			
					var stepFlags = wizardServiceApi.getStepFlags(vm.wizardName,vm.currentStep);
					
					// if this is the first step, there is no previous step
					if (!stepFlags.isFirstStep){
						// peek destination step - canEnter?
						canEnterPrevious = wizardServiceApi.getStepProperty(
							vm.wizardName,(vm.currentStep-1),'canEnter');						
					};
					// can exit this step and enter next step
					if (canEnterPrevious==true && stepFlags.canExit==true) {
						var newStep = Number(vm.currentStep) - 1;
						wizardServiceApi.setCurrentStep(vm.wizardName,newStep);
						vm.currentStep = newStep;
					} else {
						alert("This is the first step of the wizard.");
					}	
					// TODO: update controller and set new step active
					
				};
				
				vm.moveNext = function(){
					var canEnterNext = true;
					
					// get current step
					vm.currentStep = wizardServiceApi.getCurrentStep(vm.wizardName);
					
					var stepFlags = wizardServiceApi.getStepFlags(vm.wizardName,vm.currentStep);
					
					// if this is the first step, there is no previous step
					if (!stepFlags.isLastStep){
						// peek destination step - canEnter?
						canEnterNext = wizardServiceApi.getStepProperty(
							vm.wizardName,(vm.currentStep+1),'canEnter');						
					};
					// can exit this step and enter next step
					if (canEnterNext===true && stepFlags.canExit===true) {
						var newStep = Number(vm.currentStep) +1;
						wizardServiceApi.setCurrentStep(vm.wizardName,newStep);
						vm.currentStep = newStep;
					} else {
						alert("This is the last step of the wizard.");
					}
					// TODO: update controller and set new step active

					// if this is the last step, change the button to be a finish button
					// this still gets called on the last step, but will call the finish method
				};
				
				vm.goTo = function(stepNumer){
					var canEnterNext = false;
					vm.currentStep = wizardServiceApi.getCurrentStep(vm.wizardName);
					var stepFlags = wizardServiceApi.getStepFlags(vm.wizardName,vm.currentStep);
					if (!stepFlags.isLastStep){
						canEnterNext = wizardServiceApi.getStepProperty(
							vm.wizardName,(stepNumber),'canEnter');						
					};
					if (canEnterNext===true && stepFlags.canExit===true) {
						wizardServiceApi.setCurrentStep(vm.wizardName,stepNumber);
						vm.currentStep = stepNumber;
					};
					// check to see if current step can exit
					// check to see if destination step can enter
					// update directive to display new step
				};
				
				$scope.$on('$destroy', function() {
					wizardServiceApi.removeWizard(name);					
				});
				
			},
			controllerAs: 'vm',
			template: "<div><div><ul>" +
					"<li ng-repeat='(key,value) in vm.wizardSteps' ng-click='vm.goTo(key)'>{{value.stepName}}</li>" +
					"</ul></div><div>" +
					"<div ng-if='vm.currentStep == 1'>Step one directive.</div><div ng-if='vm.currentStep == 2'>Step two directive.</div></div><div>" +
					"<button type='button' class='btn btn-info' ng-click='vm.movePrevious()'>Previous</button>" +
					"<button type='button' class='btn btn-info' ng-click='vm.moveNext()'>Next</next></div>"
		}
	}
})();
