(function(){
	'use strict';
	
	angular.module('conjurer')
	.directive('wizardStep',wizardStep);
	
	wizardStep.$inject = ['wizardServiceApi'];
	
	function wizardStep(wizardServiceApi) {
		return {
			restrict: 'A',
			transclude: true,
			link: function(scope, element, attrs){
				//var elStepNumber = attrs['stepNumber'];
				//var currentStep = $scope.currentStep;
				console.log("wizard-step currentStep: ", attrs);
			}
			
		}
	}
	
});