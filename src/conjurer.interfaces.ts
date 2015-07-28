interface IWizardButton
{
	ButtonDisplayText: string;
	ButtonVisibility: boolean;
	ButtonOnClick: () => void;;
}

interface IWizardStep
{
	StepName: string;
	StepNumber: string;
	IsFirstStep: boolean;
	IsLastStep: boolean;
	StepComplete: boolean;
	StepHasChanges: boolean;
	CanEnter: boolean;
	CanExit: boolean;
	OnExit?: () => void;
	OnEnter?: () => void;
	Buttons: Object;
	StepData?: Object;
		
}

interface IWizard
{
	
	WizardName: string;
	CurrentStep: number;
	NumberOfSteps: number;
	OnFinish?: () => void;
	WizardSteps: Array<IWizardStep>;
	
}

interface IWizardList
{
	GetWizard(wizardName: string): IWizard;
	AddWizard(wizardName: string): void;
	RemoveWizard(wizardName: string): void;	
}