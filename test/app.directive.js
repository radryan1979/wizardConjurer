// Basic test directive that can be used to manipulate the flags of a given step.
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
			var _stepFlags = wizardServiceApi.getStepFlags(_wizName,_stepNum);
			
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
		template: 	"<div class='col-sm-10'>" +
                        "<div class='row'><h2>This is step {{wizStepVm.stepName}}</h2><p>Use the below buttons to toggle the properties of the step.</p>" +
                            "<p><blockquote>You can not change these:</blockquote><span>IsFirstStep: {{wizStepVm.stepIsFirstStep}}</span><br>" +
                            "<span>IsLastStep: {{wizStepVm.stepIsLastStep}}</span>" +
                        "</div>" +
                        "<div class='row'>"+
                            "<div class='col-sm-6'><p><h4>Step has changes:</h3><span>Current value:<strong> {{wizStepVm.stepHasChanges}} </strong></span></p></div>" +
                            "<div class='col-sm-4'><button type='button' class='btn btn-info' ng-click='wizStepVm.toggleHasChanges()'>Toggle stepHasChanges</button></div>" +
                        "</div>" +
                        "<div class='row'>" +
                            "<div class='col-sm-6'><p><h4>Step is complete:</h3><span>Current value:<strong> {{wizStepVm.stepIsComplete}} </strong></span></p></div>" +
                            "<div class='col-sm-4'><button type='button' class='btn btn-info' ng-click='wizStepVm.toggleIsComplete()'>Toggle stepComplete</button></div>" +
                        "</div>" +
                        "<div class='row'>" +
                            "<div class='col-sm-6'><p><h4>Step can enter:</h3>	<span>Current value:<strong> {{wizStepVm.stepCanEnter}} </strong></span></p></div>" +
                            "<div class='col-sm-4'><button type='button' class='btn btn-info' ng-click='wizStepVm.toggleCanEnter()'>Toggle canEnter</button></div>" +
                        "</div>" +
                        "<div class='row'>" +
                            "<div class='col-sm-6'><p><h4>Step can exit:</h3><span>Current value:<strong> {{wizStepVm.stepCanExit}} </strong></span></p></div>" +
                            "<div class='col-sm-4'><button type='button' class='btn btn-info' ng-click='wizStepVm.toggleCanExit()'>Toggle canExit</button></div>" +
                        "</div>" +
                       "</div>",
		}
	}
	
})();