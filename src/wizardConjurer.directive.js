// the directive
(function() {
	'use strict';
	
	angular.module('wizardConjurer')
	.directive('wizardControl', wizardControl);
	
	wizardControl.$inject = ['wizardServiceApi','$rootScope'];
	
	function wizardControl(wizardServiceApi,$rootScope,$transclude,$compile){
		return {
			restrict: 'AE',
			transclude: true,
			scope: {
				wizname: '@wizardName'
				},
			
			controller: function($scope,wizardServiceApi, $compile) {
				var vm = this;
				
				// Controller properties
				vm.wizardName = $scope.wizname;
				vm.wizardSteps = null;
				vm.currentStep = null;
				vm.wizardSteps = null;
				vm.showPrevious = false;
				vm.showNext = false;
				vm.showCancel = false;
				vm.btnPreviousText = null;
				vm.btnNextText = null;
				vm.btnCancelText = null;
				vm.disablePrevious = false;
				vm.disableNext = false;
				vm.disableCancel = false;
				
				// Controller methods
				vm.movePrevious = movePrevious;
				vm.moveNext = moveNext;
				vm.goToStep = goToStep;
				vm.cancelWizard = cancelWizard;
				
				$rootScope.$on('wizardConjurerUpdateDisplay', function(){
					updateDisplay();
				});
				
				// Initialize the controller
				initialize();
				
				function initialize(){
					vm.currentStep = wizardServiceApi.getCurrentStep(vm.wizardName);
					vm.wizardSteps = wizardServiceApi.getWizardSteps(vm.wizardName);
					
					updateDisplay();
				};
				
				// Called to update the navigation buttons after a step change.
				function updateDisplay()
				{
					var stepButtons = wizardServiceApi.getStepButtons(vm.wizardName,vm.currentStep);
					
					// Set visibility for the buttons on this step
					vm.showPrevious = stepButtons.btnPrevious.isVisible;
					vm.showNext = stepButtons.btnNext.isVisible;
					vm.showCancel = stepButtons.btnCancel.isVisible;
					
					// Set the display text for the buttons on this step
					vm.btnPreviousText = stepButtons.btnPrevious.displayText;
					vm.btnNextText = stepButtons.btnNext.displayText;
					vm.btnCancelText = stepButtons.btnCancel.displayText;
					
					// Enable or disbale the buttons
					vm.disablePrevious = stepButtons.btnPrevious.isDisabled;
					vm.disableNext = stepButtons.btnNext.isDisabled;
					vm.disableCancel = stepButtons.btnCancel.isDisabled;
					
					// Set a currentStep on $scope that can be watched by child directives
					$scope.currentStep = parseInt(vm.currentStep);
				};
				
				function movePrevious()
				{
					var canEnterPrevious = false;
					
					// get current step
					var currentStep = parseInt(wizardServiceApi.getCurrentStep(vm.wizardName));			
					var stepFlags = wizardServiceApi.getStepFlags(vm.wizardName,vm.currentStep);
					var previousStepFlags = wizardServiceApi.getStepFlags(vm.wizardName,currentStep - 1);
					var stepButtons = wizardServiceApi.getStepButtons(vm.wizardName,vm.currentStep);
					
					if (previousStepFlags !== undefined)
					{
							canEnterPrevious = previousStepFlags.canEnter;		
					};
					
					if (stepButtons.btnPrevious.validateFunction !== undefined 
						&& stepButtons.btnPrevious.validateFunction !== null)
					{
						stepButtons.btnPrevious.validateFunction();
					};
					
					// can exit this step and enter next step
					if (canEnterPrevious === true && stepFlags.canExit === true) 
					{
						var newStep = vm.currentStep - 1;
						wizardServiceApi.setCurrentStep(vm.wizardName,newStep);
						vm.currentStep = newStep;
						
						// Run the custom button function if it is defined.
						if (stepButtons.btnPrevious.onClick !== undefined 
							&& stepButtons.btnPrevious.onClick !== null)
						{
							stepButtons.btnPrevious.onClick();
						};
						
						updateDisplay();
					} else {
						alert("This step is not complete.");
					};
				};
				
				function moveNext()
				{
					var canEnterNext = false;
					var currentStep = parseInt(wizardServiceApi.getCurrentStep(vm.wizardName));
					var stepFlags = wizardServiceApi.getStepFlags(vm.wizardName,currentStep);
					var nextStepFlags = wizardServiceApi.getStepFlags(vm.wizardName,currentStep + 1);
					var stepButtons = wizardServiceApi.getStepButtons(vm.wizardName,vm.currentStep);
					
					if (nextStepFlags !== undefined)
					{
						canEnterNext = nextStepFlags.canEnter;
					};
					
					if (stepButtons.btnNext.validateFunction !== undefined
						 && stepButtons.btnNext.validateFunction !== null)
					{
						stepButtons.btnNext.validateFunction();
					};
					
					if (canEnterNext === true && stepFlags.canExit===true) 
					{
						var newStep = currentStep + 1;
						wizardServiceApi.setCurrentStep(vm.wizardName, newStep);
						vm.currentStep = newStep;
						
						// Run the custom button function if it is defined.
						if (stepButtons.btnNext.onClick !== undefined 
							&& stepButtons.btnNext.onClick !== null)
						{
							stepButtons.btnNext.onClick();
						};
						
						updateDisplay();
					}
					 else 
					{
						alert("This step is not complete.");
					};
				};
				
				function goToStep(stepNumber)
				{
					var canEnterStep = false;
					var currentStep = wizardServiceApi.getCurrentStep(vm.wizardName);
					var stepFlags = wizardServiceApi.getStepFlags(vm.wizardName,currentStep);
					var nextStepFlags = wizardServiceApi.getStepFlags(vm.wizardName,stepNumber);
					var stepButtons = wizardServiceApi.getStepButtons(vm.wizardName,vm.currentStep);
					
					if (parseInt(stepNumber) < parseInt(currentStep))
					{
						if (stepButtons.btnPrevious.validateFunction !== undefined 
						&& stepButtons.btnPrevious.validateFunction !== null)
						{
							stepButtons.btnPrevious.validateFunction();
						};
						// Run the custom button function if it is defined.
						if (stepButtons.btnPrevious.onClick !== undefined 
							&& stepButtons.btnPrevious.onClick !== null)
						{
							stepButtons.btnPrevious.onClick();
						};
					}
					else if (parseInt(stepNumber) > parseInt(currentStep))
					{
						if (stepButtons.btnNext.validateFunction !== undefined
						 && stepButtons.btnNext.validateFunction !== null)
						{
							stepButtons.btnNext.validateFunction();
						};
						// Run the custom button function if it is defined.
						if (stepButtons.btnNext.onClick !== undefined &&
							stepButtons.btnNext.onClick !== null)
						{
							stepButtons.btnNext.onClick();
						};
					};
					
					if (nextStepFlags !== undefined)
					{
						canEnterStep = nextStepFlags.canEnter;
					};
					
					if (canEnterStep === true && stepFlags.canExit === true) 
					{
						wizardServiceApi.setCurrentStep(vm.wizardName, stepNumber);
						vm.currentStep = stepNumber;
						updateDisplay();
					};
				};
				
				function cancelWizard() {
					
				};
				
				// When the directive goes out of scope, remove the wizard
				// from the service.
				$scope.$on('$destroy', function() {
					wizardServiceApi.removeWizard(vm.wizardName);					
				});
				
			},
			controllerAs: 'vm',
			template: "<div>"+
					"<div class='row'>"+
					"<ul><li ng-repeat='(key,value) in vm.wizardSteps' ng-click='vm.goToStep(key)' role='presentation' ng-class=\"{'btn btn-primary active': key == vm.currentStep, 'btn btn-primary': key !== vm.currentStep}\">{{value.stepName}}</li></ul>"+
					"</div>"+
					"<div class='row col-md-10'><div class='col-md-8'><ng-transclude></ng-transclude></div><div>" +
					"<div class='row col-md-10'><div class='col-md-6'>&nbsp;</div>"+
					"<div class='col-md-4'>" +
                        "<button type='button' class='btn btn-primary' ng-click='vm.movePrevious()' ng-show='vm.showPrevious' ng-disabled='vm.disablePrevious'>{{ vm.btnPreviousText }}</button>" +
					    "<button type='button' class='btn btn-primary' ng-click='vm.moveNext()' ng-show='vm.showNext' ng-disabled='vm.disableNext'>{{ vm.btnNextText }}</button>" +
						"<button type='button' class='btn btn-primary' ng-click='vm.cancelWizard()' ng-show='vm.showCancel' ng-disabled='vm.disableCancel'>{{ vm.btnCancelText }}</button>" +
                    "</div></div>" +
					"</div>"
		}
	}
})();