import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });
  
  it('should decrease quality of "Elixir" items by 1', () => {
    const gildedRose = new GildedRose([new Item('Elixir of the Mongoose', 18, 7)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(6);
  });
  
  it('should not degrade "Elixir" items quality below 0', () => {
    const gildedRose = new GildedRose([new Item('Elixir of the Mongoose', 4, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it('should degrade quality twice as fast after the sell by date has passed', () => {
    const gildedRose = new GildedRose([new Item('Elixir of the Mongoose', 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(8);
  });

  it('should never change the quality of "Sulfuras"', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', -1, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
  });
});
