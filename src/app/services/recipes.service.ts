import { Injectable } from '@angular/core';

interface Ingredient {
  name: string,
  quantity: string
}

export interface Item {
  title: string,
  ingredients: Ingredient[],
  instructions: string
}

// todo: get list from server
const itemList: Item[] = [];

@Injectable()
export class RecipesService {

  constructor() {
  }

  getList() {
    return itemList;
  }

  saveItem(item: Item, existingItem) {
    if (existingItem) {
      itemList[itemList.indexOf(existingItem)] = item;
    } else {
      itemList.push(item);
    }
    return item;
  }
}
