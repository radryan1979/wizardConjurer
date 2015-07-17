(function(){
	'use strict';
	
	angular.module('conjurer')
	
	.factory('wizardServiceApi', wizardServiceApi);
	
	wizardServiceApi.$inject = ['$rootScope'];
	
	function wizardServiceApi($rootScope){
		var service = {};
		
		var _wizardList = {
			"defaultWizard" : {}
		};
		
		// Provided as a reference for what a wizard and corresponding
		// step object look like.
		var _defaultWizard = {
			wizardName: "defaultWizard",
			currentStep:0,
			onFinish:function(){},
			numberOfSteps:0,
			steps: {
				1:{
					stepName:"step one",
					stepHasChanges:false,
					canEnter:false,
					canExit:false,
					stepComplete:false,
					isFirstStep:false,
					isLastStep:false,
					stepData:{}
				}
			}
		};
		
		_wizardList.defaultWizard = _defaultWizard;
		
		// Create a new empty wizard object on
		// _wizardList
		service.createWizard = function(wizardName){
			_wizardList[wizardName] = {
				wizardName: wizardName,
				currentStep: 0,
				onFinish: null,
				onCancel: null,
				numberOfSteps: 0,
				steps: {}
			};
		};
		
		// Sets a property for a given wizard.
		service.setWizardProperty = function(wizardName, propertyName, data){
			_wizardList[wizardName][propertyName] = data;
		};
		
		// Gets a property for a given wizard.
		service.getWizardProperty = function(wizardName, propertyName){
			return _wizardList[wizardName][propertyName];
		};
		
		// Returns the entire object for a given wizard
		// on the _wizardList
		service.getWizardObject = function(wizardName){
			return _wizardList[wizardName];
		};
		
		// Remove an existing wizard from _wizardList
		service.removeWizard = function(wizardName){
			if (_wizardList.hasOwnProperty(wizardName)) {
				delete _wizardList[wizardName];
			};
		};
		
		// Set the current step for a given wizard.
		service.setCurrentStep = function(wizardName, data){
			_wizardList[wizardName]['currentStep'] = data;
		};
		
		// Return current step for a given wizard.
		service.getCurrentStep = function(wizardName){
			return _wizardList[wizardName]['currentStep'];
		};
		
		// Adds a new step to a given wizard. If the data param
		// is null or an empty object, the step properties are
		// filled with default values.
		service.addStep = function(wizardName, stepNumber, data) {
			var _stepProperties = {
				stepName:"",
				stepHasChanges:false,
				canEnter:true,
				canExit:false,
				stepComplete:false,
				isFirstStep:false,
				isLastStep:false,
				stepData:{}
			};
			if (data !== null || data !== {}){
				_stepProperties.stepName = data.stepName;
				_stepProperties.stepHasChanges = data.stepHasChanges;
				_stepProperties.canEnter = data.canEnter;
				_stepProperties.canExit = data.canExit;
				_stepProperties.stepComplete = data.stepComplete;
				_stepProperties.isFirstStep = data.isFirstStep;
				_stepProperties.isLastStep = data.isLastStep;
				_stepProperties.stepData = data.stepData;
			};
			_wizardList[wizardName]['steps'][stepNumber] = _stepProperties;
		};
		
		// Removes a step from a given wizard.
		service.removeStep = function(wizardName, stepNumber){
			if (_wizardList[wizardName].hasOwnProperty(stepNumber)) {
				delete _wizardList[wizardName][stepNumber];
			};
		};
		
		// Returns the steps
		service.getWizardSteps = function(wizardName){
			return _wizardList[wizardName]['steps'];
		};
		
		// Used to set any of the properties on a given step.
		service.setStepProperty = function(wizardName, stepNumber, propertyName, data){
			_wizardList[wizardName]['steps'][stepNumber][propertyName] = data;
		};
		
		// Return the value of any property on a given step.
		service.getStepProperty = function(wizardName, stepNumber, propertyName){
			return _wizardList[wizardName]['steps'][stepNumber][propertyName];
		};
		
		// Return the properties of a step.
		service.getStepFlags = function(wizardName, stepNumber){
			return _wizardList[wizardName]['steps'][stepNumber];
		};
		
		return service;
	};	
})();