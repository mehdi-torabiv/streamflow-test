'use client';
import ConfigurationSection from '@/components/pages/stream/ConfigurationSection';
import RecipientsSections from '@/components/pages/stream/RecipientsSections';
import ReviewSections from '@/components/pages/stream/ReviewSections';
import CustomStepper from '@/components/shared/CustomStepper';
import { Paper } from '@mui/material';
import { useState } from 'react';

function page() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const steps = ['Configuration', 'Recipients', 'Review'];

  return (
    <Paper>
      <CustomStepper
        steps={steps}
        activeStep={activeStep}
        handleBack={() => setActiveStep(activeStep - 1)}
        handleNext={() => setActiveStep(activeStep + 1)}
        handleFinish={() => { }}
      >
        {activeStep === 0 ? (
          <ConfigurationSection />
        ) : activeStep === 1 ? (
          <RecipientsSections />
        ) : (
          <ReviewSections />
        )}
      </CustomStepper>
    </Paper>
  );
}

export default page;
