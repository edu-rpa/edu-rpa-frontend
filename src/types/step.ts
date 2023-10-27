export interface StepDescriptionProps {
  title: string;
  description: string;
}

export interface ProgressBarProps {
  steps: StepDescriptionProps[];
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
