import { StatusEnum } from '../../../shared/enums/status.enum';
import { User } from '../../users/users/user';
import { AcceptanceRecord } from './acceptance-record';
import { PaymentRatio } from './payment-ratio';

export interface Proposal {
  id: number;
  createdAt: Date;
  createdByUser: User;
  comment?: string;
  paymentRatios: PaymentRatio;
  status: StatusEnum;
  acceptanceRecord: AcceptanceRecord;
}
