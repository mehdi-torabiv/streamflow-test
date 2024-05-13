import { TransferPermissions, CancelPermissions } from '@/interfaces';
import { PermissionRole, TimeUnit } from '@/types';

export const getCurrentTimestampInSeconds = () => {
  return Math.ceil(new Date().getTime() / 1000);
};

export const returnTransferableBy = (
  value: PermissionRole,
): TransferPermissions => {
  switch (value) {
    case 'Recipient':
      return { transferableBySender: false, transferableByRecipient: true };
    case 'Sender':
      return { transferableBySender: true, transferableByRecipient: false };
    case 'Both':
      return { transferableBySender: true, transferableByRecipient: true };
    case 'Neither':
      return { transferableBySender: false, transferableByRecipient: false };
  }
};

export const returnCancelableBy = (
  value: PermissionRole,
): CancelPermissions => {
  switch (value) {
    case 'Recipient':
      return { cancelableBySender: false, cancelableByRecipient: true };
    case 'Sender':
      return { cancelableBySender: true, cancelableByRecipient: false };
    case 'Both':
      return { cancelableBySender: true, cancelableByRecipient: true };
    case 'Neither':
      return { cancelableBySender: false, cancelableByRecipient: false };
  }
};

export const convertDurationToSeconds = (duration: number, unit: TimeUnit) => {
  const unitToSeconds: { [key in TimeUnit]: number } = {
    Second: 1,
    Minute: 60,
    Hour: 3600,
    Day: 86400,
    Week: 604800,
    'Bi-week': 1209600,
    Month: 2592000,
    Quarter: 7776000,
    Year: 31536000,
  };

  return duration * (unitToSeconds[unit] || 0);
};
