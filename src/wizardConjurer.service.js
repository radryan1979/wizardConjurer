(function(){
	'use strict';
	
	angular.module('wizardConjurer')
	
	.factory('wizardServiceApi', wizardServiceApi);
	
	wizardServiceApi.$inject = ['$rootScope']
	
	function wizardServiceApi($rootScope)
	{
		var _wizardList = {
			"defaultWizard" : {}
		};
		
		// Provided as a reference for what a wizard and corresponding
		// step object look like.
		var _defaultWizard = {
			wizardName		: "defaultWizard",
			currentStep		:0,
			numberOfSteps	:0,
			steps: {
				1:{
					stepName		:"step one",
					stepHasChanges	:false,
					canEnter		:false,
					canExit			:false,
					onEnter			:function(){},
					onExit			:function(){},
					stepComplete	:false,
					isFirstStep		:false,
					isLastStep		:false,
					stepData		:{},
					buttons			:{
										btnPrevious:	{ 
															displayText: "Previous",
															isVisible: true,
															isDisabled: false,
															onClick: function(){},
															validateFunction: function(){}
														},
										btnNext:		{
															displayText: "Next",
															isVisible: true,
															isDisabled: false,
															onClick: function(){},
															validateFunction: function(){}
														},
										btnCancel:		{
															displayText: "Cancel",
															isVisible: false,
															isDisabled: false,
															onClick: function(){}
														}
										}
				}
			}
		};
		// Create a default wizard.
		_wizardList.defaultWizard = _defaultWizard;
		
		// Returned methods of the service:
		var service = {
			createWizard			: createWizard,
			setWizardProperty		: setWizardProperty,
			getWizardProperty		: getWizardProperty,
			setWizardData			: setWizardData,
			getWizardData			: getWizardData,
			getWizardObject			: getWizardObject,
			removeWizard			: removeWizard,
			setCurrentStep			: setCurrentStep,
			getCurrentStep			: getCurrentStep,
			addStep					: addStep,
			removeStep				: removeStep,
			getWizardSteps			: getWizardSteps,
			setStepProperty			: setStepProperty,
			getStepProperty			: getStepProperty,
			getStepFlags			: getStepFlags,
			getStepButtons			: getStepButtons,
			getStepData				: getStepData,
			setStepData				: setStepData,
			updateDisplay			: updateDisplay,
			setStepButtonProperty	: setStepButtonProperty
		};
		
		return service;
		
		// Create a new empty wizard object on
		// _wizardList
		function createWizard(wizardName)
		{
			_wizardList[wizardName] = {
				wizardName		: wizardName,
				currentStep		: 0,
				numberOfSteps	: 0,
				steps			: {},
				data			: {}
			};
		};
		
		// Sets a property for a given wizard.
		function setWizardProperty(wizardName, propertyName, data, update)
		{
			_wizardList[wizardName][propertyName] = data;
			if (update == true){
				updateDisplay();
			}
		};
		
		// Gets a property for a given wizard.
		function getWizardProperty(wizardName, propertyName)
		{
			return _wizardList[wizardName][propertyName];
		};
		
		// Replace the data object on the wizard with a new one
		function setWizardData(wizardName, data, update)
		{
			_wizardList[wizardName]['data'] = data;
			if (update == true){
				updateDisplay();
			};
		};
		
		// Returns the data object on the wizard
		function getWizardData(wizardName)
		{
			return _wizardList[wizardName]['data'];
		};
		
		// Returns the entire object for a given wizard
		// on the _wizardList
		function getWizardObject(wizardName)
		{
			return _wizardList[wizardName];
		};
		
		// Remove an existing wizard from _wizardList
		function removeWizard(wizardName)
		{
			if (_wizardList.hasOwnProperty(wizardName)) {
				delete _wizardList[wizardName];
			};
		};
		
		// Set the current step for a given wizard.
		function setCurrentStep(wizardName, data, update)
		{
			_wizardList[wizardName]['currentStep'] = data;
			if (update == true){
				updateDisplay();
			};
		};
		
		// Return current step for a given wizard.
		function getCurrentStep(wizardName)
		{
			return _wizardList[wizardName]['currentStep'];
		};
		
		// Adds a new step to a given wizard. If the data param
		// is null or an empty object, the step properties are
		// filled with default values.
		function addStep(wizardName, stepNumber, data, update) 
		{
			var _stepProperties = {
				stepName		:"",
				stepHasChanges	:false,
				canEnter		:true,
				canExit			:false,
				onEnter			:null,
				onExit			:null,
				stepComplete	:false,
				isFirstStep		:false,
				isLastStep		:false,
				stepData		:{},
				buttons:{
					btnPrevious:	{ 
										displayText: "Previous",
										isVisible: true,
										isDisabled: false,
										onClick: function(){},
										validateFunction: function(){}
									},
					btnNext:		{
										displayText: "Next",
										isVisible: true,
										isDisabled: false,
										onClick: function(){},
										validateFunction: function(){}
									},
					btnCancel:		{
										displayText: "Cancel",
										isVisible: false,
										isDisabled: false,
										onClick: function(){}
									}
						}
			};
			if (data !== null || data !== {}){
				_stepProperties.stepName = data.stepName;
				_stepProperties.stepHasChanges = data.stepHasChanges;
				_stepProperties.canEnter = data.canEnter;
				_stepProperties.canExit = data.canExit;
				_stepProperties.onEnter = data.onEnter;
				_stepProperties.onExit = data.onExit;
				_stepProperties.stepComplete = data.stepComplete;
				_stepProperties.isFirstStep = data.isFirstStep;
				_stepProperties.isLastStep = data.isLastStep;
				_stepProperties.buttons = data.buttons;
				_stepProperties.stepData = data.stepData;
			};
			_wizardList[wizardName]['steps'][stepNumber] = _stepProperties;
			if (update == true){
				updateDisplay();
			};
		};
		
		// Removes a step from a given wizard.
		function removeStep(wizardName, stepNumber)
		{
			if (_wizardList[wizardName].hasOwnProperty(stepNumber)) {
				delete _wizardList[wizardName][stepNumber];
			};
		};
		
		// Returns the steps
		function getWizardSteps(wizardName)
		{
			return _wizardList[wizardName]['steps'];
		};
		
		// Used to set any of the properties on a given step.
		function setStepProperty(wizardName, stepNumber, propertyName, data, update)
		{
			_wizardList[wizardName]['steps'][stepNumber][propertyName] = data;
			if (update == true){
				updateDisplay();
			};
		};
		
		// Return the value of any property on a given step.
		function getStepProperty(wizardName, stepNumber, propertyName)
		{
			return _wizardList[wizardName]['steps'][stepNumber][propertyName];
		};
		
		// Return the properties of a step.
		function getStepFlags(wizardName, stepNumber)
		{
			return _wizardList[wizardName]['steps'][stepNumber];
		};
		
		// Returns the stepData object
		function getStepData(wizardName, stepNumber)
		{
			return _wizardList[wizardName]['steps'][stepNumber]['stepData'];
		};
		
		// Returns the stepData object
		function setStepData(wizardName, stepNumber, data, update)
		{
			_wizardList[wizardName]['steps'][stepNumber]['stepData'] = data;
			if (update == true){
				updateDisplay();
			};
		};
		
		// Returns the button object for a step
		function getStepButtons(wizardName, stepNumber)
		{
			return _wizardList[wizardName]['steps'][stepNumber]['buttons'];
		};
		
		// Used to set any of the properties on a given step.
        function setStepButtonProperty(wizardName, stepNumber, buttonName, propertyName, data, update) 
		{
            _wizardList[wizardName]['steps'][stepNumber]['buttons'][buttonName][propertyName] = data;
            if (update == true) {
                updateDisplay();
            }
        };
		
		// Broadcasts an event to update the wizard control.
		function updateDisplay()
		{
			$rootScope.$broadcast("wizardConjurerUpdateDisplay");
		}
	};	
})();