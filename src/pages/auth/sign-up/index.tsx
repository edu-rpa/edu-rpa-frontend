import SignUpForm from '@/components/Forms/SignUpForm';
import VerityOTPForm from '@/components/Forms/VerifyOTPForm';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import { useSteps } from '@chakra-ui/react';
import React from 'react';

export default function SignUp() {
  const steps = [
    { title: 'Step 1', description: 'Register' },
    { title: 'Step 2', description: 'Verify Email' },
  ];
  const { activeStep, setActiveStep } = useSteps();
  React.useEffect(() => {
    setActiveStep(1);
  }, []);

  return (
    <div className="mt-[150px]">
      <div className="w-40 m-auto items-center">
        <ProgressBar
          steps={steps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      </div>
      <div className="flex justify-center items-center mt-[50px] mb-[20px]">
        {activeStep == 1 ? (
          <SignUpForm setActiveStep={setActiveStep} />
        ) : (
          <VerityOTPForm />
        )}
      </div>
    </div>
  );
}
