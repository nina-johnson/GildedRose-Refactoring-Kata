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

  it('should increase quality for "Aged Brie" as it ages', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 3, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(11);
  });

  it('should increase quality for "Aged Brie" by 2 when past the sell by', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', -1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(12);
  });

  it('should never increase the quality of an item to more than 50', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 7, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  it('should increase the quality of "Backstage Passes" as it ages', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 20, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(6);
  });

  it('should increase the quality of "Backstage Passes" by 2 when there are 10 days or less left', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(7);
  });

  it('should increase the quality of "Backstage Passes" by 3 when there are 5 days or less left', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 4, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(8);
  });

  it('should decrease the quality of "Backstage Passes" to 0 when the sell by date has passed', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it('should degrade "Conjured" items quality twice as fast', () => {
    const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 4, 8)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(6);
  });

  it('should not degrade "Conjured" items quality below 0', () => {
    const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 4, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it('should degrade "Conjured" items quality by 4 after sell by', () => {
    const gildedRose = new GildedRose([new Item('Conjured Mana Cake', -4, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(6);
  });
});
