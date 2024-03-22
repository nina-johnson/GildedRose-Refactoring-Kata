import { Item } from "./gilded-rose";

export enum Items {
  Brie = 'Aged Brie',
  Pass = 'Backstage passes to a TAFKAL80ETC concert',
  Sulfuras = 'Sulfuras, Hand of Ragnaros',
  Conjured = 'Conjured Mana Cake',
}

export const increaseQuality = (item: Item, increaseBy: number): Item => {
  item.quality += increaseBy;
  if (item.quality >= 50) {
    item.quality = 50;
  }
  return item;
}

export const decreaseQuality = (item: Item, decreaseBy: number): Item => {
  item.quality -= decreaseBy;
  if (item.quality < 0) {
    item.quality = 0;
  }
  return item;
}

export const updateBrie = (item: Item): Item => {
  if (item.sellIn <= 0) {
    item = increaseQuality(item, 2);
  } else {
    item = increaseQuality(item, 1);
  }
  item.sellIn --;
  return item;
}

export const updatePass = (item: Item): Item => {
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
  return item;
}

export const updateConjured = (item: Item): Item => {
  // making the assumption that because "Conjured" items decrease in value
  // twice as fast, the amount of quality decreased after passing the sell
  // by also doubles
  if (item.sellIn <=0) {
    item = decreaseQuality(item, 4);
  } else {
    item = decreaseQuality(item, 2);
  }
  item.sellIn --;
  return item;
}

export const updateDefault = (item: Item): Item => {
  if (item.sellIn <= 0) {
    item = decreaseQuality(item, 2);
  } else {
    item = decreaseQuality(item, 1);
  }
  item.sellIn --;
  return item;
}
  