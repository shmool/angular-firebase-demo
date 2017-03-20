import { Component, OnInit } from '@angular/core';
import { Item, RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'sj-recipes',
  template: `
    <div>
      <button (click)="newItem()">Create New</button>
    </div>
    
    <div class="column left">
      <ul>
        <li *ngFor="let item of itemList | async; let i = index" 
            (click)="showItem(item)">
           {{ item.title }}
        </li>
      </ul>    
    </div>
    
    <div class="column right">
      <sj-recipe-form [recipe]="displayedRecipe" 
                      (save)="save($event)">                      
      </sj-recipe-form>
    </div>
  `,
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  itemList: Item[];
  private displayedRecipe;
  private readOnly = false;

  constructor(private recipeService: RecipesService) {
  }

  ngOnInit() {
    this.itemList = this.recipeService.getList();
  }

  newItem() {
    this.displayedRecipe = null;
    this.readOnly = false;
  }

  showItem(item) {
    return this.recipeService.getItem(item)
      .subscribe((recipe) => {
        this.displayedRecipe = recipe;
      });
  }

  save(recipe) {
    this.recipeService.saveItem(recipe, this.displayedRecipe)
      .then(savedItem => this.displayedRecipe = savedItem);
  }

}
