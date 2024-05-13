import {
  cancellationRights,
  transferableRights,
  unlockScheduleOptions,
  vestingDurationOptions,
} from '@/configs/constants';
import { z } from 'zod';

export const configurationSchema = z.object({
  mint: z
    .string({
      message: 'Invalid mint address',
    })
    .nullable(),
  vestingDuration: z
    .number()
    .min(1, { message: 'Duration must be at least 1' }),
  vestingDurationUnit: z.enum(
    vestingDurationOptions.map((option) => option) as [string, ...string[]],
    { message: 'Invalid duration unit' },
  ),
  unlockSchedule: z.enum(
    unlockScheduleOptions.map((option) => option.value) as [
      string,
      ...string[],
    ],
    {
      message: 'Invalid unlock schedule',
    },
  ),
  cancellationRights: z.enum(
    cancellationRights.map((option) => option) as [string, ...string[]],
    {
      message: 'Invalid cancellation rights',
    },
  ),
  transferableRights: z.enum(
    transferableRights.map((option) => option) as [string, ...string[]],
    {
      message: 'Invalid transferable rights',
    },
  ),
});

export const recipientSchema = z.object({
  tokenAmount: z
    .string({
      message: 'Invalid token amount is required',
    })
    .min(1, { message: 'Invalid token amount' }),
  recipient: z
    .string({
      message: 'Recipient address is required',
    })
    .min(1, { message: 'Invalid recipient address' }),
});

export const reviewSchema = z.object({});

export const stepSchemas = {
  Configuration: configurationSchema,
  Recipients: recipientSchema,
  Review: reviewSchema,
};

export type StepSchemaKey = keyof typeof stepSchemas;
