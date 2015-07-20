(function(){
	'use strict';
	
	angular.module('ngConjurer')
	
	.factory('wizardServiceApi', wizardServiceApi);
	
	function wizardServiceApi(){
		var _wizardList = {
			"defaultWizard" : {}
		};
		
		// Provided as a reference for what a wizard and corresponding
		// step object look like.
		var _defaultWizard = {
			wizardName		: "defaultWizard",
			currentStep		:0,
			onFinish		:function(){},
			numberOfSteps	:0,
			steps: {
				1:{
					stepName		:"step one",
					stepHasChanges	:false,
					canEnter		:false,
					canExit			:false,
					stepComplete	:false,
					isFirstStep		:false,
					isLastStep		:false,
					stepData		:{}
				}
			}
		};
		// Create a default wizard.
		_wizardList.defaultWizard = _defaultWizard;
		
		// Returned methods of the service:
		var service = {
			createWizard		: createWizard,
			setWizardProperty	: setWizardProperty,
			getWizardProperty	: getWizardProperty,
			getWizardObject		: getWizardObject,
			removeWizard		: removeWizard,
			setCurrentStep		: setCurrentStep,
			getCurrentStep		: getCurrentStep,
			addStep				: addStep,
			removeStep			: removeStep,
			getWizardSteps		: getWizardSteps,
			setStepProperty		: setStepProperty,
			getStepProperty		: getStepProperty,
			getStepFlags		: getStepFlags
		};
		
		return service;
		
		// Create a new empty wizard object on
		// _wizardList
		function createWizard(wizardName){
			_wizardList[wizardName] = {
				wizardName		: wizardName,
				currentStep		: 0,
				onFinish		: null,
				onCancel		: null,
				numberOfSteps	: 0,
				steps			: {}
			};
		};
		
		// Sets a property for a given wizard.
		function setWizardProperty(wizardName, propertyName, data){
			_wizardList[wizardName][propertyName] = data;
		};
		
		// Gets a property for a given wizard.
		function getWizardProperty(wizardName, propertyName){
			return _wizardList[wizardName][propertyName];
		};
		
		// Returns the entire object for a given wizard
		// on the _wizardList
		function getWizardObject(wizardName){
			return _wizardList[wizardName];
		};
		
		// Remove an existing wizard from _wizardList
		function removeWizard(wizardName){
			if (_wizardList.hasOwnProperty(wizardName)) {
				delete _wizardList[wizardName];
			};
		};
		
		// Set the current step for a given wizard.
		function setCurrentStep(wizardName, data){
			_wizardList[wizardName]['currentStep'] = data;
		};
		
		// Return current step for a given wizard.
		function getCurrentStep(wizardName){
			return _wizardList[wizardName]['currentStep'];
		};
		
		// Adds a new step to a given wizard. If the data param
		// is null or an empty object, the step properties are
		// filled with default values.
		function addStep(wizardName, stepNumber, data) {
			var _stepProperties = {
				stepName		:"",
				stepHasChanges	:false,
				canEnter		:true,
				canExit			:false,
				stepComplete	:false,
				isFirstStep		:false,
				isLastStep		:false,
				stepData		:{}
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
		function removeStep(wizardName, stepNumber){
			if (_wizardList[wizardName].hasOwnProperty(stepNumber)) {
				delete _wizardList[wizardName][stepNumber];
			};
		};
		
		// Returns the steps
		function getWizardSteps(wizardName){
			return _wizardList[wizardName]['steps'];
		};
		
		// Used to set any of the properties on a given step.
		function setStepProperty(wizardName, stepNumber, propertyName, data){
			_wizardList[wizardName]['steps'][stepNumber][propertyName] = data;
		};
		
		// Return the value of any property on a given step.
		function getStepProperty(wizardName, stepNumber, propertyName){
			return _wizardList[wizardName]['steps'][stepNumber][propertyName];
		};
		
		// Return the properties of a step.
		function getStepFlags(wizardName, stepNumber){
			return _wizardList[wizardName]['steps'][stepNumber];
		};
	};	
})();