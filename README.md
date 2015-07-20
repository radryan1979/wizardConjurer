# ng-Conjurer: An Angular Wizard Control

## Topics

  1. [About] (#about)
  1. [Using ngConjurer] (#using-ngconjurer)
  1. [Custom Directives] (#custom-directives)
  1. [Service API Details] (#service-api-details)
  1. [Future Plans] (#future-plans)

## About

ng-Conjurer is an angular wizard control that allows you to use your own directives with minimal customization as individual steps within the wizard. ng-Conjurer provides a directive that supports transclusion of your directives when nested, but does not require inherited scope or a required parent controller, instead you inject the service into your directives and use the service api for all communication between your directives and the wizard-control directive. 

The wizardServiceApi in ng-Conjurer provides methods for creating multiple wizards and customizing the steps. ng-Conjurer provides the follow features (see [Service API Details](#service-api-details) section for the wizard object definition):

	* Create and delete multiple named wizards
	* Create as many steps as needed
	* Store step specific data
	* Manage state for individual steps:
	  * Can enter a step
	  * Can exit a step
	  * Step has changes
	  * Step is complete
	  * Step is the first step
	  * Step is the last step
	* Provide custom call back fucntion on finish
	* Navigate via next and previous buttons
	* Navigate via navigation bar

## Using ngConjurer

Once you have acquire the source code of ng-Conjurer, add the scripts to your html.
```html
<html ng-app="app">
...
<script src="../src/conjurer.module.js"></script>
<script src="../src/conjurer.service.js"></script>
<script src="../src/conjurer.directive.js"></script>
...
</html>
```
Now add a reference to your angular app:
```javascript
angular.module('app',['conjurer']);
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

In your controller you will need to inject the ng-Conjurer service named `wizardServiceApi`. You can then use the service to create a new named wizard and begin to set the properties:
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
		wizardServiceApi.createWizard("myWizard");
		wizardServiceApi.setCurrentStep("myWizard",1);
		wizardServiceApi.setWizardProperty("myWizard","numberOfSteps",3)
		wizardServiceApi.setWizardProperty("myWizard","onFinish",function(){alert("You clicked finish.");})
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

Any directives that are to be used within the `wizard-control` directive will need to be modified to work with ng-Conjurer. The directives may have an isolated scope and are not required to inherit the parent scope or require the wizard-control directive's controller instace either.

The first customization is to add the following attributes to your directive's scope:
```javascript
// These are required for the directives to function
// within the wizard-control directive and talk to
// the ng-Conjurer service.
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
Your directive will use the `_wizName` and `_stepNum` to identify and communicate with the wizardServiceApi.

**[Back to Top](#topics)**

## Service API Details

The JavaScript object for a wizard and corresponding steps follows the structure below:
```javascript
{
	wizardName: "defaultWizard",
	currentStep:0,
	onFinish:function(){},
	numberOfSteps:0,
	steps: {
		1:	{
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
}
```

**[Back to Top](#topics)**

## Future Plans

**[Back to Top](#topics)**

