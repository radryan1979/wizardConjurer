

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
	BtnPreviousText: string;
	BtnNextText: string;
	OnExit?: () => void;
	OnEnter?: () => void;
	StepData?: any;
		
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
	GetWizard(): IWizard;
	AddWizard(): IWizard;
	RemoveWizard(): IWizard;	
}