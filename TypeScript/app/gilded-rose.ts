import { Items, decreaseQuality, increaseQuality } from "./helpers";

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let item of this.items) {
      switch (item.name) {
        case Items.Brie:
          if (item.sellIn <= 0) {
            item = increaseQuality(item, 2);
          } else {
            item = increaseQuality(item, 1);
          }
          item.sellIn --;
          break;
        case Items.Pass:
          if (item.sellIn <= 0) {
            item.quality = 0;
          } else if (item.sellIn <= 5) {
            item = increaseQuality(item, 3);
          } else if (item.sellIn <= 10) {
            item = increaseQuality(item, 2);
          } else {
            item = increaseQuality(item, 1);
          }
          item.sellIn --;
          break;
        case Items.Sulfuras:
          // do not change item as it is legendary
          break;
        case Items.Conjured:
          // making the assumption that because "Conjured" items decrease in value twice as fast,
          // the amount of quality decreased after passing the sell by also doubles
          if (item.sellIn <=0) {
            item = decreaseQuality(item, 4);
          } else {
            item = decreaseQuality(item, 2);
          }
          item.sellIn --;
          break;
        default:
          if (item.sellIn <= 0) {
            item = decreaseQuality(item, 2);
          } else {
            item = decreaseQuality(item, 1);
          }
          item.sellIn --;
          break;
      }
    }

    return this.items;
  }
}
