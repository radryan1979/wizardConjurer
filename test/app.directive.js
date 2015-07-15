(function(){
	'use strict';
	
	angular.module('app')
	.directive('myStep',myStep)
	
	myStep.$inject = ['wizardServiceApi'];
	
	function myStep(wizardServiceApi){
		return {
		restrict: 'AEC',
			transclude: true,
			scope: {
				wizardName: '@wizardName',
				stepNumber: '@stepNumber'
				},
		controller: function($scope,wizardServiceApi){
			var wizStepVm = this;
			var _wizName = $scope.wizardName;
			var _stepNum = $scope.stepNumber;
			console.log(_wizName,_stepNum);
			var _stepFlags = wizardServiceApi.getStepFlags(_wizName,_stepNum);
			console.log(_stepFlags);
			
			wizStepVm.stepName = _stepFlags.stepName;
			wizStepVm.stepHasChanges = _stepFlags.stepHasChanges;
			wizStepVm.stepIsComplete = _stepFlags.stepComplete;
			wizStepVm.stepCanEnter = _stepFlags.canEnter;
			wizStepVm.stepCanExit = _stepFlags.canExit;
			wizStepVm.stepIsFirstStep = _stepFlags.isFirstStep;
			wizStepVm.stepIsLastStep = _stepFlags.isLastStep;
			wizStepVm.stepData = _stepFlags.stepData;
			
			wizStepVm.toggleHasChanges = function(){
				wizStepVm.stepHasChanges = !wizStepVm.stepHasChanges;
				wizardServiceApi.setStepProperty(_wizName,_stepNum,'stepHasChanges',wizStepVm.stepHasChanges);
			};
			wizStepVm.toggleIsComplete = function(){
				wizStepVm.stepIsComplete = !wizStepVm.stepIsComplete;
				wizardServiceApi.setStepProperty(_wizName,_stepNum,'stepComplete',wizStepVm.stepIsComplete);
			};
			wizStepVm.toggleCanEnter = function(){
				wizStepVm.stepCanEnter = !wizStepVm.stepCanEnter;
				wizardServiceApi.setStepProperty(_wizName,_stepNum,'canEnter',wizStepVm.stepCanEnter);
			};
			wizStepVm.toggleCanExit = function(){
				wizStepVm.stepCanExit = !wizStepVm.stepCanExit;
				wizardServiceApi.setStepProperty(_wizName,_stepNum,'canExit',wizStepVm.stepCanExit);
			};
			},
		controllerAs: 'wizStepVm',
		template: 	"<div><h2>This is step {{wizStepVm.stepName}}</h2><p>Use the below buttons to toggle the properties of the step.</p>"+
					"<p><blockquote>You can not change these:</blockquote><span>IsFirstStep: {{wizStepVm.stepIsFirstStep}}</span><br>"+
					"<span>IsLastStep: {{wizStepVm.stepIsLastStep}}</span>"+
					"<p><h3>Step has changes:</h3><span>Current value: {{wizStepVm.stepHasChanges}}</span>"+
					"<button type='button' class='btn btn-info' ng-click='wizStepVm.toggleHasChanges()'>Toggle stepHasChanges</button>"+
					"</p><p><h3>Step is complete:</h3><span>Current value: {{wizStepVm.stepIsComplete}}</span>"+
					"<button type='button' class='btn btn-info' ng-click='wizStepVm.toggleIsComplete()'>Toggle stepComplete</button>"+
					"</p><p><h3>Step can enter:</h3>	<span>Current value: {{wizStepVm.stepCanEnter}}</span>"+
					"<button type='button' class='btn btn-info' ng-click='wizStepVm.toggleCanEnter()'>Toggle canEnter</button>"+
					"</p><p><h3>Step can exit:</h3><span>Current value: {{wizStepVm.stepCanExit}}</span>"+
					"<button type='button' class='btn btn-info' ng-click='wizStepVm.toggleCanExit()'>Toggle canExit</button>"+
					"</p></div>"
		}
	}
	
})();