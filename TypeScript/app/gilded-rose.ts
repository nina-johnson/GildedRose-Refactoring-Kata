import {
  Items,
  updateBrie,
  updateConjured,
  updateDefault,
  updatePass
} from "./helpers";

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
          updateBrie(item);
          break;
        case Items.Pass:
          updatePass(item);
          break;
        case Items.Sulfuras:
          // do not change item as it is legendary
          break;
        case Items.Conjured:
          updateConjured(item);
          break;
        default:
          updateDefault(item);
          break;
      }
    }

    return this.items;
  }
}
