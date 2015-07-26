// the directive
(function() {
	'use strict';
	
	angular.module('wizardConjurer')
	.directive('wizardControl', wizardControl);
	
	wizardControl.$inject = ['wizardServiceApi'];
	
	function wizardControl(wizardServiceApi,$transclude,$compile){
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
				
				// Controller methods
				vm.movePrevious = movePrevious;
				vm.moveNext = moveNext;
				vm.goToStep = goToStep;
				
				// Initialize the controller
				initialize();
				
				function initialize(){
					vm.currentStep = wizardServiceApi.getCurrentStep(vm.wizardName);
					vm.wizardSteps = wizardServiceApi.getWizardSteps(vm.wizardName);
					
					updateDisplay();
										
					// Configure the initial nested directives visibility
					jQuery("[step-number]").each(function() {
						if (jQuery(this).attr('step-number') == vm.currentStep) {
							jQuery(this).show();
						}
						else {
							jQuery(this).hide();
						};
					});
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
					vm.btnCancel = stepButtons.btnCancel.displayText;
				};
				
				function movePrevious(){
					var canEnterPrevious = false;
					
					// get current step
					var currentStep = parseInt(wizardServiceApi.getCurrentStep(vm.wizardName));			
					var stepFlags = wizardServiceApi.getStepFlags(vm.wizardName,vm.currentStep);
					var previousStepFlags = wizardServiceApi.getStepFlags(vm.wizardName,currentStep - 1);
					var stepButtons = wizardServiceApi.getStepButtons(vm.wizardnae,vm.currentStep);
					
					if (previousStepFlags !== undefined){
							canEnterPrevious = previousStepFlags.canEnter;		
						};
					
					// can exit this step and enter next step
					if (canEnterPrevious === true && stepFlags.canExit === true) {
						var newStep = vm.currentStep - 1;
						wizardServiceApi.setCurrentStep(vm.wizardName,newStep);
						vm.currentStep = newStep;
						updateDisplay();
						// Run the custom button function if it is defined.
						if (stepButtons.btnPrevious.onClick !== undefined)
						{
							stepButtons.btnPrevious.onClick;
						}
					} else {
						alert("This step is not complete.");
					};
				};
				
				function moveNext(){
					var canEnterNext = false;
					var currentStep = parseInt(wizardServiceApi.getCurrentStep(vm.wizardName));
					var stepFlags = wizardServiceApi.getStepFlags(vm.wizardName,currentStep);
					var nextStepFlags = wizardServiceApi.getStepFlags(vm.wizardName,currentStep + 1);
					
					if (nextStepFlags !== undefined){
						
						canEnterNext = nextStepFlags.canEnter;
					};
					
					if (canEnterNext === true && stepFlags.canExit===true) {
						var newStep = currentStep + 1;
						wizardServiceApi.setCurrentStep(vm.wizardName, newStep);
						vm.currentStep = newStep;
						updateDisplay();
					} else {
						alert("This step is not complete.");
					};
				};
				
				function goToStep(stepNumber){
					var canEnterStep = false;
					var currentStep = wizardServiceApi.getCurrentStep(vm.wizardName);
					var stepFlags = wizardServiceApi.getStepFlags(vm.wizardName,currentStep);
					var nextStepFlags = wizardServiceApi.getStepFlags(vm.wizardName,stepNumber);
					if (nextStepFlags !== undefined){
						canEnterStep = nextStepFlags.canEnter;
					};
					if (canEnterStep === true && stepFlags.canExit === true) {
						wizardServiceApi.setCurrentStep(vm.wizardName, stepNumber);
						vm.currentStep = stepNumber;
						updateDisplay();
					};
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
                        "<button type='button' class='btn btn-primary' ng-click='vm.movePrevious()' ng-show='vm.showPrevious'>{{ vm.btnPreviousText }}</button>" +
					    "<button type='button' class='btn btn-primary' ng-click='vm.moveNext()' ng-show='vm.showNext'>{{ vm.btnNextText }}</button>" +
                    "</div></div>" +
					"</div",
					
			link: function(scope,elm,attrs){
				// When the current step updates, find the nested
				// directives in the wizard-control directive by
				// step-number attribute and toggle visibility accordingly.
				scope.$watch('vm.currentStep', function(data){
					jQuery("[step-number]").each(function() {
						if (jQuery(this).attr('step-number') == data) {
								jQuery(this).show();
						}
						else {
							jQuery(this).hide();
						};
					});
				});
			}
		}
	}
})();