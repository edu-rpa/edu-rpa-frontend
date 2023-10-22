import React, { useState } from 'react';
import {
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from '@chakra-ui/react';
import { ProgressBarProps } from '@/types/step';

export default function ProgressBar(props: ProgressBarProps) {
  return (
    <div>
      <Stepper index={props.activeStep}>
        {props.steps.map((step, index) => (
          <Step
            key={index}
            className="hover:opacity-70 hover:cursor-pointer"
            onClick={() => props.setActiveStep(index + 1)}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
