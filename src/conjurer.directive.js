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
				
				vm.showFinish = false;
				vm.wizardName = $scope.wizname;
				vm.wizardSteps = null;
				vm.currentStep = wizardServiceApi.getCurrentStep(vm.wizardName);
				vm.wizardSteps = wizardServiceApi.getWizardSteps(vm.wizardName);
				
				var startingStep = wizardServiceApi.getStepFlags(vm.wizardName,vm.currentStep);
				if (startingStep.isFirstStep === true){
					vm.showPrevious = false;
					vm.showNext = true;
				} else {
					vm.showPrevious = true;
				};
				
				jQuery("[step-number]").each(function() {
						console.log("Did I get called?");
						if (jQuery(this).attr('step-number') == vm.currentStep) {
							jQuery(this).show();
						}
						else {
							jQuery(this).hide();
						};
					});
				
				vm.updateDisplay = function(){
					var stepFlags = wizardServiceApi.getStepFlags(vm.wizardName,vm.currentStep);
					if (stepFlags.isFirstStep) {
						vm.showPrevious = false;
						vm.showNext = true;
						};
					if (stepFlags.isLastStep) {
						vm.showNext = false;
						vm.showFinish = true;
						vm.showPrevious = true;
						};
					if (!stepFlags.isLastStep) {
						vm.showNext = true;
						vm.showFinish = false;
						vm.showPrevious = true;
					};
				};
				
				vm.movePrevious = function(){
					var canEnterPrevious = false;
					
					// get current step
					var currentStep = wizardServiceApi.getCurrentStep(vm.wizardName);			
					var stepFlags = wizardServiceApi.getStepFlags(vm.wizardName,vm.currentStep);
					var previousStepFlags = wizardServiceApi.getStepFlags(vm.wizardName,currentStep-1);
					
					if (previousStepFlags !== undefined){
							canEnterPrevious = previousStepFlags.canEnter;			
						};
					
					// can exit this step and enter next step
					if (canEnterPrevious===true && stepFlags.canExit===true) {
						var newStep = vm.currentStep - 1;
						wizardServiceApi.setCurrentStep(vm.wizardName,newStep);
						vm.currentStep = newStep;
						vm.updateDisplay();
					} else {
						alert("This step is not complete.");
					};
				};
				
				vm.moveNext = function(){
					var canEnterNext = false;
					vm.showPrevious = true;
					// get current step
					var currentStep = wizardServiceApi.getCurrentStep(vm.wizardName);
					var stepFlags = wizardServiceApi.getStepFlags(vm.wizardName,currentStep);
					var nextStepFlags = wizardServiceApi.getStepFlags(vm.wizardName,currentStep+1);
					
					if (nextStepFlags !== undefined){
						canEnterNext = nextStepFlags.canEnter;
					};
					
					if (canEnterNext===true && stepFlags.canExit===true) {
						var newStep = currentStep +1;
						console.log("newStep:",newStep);
						wizardServiceApi.setCurrentStep(vm.wizardName,newStep);
						vm.currentStep = newStep;
						vm.updateDisplay();
					} else {
						alert("This step is not complete.");
					};
				};
				
				vm.goTo = function(stepNumber){
					var canEnterStep = false;
					var currentStep = wizardServiceApi.getCurrentStep(vm.wizardName);
					var stepFlags = wizardServiceApi.getStepFlags(vm.wizardName,currentStep);
					var nextStepFlags = wizardServiceApi.getStepFlags(vm.wizardName,stepNumber);
					if (nextStepFlags !== undefined){
						canEnterStep = nextStepFlags.canEnter;
					};
					if (canEnterStep===true && stepFlags.canExit===true) {
						wizardServiceApi.setCurrentStep(vm.wizardName,stepNumber);
						vm.currentStep = stepNumber;
						vm.updateDisplay();
					};
				};
				
				vm.finishWizard = function(){
					alert("You clicked finish.");
				};
				
				$scope.$on('$destroy', function() {
					wizardServiceApi.removeWizard(name);					
				});
				
			},
			controllerAs: 'vm',
			template: "<div>"+
					"<div class='row'>"+
					"<ul><li ng-repeat='(key,value) in vm.wizardSteps' ng-click='vm.goTo(key)' role='presentation' ng-class=\"{'btn btn-sucess': key == vm.currentStep, 'btn btn-primary': key !== vm.currentStep}\">{{value.stepName}}</li></ul>"+
					"</div>"+
					"<div class='row col-md-10'><div class='col-md-8'><ng-transclude></ng-transclude></div><div>" +
					"<div class='row col-md-10'><div class='col-md-6'>&nbsp;</div>"+
					"<div class='col-md-4'>" +
                        "<button type='button' class='btn btn-primary' ng-click='vm.movePrevious()' ng-show='vm.showPrevious'>Previous</button>" +
					    "<button type='button' class='btn btn-primary' ng-click='vm.moveNext()' ng-show='vm.showNext'>Next</button>" +
                        "<button type='button' class='btn btn-primary' ng-click='vm.finishWizard()' ng-show='vm.showFinish'>Finish</button>"+
                    "</div></div>" +
					"</div",
					
			link: function(scope,elm,attrs){
				scope.$watch('vm.currentStep', function(data){
					console.log("Current Step Changed!", data);
					jQuery("[step-number]").each(function() {
						console.log('An element',jQuery(this));
						console.log(jQuery(this).attr('step-number'));
						if (jQuery(this).attr('step-number') == data) {
								console.log("Setting directive to show:");
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