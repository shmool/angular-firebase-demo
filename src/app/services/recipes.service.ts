import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

interface Ingredient {
  name: string,
  quantity: string
}

export interface Item {
  title: string,
  ingredients: Ingredient[],
  instructions: string
}

@Injectable()
export class RecipesService {
  private itemList;
  private currentItem;

  constructor(private af: AngularFire) {
    this.itemList = this.af.database.list('/recipeList');
  }

  getList() {
    return this.itemList;
  }

  getItem(item) {
    const itemObservable = this.af.database.object(`/recipes/${item.$key}`);
    itemObservable.subscribe(recipe => this.currentItem = recipe);
    return itemObservable;
  }


  saveItem(item: Item, currentItem) {
    if (currentItem) {
      return this.af.database.object(`/recipes/${currentItem.$key || currentItem.key}`)
        .set(item)
        .then(() => Object.assign(currentItem, item))
        .catch(error => console.error(error));
    } else {
      return this.af.database.list(`/recipes`)
        .push(item)
        .then(savedItem => {
          this.currentItem = savedItem.key;
          return Object.assign(item, {$key: savedItem.key});
        })
        .catch(error => console.error(error));
    }
  }
}
