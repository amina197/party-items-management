import { StatusEnum } from '../../../../shared/enums/status.enum';
import { Owner } from '../../../owners/models/owner';
import { User } from '../../../users/users/user';
import { AcceptanceRecord } from '../acceptance-record';
import { PaymentRatio } from '../payment-ratio';
import { ItemProposal } from './item-proposal';

describe('ItemProposal', () => {

  const id = 1;
  const itemId = 1;
  const createdAt = new Date();
  const createdByParty = {} as Owner;
  const createdByUser = {} as User;
  const paymentRatios = {} as PaymentRatio;
  const statusEnum = StatusEnum.ACCEPTED;
  const acceptanceRecord = {} as AcceptanceRecord;
  const comment = '';

  it('should create an instance', () => {
    expect(new ItemProposal(itemId, createdAt, createdByParty, createdByUser, paymentRatios, statusEnum, acceptanceRecord, comment)).toBeTruthy();
  });
});
