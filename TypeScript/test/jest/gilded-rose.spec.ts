import { Item, GildedRose } from '@/gilded-rose';
import { Items } from '@/helpers';

describe('Gilded Rose', () => {
  const ELIXIR = 'Elixir of the Mongoose';

  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });

  describe('Default items', () => {
    it('should decrease quality of "Elixir" items by 1', () => {
      const gildedRose = new GildedRose([new Item(ELIXIR, 18, 7)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(6);
    });
    
    it('should not degrade "Elixir" items quality below 0', () => {
      const gildedRose = new GildedRose([new Item(ELIXIR, 4, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });
  
    it('should degrade quality twice as fast after the sell by date has passed', () => {
      const gildedRose = new GildedRose([new Item(ELIXIR, 0, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(8);
    });
  });

  describe('Sulfuras items', () => {
    it('should never change the quality of "Sulfuras"', () => {
      const gildedRose = new GildedRose([new Item(Items.Sulfuras, -1, 80)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(80);
    });
  });

  describe('Aged Brie items', () => {
    it('should increase quality for "Aged Brie" as it ages', () => {
      const gildedRose = new GildedRose([new Item(Items.Brie, 3, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(11);
    });
  
    it('should increase quality for "Aged Brie" by 2 when past the sell by', () => {
      const gildedRose = new GildedRose([new Item(Items.Brie, -1, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(12);
    });
  
    it('should never increase the quality of an item to more than 50', () => {
      const gildedRose = new GildedRose([new Item(Items.Brie, 7, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(50);
    });
  });

  describe('Backstage Passes items', () => {
    it('should increase the quality of "Backstage Passes" as it ages', () => {
      const gildedRose = new GildedRose([new Item(Items.Pass, 20, 5)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(6);
    });
  
    it('should increase the quality of "Backstage Passes" by 2 when there are 10 days or less left', () => {
      const gildedRose = new GildedRose([new Item(Items.Pass, 10, 5)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(7);
    });
  
    it('should increase the quality of "Backstage Passes" by 3 when there are 5 days or less left', () => {
      const gildedRose = new GildedRose([new Item(Items.Pass, 4, 5)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(8);
    });
  
    it('should decrease the quality of "Backstage Passes" to 0 when the sell by date has passed', () => {
      const gildedRose = new GildedRose([new Item(Items.Pass, 0, 5)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });
  });

  describe('Conjured items', () => {
    it('should degrade "Conjured" items quality twice as fast', () => {
      const gildedRose = new GildedRose([new Item(Items.Conjured, 4, 8)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(6);
    });
  
    it('should not degrade "Conjured" items quality below 0', () => {
      const gildedRose = new GildedRose([new Item(Items.Conjured, 4, 1)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });
  
    it('should degrade "Conjured" items quality by 4 after sell by', () => {
      const gildedRose = new GildedRose([new Item(Items.Conjured, -4, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(6);
    });
  });
});
