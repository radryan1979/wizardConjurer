(function(){
	'use strict';
	
	angular.module('app')
	.controller('ctrl', ctrl);
	
	ctrl.$inject = ['$scope','wizardServiceApi'];
	
	function ctrl($scope,wizardServiceApi){
		// Don't display the directive until we have constructed
		// the wizard.
		$scope.isReady = false;
		wizardServiceApi.createWizard("ryanswizard");
		wizardServiceApi.setCurrentStep("ryanswizard",1);
		wizardServiceApi.setWizardProperty("ryanswizard","numberOfSteps",3)
		wizardServiceApi.addStep("ryanswizard",1,{
				stepName:"Step One",
				stepHasChanges:false,
				canEnter:true,
				canExit:false,
				stepComplete:false,
				isFirstStep:true,
				isLastStep:false,
				stepData:{},
				buttons:{
					btnPrevious:	{ 
										displayText: "Previous",
										isVisible: false,
										onClick: null,
										validateFunction: function(){console.log("Step One: Previous Validation Function")}
									},
					btnNext:		{
										displayText: "Next",
										isVisible: true,
										onClick: null,
										validateFunction: function(){
											console.log("Step One: Next Validation Function");
											}
									},
					btnCancel:		{
										displayText: "Cancel",
										isVisible: false,
										onClick: null
									}
					}
				}
		);
		wizardServiceApi.addStep("ryanswizard",2,{
				stepName:"Step Two",
				stepHasChanges:false,
				canEnter:true,
				canExit:true,
				stepComplete:false,
				isFirstStep:false,
				isLastStep:false,
				stepData:{},
				buttons:{
					btnPrevious:	{ 
										displayText: "Previous",
										isVisible: true,
										onClick: null,
										validateFunction: null
									},
					btnNext:		{
										displayText: "Next",
										isVisible: true,
										onClick: null,
										validateFunction: function(){
											console.log("Step Two: Next Validation Function");
											}
									},
					btnCancel:		{
										displayText: "Cancel",
										isVisible: false,
										onClick: null
									}
					}
				}
		);
		wizardServiceApi.addStep("ryanswizard",3,{
				stepName:"Step Three",
				stepHasChanges:false,
				canEnter:true,
				canExit:true,
				stepComplete:false,
				isFirstStep:false,
				isLastStep:true,
				stepData:{},
				buttons:{
					btnPrevious:	{ 
										displayText: "Previous",
										isVisible: true,
										onClick: null,
										validateFunction: null
									},
					btnNext:		{
										displayText: "Finish",
										isVisible: true,
										onClick: null,
										validateFunction: null
									},
					btnCancel:		{
										displayText: "Cancel",
										isVisible: false,
										onClick: null
									}
					}
				}
		);
		// The wizard has been constructed, we can now show
		// the directive.
		$scope.isReady = true;
	};
})();