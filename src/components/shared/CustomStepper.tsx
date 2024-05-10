import React from 'react';
import { Box, Button, Stack, Step, StepContent, StepLabel, Stepper } from '@mui/material';



/**
 * `CustomStepper` is a React component that renders a vertical stepper UI. It allows users to navigate through a series of steps using "Next" and "Cancel" (or "Finish") buttons. This component is built with Material-UI's Stepper, Step, StepLabel, and StepContent components.
 *
 * Props:
 * @param {number} activeStep - The index of the currently active step. This is a zero-based index.
 * @param {string[]} steps - An array of strings where each string represents the label of a step in the stepper.
 * @param {React.ReactNode} children - The content to display in the current step. This is typically a form or information related to the step.
 * @param {() => void} [handleNext] - An optional function that will be called when the user clicks the "Next" or "Finish" button. It is used to advance the stepper or complete the process.
 * @param {() => void} [handleBack] - An optional function that will be called when the user clicks the "Cancel" button. It is used to go back to the previous step or cancel the operation.
 * @param {() => void} [handleFinish] - An optional function that will be called when the user clicks the "Finish" button. It is used to complete the process.
 * 
 * The stepper supports navigation through the provided steps, with the UI adjusting based on the current step index. At the last step, the "Next" button changes to a "Finish" button to indicate completion of the process.
 *
 * Example Usage:
 * ```tsx
 * const steps = ['Step 1', 'Step 2', 'Step 3'];
 * const handleNext = () => { console.log('Next step'); };
 * const handleBack = () => { console.log('Previous step or cancel'); };
 *
 * <CustomStepper
 *   activeStep={1}
 *   steps={steps}
 *   handleNext={handleNext}
 *   handleBack={handleBack}
 * >
 *   <div>Content for the current step</div>
 * </CustomStepper>
 * ```
 *
 * This component utilizes Material-UI styling system (`sx` prop) for inline styles and layout, and leverages the Stack, Button, and Box components from Material-UI to provide a responsive and flexible layout.
 */

interface CustomStepperProps {
    activeStep: number;
    steps: string[];
    children: React.ReactNode;
    handleNext?: () => void;
    handleBack?: () => void;
    handleFinish?: () => void;
}

function CustomStepper({ steps, activeStep, children, handleNext, handleBack, handleFinish }: CustomStepperProps) {
    return (
        <Stack sx={{ width: '100%' }} spacing={4} padding={4}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            {children}
                            <Box sx={{ width: '100%', mt: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Button onClick={handleBack} variant='outlined' disabled={activeStep === 0}>
                                    Cancel
                                </Button>
                                {
                                    activeStep < steps.length - 1 ? (
                                        <Button onClick={handleNext} variant='contained'>
                                            Next
                                        </Button>
                                    ) : (
                                        <Button onClick={handleFinish} variant='contained'>
                                            Finish
                                        </Button>
                                    )
                                }
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </Stack>
    );
}

export default CustomStepper;
