import { PermissionRole, TimeUnit } from '@/types';

export interface TransferPermissions {
  transferableBySender: boolean;
  transferableByRecipient: boolean;
}

export interface CancelPermissions {
  cancelableBySender: boolean;
  cancelableByRecipient: boolean;
}

export interface ReviewTransaction {
  cancellationRights: PermissionRole;
  mint: string;
  recipient: string;
  tokenAmount: string;
  transferableRights: PermissionRole;
  unlockSchedule: string;
  vestingDuration: number;
  vestingDurationUnit: TimeUnit;
}
