(function(){
	angular
		.module('conjurer')
		.factory('wizardServiceApi', wizardServiceApi);
	
	wizardServiceApi.$inject = ['$filter','$resource','$rootScope'];
	
	function wizardServiceApi($filter,$resource,$rootScope){
		var _wizardsList = [];
		var _defaultWizard = {
			"wizardName": "defaultWizard",
			"currentStep":0,
			"onFinish":function(){},
			"onCancel":function(){},
			"steps": [
				{
					"stepName":"step one",
					"stepNumber":1,
					"stepHasChanges":bool,
					"canEnter":bool,
					"canExit":bool,
					"stepComplete":bool,
					"isFirstStep":bool,
					"isLastStep":bool,
					"stepData":{}
				},
								{
					"stepName":"step two",
					"stepNumber":2,
					"stepHasChanges":bool,
					"canEnter":bool,
					"canExit":bool,
					"stepComplete":bool,
					"isFirstStep":bool,
					"isLastStep":bool,
					"stepData":{}
				}
				]
			}
		};
		
		var service = {};
		
		service.createWizard = function(wizardName){
			// adds a new named wizard on the wizardList
		};
		
		service.removeWizard = function(wizardName){
			// removes a named wizard from the wizardList
		};
		
		serivce.setCurrentStep = function(wizardName, data){
			// sets the current step for a given wizard
		};
		
		service.getCurrentStep = function(wizardName){
			// returns the current step for a given wizard
		};
		
		service.setStepCanExit = function(wizardName, stepNumber, data){};
		service.setStepCanEneter = function(wizardName, stepNumber, data){};
		service.setStepHasChanges = function(wizardName, stepNumber, data){};
		service.setStepHasNext = function(wizardName, stepNumber, data){};
		service.setStepHasPrevious = function(wizardName, stepNumber, data){};
		service.setStepNumber = function(wizardName, stepName, data){};
		service.setStepName = function(wizardName, stepNumber, data){};
		
		
	}	
})();