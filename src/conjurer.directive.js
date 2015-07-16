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
				
				vm.nextButtonText = "Next";
				vm.wizardName = $scope.wizname;
				vm.currentStep = null;
				vm.wizardSteps = null;
				vm.currentStep = wizardServiceApi.getCurrentStep(vm.wizardName);
				vm.wizardSteps = wizardServiceApi.getWizardSteps(vm.wizardName);
				
				var startingStep = wizardServiceApi.getStepFlags(vm.wizardName,vm.currentStep);
				if (startingStep.isFirstStep === true){
					vm.showPrevious = false;
				} else {
					vm.showPrevious = true;
				};
				
				$("[step-number]").each(function() {
						if ($(this).attr('step-number') == startingStep) {
							$(this).show();
						}
						else {
							$(this).hide();
						};
					});
				
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
						vm.showPrevious = true;					
					} else {
						alert("This is the first step of the wizard.");
						vm.showPrevious = false;
						return;
					}
					// can exit this step and enter next step
					if (canEnterPrevious===true && stepFlags.canExit===true) {
						var newStep = Number(vm.currentStep) - 1;
						wizardServiceApi.setCurrentStep(vm.wizardName,newStep);
						vm.currentStep = newStep;
					} else {
						alert("This step is not complete.");
					}	
					// TODO: update controller and set new step active
					
				};
				
				vm.moveNext = function(){
					var canEnterNext = true;
					vm.showPrevious = true;
					// get current step
					vm.currentStep = wizardServiceApi.getCurrentStep(vm.wizardName);
					
					var stepFlags = wizardServiceApi.getStepFlags(vm.wizardName,vm.currentStep);
					
					// if this is the first step, there is no previous step
					if (stepFlags.isLastStep){
						vm.nextButtonText = "Finish";
						alert("This is the last step of the wizard.");
					} else {
						// peek destination step - canEnter?
						canEnterNext = wizardServiceApi.getStepProperty(
							vm.wizardName,(vm.currentStep+1),'canEnter');
						vm.nextButtonText = "Next";				
					}
					// can exit this step and enter next step
					if (canEnterNext===true && stepFlags.canExit===true) {
						var newStep = Number(vm.currentStep) +1;
						wizardServiceApi.setCurrentStep(vm.wizardName,newStep);
						vm.currentStep = newStep;
					} else {
						alert("This step is not complete.");
					}
					// TODO: update controller and set new step active

					// if this is the last step, change the button to be a finish button
					// this still gets called on the last step, but will call the finish method
				};
				
				vm.goTo = function(stepNumber){
					var canEnterNext = false;
					vm.currentStep = wizardServiceApi.getCurrentStep(vm.wizardName);
					var stepFlags = wizardServiceApi.getStepFlags(vm.wizardName,vm.currentStep);
					if (stepFlags.isLastStep){
						vm.nextButtonText = "Finish";
						alert("This is the last step of the wizard.");
					} else {
						vm.nextButtonText = "Next";
						canEnterNext = wizardServiceApi.getStepProperty(
						vm.wizardName,(stepNumber),'canEnter');
					}
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
					"<li ng-repeat='(key,value) in vm.wizardSteps' ng-click='vm.goTo(key)' role='presentation' ng-class=\"{'btn btn-sucess': key == vm.currentStep, 'btn btn-primary': key !== vm.currentStep}\">{{value.stepName}}</li>" +
					"</ul></div><div>" +
					"<div ng-if='vm.currentStep == 1'>Step one directive.</div><div ng-if='vm.currentStep == 2'>Step two directive.</div><div ng-if='vm.currentStep == 3'>Step three directive."+
					"</div><ng-transclude></ng-transclude></div><div>" +
					"<button type='button' class='btn btn-info' ng-click='vm.movePrevious()' ng-show='vm.showPrevious'>Previous</button>" +
					"<button type='button' class='btn btn-info' ng-click='vm.moveNext()'>{{ vm.nextButtonText }}</next></div>",
			link: function(scope,elm,attrs){
				scope.$watch('vm.currentStep', function(data){
					console.log("Current Step Changed!", data);
					$("[step-number]").each(function() {
						console.log('An element',$(this));
						console.log($(this).attr('step-number'));
						if ($(this).attr('step-number') === data) {
								$(this).show();
						}
						else {
							$(this).hide();
						};
						//$(this).attr('ngShow',true);
					});
					// angular.forEach(angular.element('[step-number]'), function(key,){
					// 	console.log('An element:', $(value));
					// 	$(value).attr('ngShow',true);
						// console.log('The key:',key);
						// console.log('Element attribute value:',value.attr(['stepNumber']));
						// if (value === data) {
						// 	angular.element('[step-number]="'+value+'"').attr('ngShow',true);
						// } else{
						// 	angular.element('[step-number]="'+value+'"').attr('ngShow',false);
						// }
				// });
								});
				//var myEl = elm.find('[step-number]').each()
				//console.log("My element:",myEl);
				
			}
		}
	}
})();

// ngular.forEach(angular.element("li a"), function(value, key){
//      var a = angular.element(value);
//      a.addClass('ss');
// });