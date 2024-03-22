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

enum Items {
  Brie = 'Aged Brie',
  Pass = 'Backstage passes to a TAFKAL80ETC concert',
  Sulfuras = 'Sulfuras, Hand of Ragnaros',
}

const increaseQuality = (item: Item, increaseBy: number): Item => {
  item.quality += increaseBy;
  if (item.quality >= 50) {
    item.quality = 50;
  }
  return item;
}

const decreaseQuality = (item: Item, decreaseBy: number): Item => {
  item.quality -= decreaseBy;
  if (item.quality < 0){
    item.quality = 0;
  }
  return item;
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {

      switch (item.name) {
        case Items.Brie:
          break;
        case Items.Pass:
          break;
        case Items.Sulfuras:
          break;
        default:
          break;
      }

      if (item.name != Items.Brie && item.name != Items.Pass) {
        if (item.quality > 0) {
          if (item.name != Items.Sulfuras) {
            item.quality = item.quality - 1
          }
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1
          if (item.name == Items.Pass) {
            if (item.sellIn < 11) {
              if (item.quality < 50) {
                item.quality = item.quality + 1
              }
            }
            if (item.sellIn < 6) {
              if (item.quality < 50) {
                item.quality = item.quality + 1
              }
            }
          }
        }
      }
      if (item.name != Items.Sulfuras) {
        item.sellIn = item.sellIn - 1;
      }
      if (item.sellIn < 0) {
        if (item.name != Items.Brie) {
          if (item.name != Items.Pass) {
            if (item.quality > 0) {
              if (item.name != Items.Sulfuras) {
                item.quality = item.quality - 1
              }
            }
          } else {
            item.quality = item.quality - item.quality
          }
        } else {
          if (item.quality < 50) {
            item.quality = item.quality + 1
          }
        }
      }
    }

    return this.items;
  }
}
