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
  if (item.quality < 0){
    item.quality = 0;
  }
  return item;
}
  
  