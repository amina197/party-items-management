import { StatusEnum } from '../../shared/enums/status.enum';
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

  describe('Test isOwnedByPartyWithStatus method', () => {
    it('should return true when the item is owned by the requested party and has the right status', () => {
      expect(partyItem.isOwnedByPartyWithStatus(2, [StatusEnum.PENDING])).toBe(true);
    });

    it('should return false when the item isn\'t owned by the requested party', () => {
      expect(partyItem.isOwnedByPartyWithStatus(3, [StatusEnum.PENDING])).toBe(false);
    });

    it('should return false when the item hasn\'t the right status', () => {
      expect(partyItem.isOwnedByPartyWithStatus(2, [StatusEnum.OWNED])).toBe(false);
    });
  });
});