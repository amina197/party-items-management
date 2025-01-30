import { StatusEnum } from '../../../shared/enums/status.enum';
import { Owner } from '../../owners/models/owner';
import { ItemStatusEnum } from './item-status.enum';
import { PartyItem } from './party-item';

describe('PartyItem', () => {
  let partyItem: PartyItem;

  const id = 1;
  const name = 'Software subscription';
  const description = 'Annual subscription to new software';
  const totalCost = 15000;
  const ownerIds = [1, 2];
  const owners: Owner[] = <Owner[]>[{ id: 1, name: 'Owner 1' }, { id: 2, name: 'Owner 2' }];
  const proposals = [];
  const status = ItemStatusEnum.NO_ACTIVE_PROPOSAL;

  beforeEach(() => {
    partyItem = new PartyItem(id, name, description, totalCost, ownerIds, owners, status, []);
  });

  it('should create an instance', () => {
    expect(partyItem).toBeTruthy();
  });

  describe('Test status init', () => {
    it('should init status with NO_ACTIVE_PROPOSAL when the item has several owners', () => {
      expect(partyItem.status).toBe(ItemStatusEnum.NO_ACTIVE_PROPOSAL);
    });
  });

  describe('Test isOwnedByParty method', () => {
    it('should return true when the item is owned by the requested party', () => {
      expect(partyItem.isOwnedByParty(2)).toBe(true);
    });

    it('should return false when the item isn\'t owned by the requested party', () => {
      expect(partyItem.isOwnedByParty(3)).toBe(false);
    });
  });

  describe('Test setStatusForParty method', () => {
    it('should update status to NO_ACTIVE_PROPOSAL if there are no proposals', () => {
      partyItem.setStatusForParty(1);
      expect(partyItem.status).toBe(ItemStatusEnum.NO_ACTIVE_PROPOSAL);
    });

    it('should update status to ACTION_REQUIRED if there are pending proposals requiring user action', () => {
      partyItem.proposals.push({
        id: 1,
        status: StatusEnum.PENDING,
        acceptanceRecord: { 1: StatusEnum.PENDING }
      } as any);

      partyItem.setStatusForParty(1);
      expect(partyItem.status).toBe(ItemStatusEnum.ACTION_REQUIRED);
    });

    it('should update status to WAITING_FOR_OTHERS if there are pending proposals but no user action required', () => {
      partyItem.proposals.push({
        id: 1,
        status: StatusEnum.PENDING,
        acceptanceRecord: { 2: StatusEnum.PENDING }
      } as any);

      partyItem.setStatusForParty(1);
      expect(partyItem.status).toBe(ItemStatusEnum.WAITING_FOR_OTHERS);
    });

    it('should update status to ACCEPTED if there is an accepted proposal', () => {
      partyItem.proposals.push({
        id: 1,
        status: StatusEnum.ACCEPTED,
        acceptanceRecord: { 1: StatusEnum.ACCEPTED, 2: StatusEnum.ACCEPTED }
      } as any);

      partyItem.setStatusForParty(1);
      expect(partyItem.status).toBe(ItemStatusEnum.ACCEPTED);
    });
});

  describe('Test setStatusForParty method', () => {
    it('should update the status based on the owner\'s ID', () => {
      partyItem.proposals.push({
        id: 1,
        status: StatusEnum.PENDING,
        acceptanceRecord: { 1: StatusEnum.PENDING }
      } as any);

      partyItem.setStatusForParty(1);

      expect(partyItem.status).toBe(ItemStatusEnum.ACTION_REQUIRED);
    });
  });
});