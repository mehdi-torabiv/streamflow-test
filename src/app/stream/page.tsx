'use client';
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Backdrop, CircularProgress, Paper } from '@mui/material';
import CustomStepper from '@/components/shared/CustomStepper';
import ConfigurationSection from '@/components/pages/stream/ConfigurationSection';
import RecipientsSections from '@/components/pages/stream/RecipientsSections';
import ReviewSections from '@/components/pages/stream/ReviewSections';
import { stepSchemas, StepSchemaKey } from '@/utils/schema/tokenVestingSchema';
import { useWallet } from '@solana/wallet-adapter-react';
import {
  convertDurationToSeconds,
  getCurrentTimestampInSeconds,
  returnCancelableBy,
  returnTransferableBy,
} from '@/helpers';
import { getBN } from '@streamflow/stream';
import { createStream } from '@/services/StreamflowService';
import { useSnackbar } from '@/context/SnackbarContext';
import { useRouter } from 'next/navigation';

function Page() {
  const [activeStep, setActiveStep] = useState<StepSchemaKey>('Configuration');
  const [isTransactionLoading, setIsTransactionLoading] = useState<boolean>(false);
  const wallet = useWallet();

  const router = useRouter();

  const { showMessage } = useSnackbar();

  const steps: StepSchemaKey[] = ['Configuration', 'Recipients', 'Review'];

  const methods = useForm({
    resolver: zodResolver(stepSchemas[activeStep]),
  });

  const handleNext = async () => {
    const isValid = await methods.trigger();
    if (!isValid) {
      return;
    }

    const nextIndex = steps.indexOf(activeStep) + 1;
    if (nextIndex < steps.length) {
      setActiveStep(steps[nextIndex]);
    } else {
      handleFinish();
    }
  };

  const handleBack = () => {
    const previousIndex = steps.indexOf(activeStep) - 1;
    if (previousIndex >= 0) {
      setActiveStep(steps[previousIndex]);
    }
  };

  const handleFinish = async () => {
    if (!wallet.connected) {
      try {
        await wallet.connect();
      } catch (error) {
        console.error('Wallet connection failed:', error);
        return;
      }
    }
    const isValid = await methods.trigger();
    if (isValid) {
      setIsTransactionLoading(true);
      const {
        recipient,
        cancellationRights,
        transferableRights,
        mint,
        tokenAmount,
        vestingDuration,
        vestingDurationUnit,
        unlockSchedule
      } = methods.getValues();

      const unlockDurationInSeconds = convertDurationToSeconds(1, unlockSchedule);
      const periodInSeconds = convertDurationToSeconds(vestingDuration, vestingDurationUnit);
      const amountPerPeriod = tokenAmount / (periodInSeconds / unlockDurationInSeconds);

      const createStreamParams = {
        recipient: recipient, // The public key of the recipient
        tokenId: mint !== 'Native SOL' ? mint : 'So11111111111111111111111111111111111111112', // The mint of the token
        start: getCurrentTimestampInSeconds() + 60, // Start time in seconds
        amount: getBN(tokenAmount, 9), // X SOL, represented in lamports
        period: unlockDurationInSeconds, // Example: unlocks every X second
        cliff: getCurrentTimestampInSeconds() + 60, // first unlock time in seconds
        cliffAmount: getBN(0, 9), // No tokens released at the cliff
        amountPerPeriod: getBN(amountPerPeriod, 9),
        name: 'TEST STREAM', // Name of the stream
        canTopup: false, // Whether the sender can top up the stream
        cancelableBySender:
          returnCancelableBy(cancellationRights).cancelableBySender, // Whether the sender can cancel the stream
        cancelableByRecipient: returnCancelableBy(cancellationRights)
          .cancelableByRecipient, // Whether the recipient can cancel the stream
        transferableBySender:
          returnTransferableBy(transferableRights).transferableBySender, // Whether the sender can transfer the stream
        transferableByRecipient: returnTransferableBy(transferableRights) // Whether the recipient can transfer the stream
          .transferableByRecipient,
        automaticWithdrawal: true, // Whether the stream should automatically withdraw
        withdrawalFrequency: 1, // How often the stream should withdraw (it will use period as default)
        partner: undefined, // The public key of the partner
      };

      await createStream(createStreamParams, {
        sender: wallet,
        isNative: true
      },
        (stream) => {
          showMessage(`${stream.txId} created successfully.`, 'success');
          router.push('/')
        },
        (error) => {
          showMessage(`${error}`, 'error');
        }
      );
      setIsTransactionLoading(false);
    }
  };


  if (isTransactionLoading) {
    return <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="primary" />
    </Backdrop>
  }

  return (
    <FormProvider {...methods}>
      <Paper elevation={3}>
        <CustomStepper
          steps={steps.map((step) => step)}
          activeStep={steps.indexOf(activeStep)}
          handleBack={handleBack}
          handleNext={handleNext}
          handleFinish={handleFinish}
        >
          {activeStep === 'Configuration' && (
            <ConfigurationSection key="configuration" />
          )}
          {activeStep === 'Recipients' && (
            <RecipientsSections key="recipients" />
          )}
          {activeStep === 'Review' && <ReviewSections key="review" reviewTransaction={methods.getValues()} />}
        </CustomStepper>
      </Paper>
    </FormProvider>
  );
}

export default Page;
