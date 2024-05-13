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
import Seo from '@/components/shared/Seo';
import { BN } from '@streamflow/stream/solana';
import { DELAY_IN_SECONDS } from '@/configs/constants';

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

      const totalAmountInLamports = getBN(tokenAmount, 9);
      const unlockDurationInSeconds = convertDurationToSeconds(1, unlockSchedule);
      const periodInSeconds = convertDurationToSeconds(vestingDuration, vestingDurationUnit);
      const numberOfIntervals = periodInSeconds / unlockDurationInSeconds;
      const amountPerInterval = totalAmountInLamports.div(new BN(numberOfIntervals));


      const createStreamParams = {
        recipient: recipient,
        tokenId: mint !== 'Native SOL' ? mint : 'So11111111111111111111111111111111111111112',
        start: getCurrentTimestampInSeconds() + DELAY_IN_SECONDS,
        amount: totalAmountInLamports,
        period: unlockDurationInSeconds,
        cliff: getCurrentTimestampInSeconds() + DELAY_IN_SECONDS,
        cliffAmount: getBN(0, 9),
        amountPerPeriod: amountPerInterval,
        name: 'TEST STREAM',
        canTopup: false,
        cancelableBySender:
          returnCancelableBy(cancellationRights).cancelableBySender,
        cancelableByRecipient: returnCancelableBy(cancellationRights)
          .cancelableByRecipient,
        transferableBySender:
          returnTransferableBy(transferableRights).transferableBySender,
        transferableByRecipient: returnTransferableBy(transferableRights)
          .transferableByRecipient,
        automaticWithdrawal: true,
        withdrawalFrequency: unlockDurationInSeconds,
        partner: undefined,
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
    <>
      <Seo titleTemplate='Create Streams' />
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
    </>
  );
}

export default Page;
