# wizardConjurer: An Angular Wizard Control

## Topics

  1. [About] (#about)
  1. [Using wizardConjurer] (#using-wizardConjurer)
  1. [Custom Directives] (#custom-directives)
  1. [Service API Details] (#service-api-details)
  1. [Future Plans] (#future-plans)

## About

wizardConjurer is an angular wizard control that allows you to use your own directives with minimal customization as individual steps within the wizard. wizardConjurer provides a directive that supports transclusion of your directives when nested, but does not require inherited scope or a required parent controller, instead you inject the service into your directives and use the service api for all communication between your directives and the wizard-control directive. 

The wizardServiceApi in wizardConjurer provides methods for creating multiple wizards and customizing the steps. wizardConjurer provides the following features (see [Service API Details](#service-api-details) section for the wizard object definition):

* Create and delete multiple named wizards
* Create as many steps as needed
* Store step specific data
* Provide custom call back fucntion on finish
* Navigate via next and previous buttons
* Navigate via navigation bar

You can also manage the state for individual steps:
* Can enter a step
* Can exit a step
* Step has changes
* Step is complete
* Step is the first step
* Step is the last step

## Using wizardConjurer

Once you have acquire the source code of wizardConjurer, add the scripts to your html.
```html
<html ng-app="app">
...
<script src="../src/wizardConjurer.module.js"></script>
<script src="../src/wizardConjurer.service.js"></script>
<script src="../src/wizardConjurer.directive.js"></script>
...
</html>
```
Now add a reference to your angular app:
```javascript
angular.module('app',['wizardConjurer']);
```
To add the directive to your html document:
````html
<wizard-control wizard-name="myWizard">
  ...
  Place your custom directives here.
  ...
</wizard-control>
```
The only attribute the `wizard-control` directive has is the `wizard-name` attribute and it is required. This provides a unique named instance that is used when communicating between the directives and conjurer service.

In your controller you will need to inject the wizardConjurer service named `wizardServiceApi`. You can then use the service to create a new named wizard and begin to set the properties:
```javascript
(function(){
	'use strict';
	
	angular.module('app')
	.controller('ctrl', ctrl);
	
	ctrl.$inject = ['$scope','wizardServiceApi'];
	
	function ctrl($scope,wizardServiceApi){
		// Don't display the directive until we have constructed
		// the wizard.
		$scope.isReady = false;
		// Create a new wizard named myWizard
		wizardServiceApi.createWizard("myWizard");
		// Set the current step to 1
		wizardServiceApi.setCurrentStep("myWizard",1);
		// Configure the total number of steps
		wizardServiceApi.setWizardProperty("myWizard","numberOfSteps",3)
		// Add a function to execute when the user clicks finish
		wizardServiceApi.setWizardProperty("myWizard","onFinish",function(){alert("You clicked finish.");})
		// Add my three steps and their default settings
		wizardServiceApi.addStep("myWizard",1,{
				stepName:"Step One",
				stepHasChanges:false,
				canEnter:true,
				canExit:true,
				stepComplete:false,
				isFirstStep:true,
				isLastStep:false,
				stepData:{}
		});
		wizardServiceApi.addStep("myWizard",2,{
				stepName:"Step Two",
				stepHasChanges:false,
				canEnter:true,
				canExit:true,
				stepComplete:false,
				isFirstStep:false,
				isLastStep:false,
				stepData:{}
		});
		wizardServiceApi.addStep("myWizard",3,{
				stepName:"Step Three",
				stepHasChanges:false,
				canEnter:true,
				canExit:true,
				stepComplete:false,
				isFirstStep:false,
				isLastStep:true,
				stepData:{}
		});
		// The wizard has been constructed, we can now show
		// the directive.
		$scope.isReady = true;
	};
})();
```
To make sure the `wizard-control` directive doesn't load until my controller has finished creating and configuring my wizard I use `ng-if="isReady"` in the wizard-control and toggle the value in my controller after all my steps have been configured:
```html
<wizard-control ng-if="isReady" wizard-name="myWizard">
```

**[Back to Top](#topics)**

## Custom Directives

Any directives that are to be used within the `wizard-control` directive will need to be modified to work with wizardConjurer. The directives may have an isolated scope and are not required to inherit the parent scope or require the wizard-control directive's controller instace either.

The first customization is to add the following attributes to your directive's scope:
```javascript
// These are required for the directives to function
// within the wizard-control directive and talk to
// the wizardConjurer service.
scope: {
				wizardName: '@wizardName',
				stepNumber: '@stepNumber'
				},
```
Next you will want to inject the wizardServiceApi into your directive. Below is an example custom directive called myStep:
```javascript
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
			},
		controllerAs: 'wizStepVm',
		template: "<div>My Step</div>"
		}
	}
})();
```
Your directive will use the `_wizName` and `_stepNum` to identify and communicate with the wizardServiceApi. wizardConjurer uses the jQuery .show/.hide method to show the current step and hide all other non-active steps. It uses the `step-number` attribute on your directive to determine the identification of the steps and manipulate them.

In your directive you can control the wizard's logic by changing the state of the step through the `wizardServiceApi`. For example, upon entering a step I might not want the user to be able to move to the next step until they have provided all the required information. When the user enters the step I can set the `canExit` flag to false and let my validation logic set it true again when validation has passed.
```javascript
// Set the canExit flag for step 2 to false
wizardServiceApi.setStepProperty('myWizard',2,'canExit',false);
...
// Validation logic can then call the service to set it true
wizardServiceApi.setStepProperty('myWizard',2,'canExit',true);
```
I can also use the `canEnter` feature to prevent the user from returning to a previous step once complete.
```javascript
// User has completed step 3 and now must only move forward
// My directive controller calls this method on entering step 4
wizardServiceApi.setStepProperty('myWizard',3,'canEnter',false);
```
You can use the `stepHasChanges` and `stepComplete` flags in similar ways to help control the logic and flow of your wizard.

The other feature you can take advantage of is the `stepData` feature. This provides a means to store user data from each wizard step where it can be accessed by any other steps. Providing a step level data store allows for an easy way to clear multiple step data if needed. 

**[Back to Top](#topics)**

## Service API Details

The JavaScript object for a wizard and corresponding steps follows the structure below:
```javascript
{
	wizardName		: "defaultWizard",
	currentStep		: 0,
	onFinish		: function(){},
	numberOfSteps	: 0,
	steps			: {
		1:	{
			stepName		: "step one",
			stepHasChanges	: false,
			canEnter		: false,
			canExit			: false,
			stepComplete	: false,
			isFirstStep		: false,
			isLastStep		: false,
			stepData		: {},
			}
		},
	data			: {}
}
```

The available methods in the `wizardServiceApi` are below with their parameters and description.

```javascript

// Creates a new wizard, takes a string as the wizardName.
function createWizard(wizardName) {...}

// Sets a named property on the wizard. 
function setWizardProperty(wizardName, propertyName, data) {...}

// Returns a named property on the wizard.
function getWizardProperty(wizardName, propertyName) {...}

// Replace the data object on the wizard with a new one
function setWizardData(wizardName, data) {..}

// Returns the data object on the wizard
function getWizardData(wizardName) {...}

// Returns the entire wizard object.
function getWizardObject(wizardName) {...}

// Removes a wizard. 
function removeWizard(wizardName) {...}

// Set the current step.
function setCurrentStep(wizardname, data) {...}

// Returns the current step of the wizard.
function getCurrentStep(wizardName) {...}

// Add a new step to the wizard, data is a step object.
function addStep(wizardName, stepNumber, data) {...}

// Removes a step from the wizard, does not renumber the steps.
function removeStep(wizardName, stepNumber) {...}

// Returns a dictionary of the wizard steps.
function getWizardSteps(wizardName) {...}

// Set a specific step property.
function setStepProperty(wizardName, stepNumber, propertyName, data) {...}

// Get a specifc step property.
function getStepProperty(wizardName, stepNumber, propertyName) {...}

// Return the state flags for a specific step.
function getStepFlags(wizardName, stepNumber) {...}

// Return the stepData dictionary.
function getStepData(wizardName, stepNumber) {...}

// Replace the stepData with a new dictionary.
function setStepData(wizardName, stepNumber, data) {...}

```

**[Back to Top](#topics)**

## Future Plans

Goals for future development. Contributors welcome.

* Package management.
* Remove direct jQuery dependency.
* Implement ng-if on nested directives.

**[Back to Top](#topics)**

