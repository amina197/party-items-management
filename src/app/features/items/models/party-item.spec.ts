
import { StatusEnum } from '../../../shared/enums/status.enum';
import { PartyItem } from './party-item';

describe('PartyItem', () => {
  let partyItem: PartyItem;

  const id = 1;
  const name = 'Software subscription';
  const description = 'Annual subscription to new software';
  const totalCost = 15000;
  const ownerIds = [1, 2];

  beforeEach(() => partyItem = new PartyItem(id, name, description, totalCost, ownerIds));

  it('should create an instance', () => {
    expect(partyItem).toBeTruthy();
  });


  describe('Test status init', () => {
    it('should init status with PENDING when the item has several owners', () => {
      expect(partyItem.status).toBe(StatusEnum.PENDING);
    });

    it('should init status with OWNED when the item has a single owner', () => {
      const ownedPartyItem = new PartyItem(id, name, description, totalCost, [1]);
      expect(ownedPartyItem.status).toBe(StatusEnum.OWNED);
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

  describe('Test isWithStatus method', () => {
    it('should return true has one of the requested statuses', () => {
      expect(partyItem.isWithStatus([StatusEnum.PENDING])).toBe(true);
    });

    it('should return false when the item hasn\'t one of the requested statuses', () => {
      expect(partyItem.isWithStatus([StatusEnum.OWNED])).toBe(false);
    });
  });
});