import { ItemTableColumn } from './item-table-column';


describe('ItemTableColumn', () => {
  it('should create an instance', () => {
    expect(new ItemTableColumn('id', 'ID')).toBeTruthy();
  });
});
