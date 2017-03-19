import { Component, OnInit } from '@angular/core';
import { Item, RecipesService } from '../../services/recipes.service';
import { FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'sj-recipes',
  template: `
    <div>
      <button (click)="newItem()">Create New</button>
    </div>
    
    <div class="column left">
      <ul>
        <li *ngFor="let item of itemList; let i = index" 
            (click)="showItem(i)">
           {{ item.title }}
        </li>
      </ul>
    
    </div>
    
    <div class="column right">
      <button *ngIf="readOnly" (click)="edit()">Edit</button>
      <button *ngIf="!readOnly" (click)="save()">Save</button>
      <form [formGroup]="recipeForm" novalidate>
        <fieldset [disabled]="readOnly">
          <label>Title
            <input id="title" formControlName="title"/>
          </label>
          <div formArrayName="ingredients">
            <label>Ingredients</label>
            <button (click)="addIngredient($event)">Add</button>
            <ul>
              <li *ngFor="let ingredient of ingredients; let i = index;"
                  [formGroupName]="i">
                <input placeholder="ingredient" formControlName="name">
                <input placeholder="quantity" formControlName="quantity">
              </li>
            </ul>
          </div>
                 
          <label>Instructions
            <div>
              <textarea type="text" formControlName="instructions"></textarea>
            </div>
          </label>
        </fieldset>
      </form>    
    </div>
  `,
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  itemList: Item[];
  private displayedItem: Item;
  private readOnly = false;
  private recipeForm;

  constructor(private recipeService: RecipesService, private formBuilder: FormBuilder) {
    this.resetForm();
  }

  get ingredients() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  };

  resetForm() {
    this.recipeForm = this.formBuilder.group({
      title: '',
      ingredients: this.formBuilder.array([this.createIngredient()]),
      instructions: ''
    })
  }

  ngOnInit() {
    this.itemList = this.recipeService.getList();
  }

  newItem() {
    this.displayedItem = null;
    this.resetForm();
    this.readOnly = false;
  }

  showItem(index) {
    this.displayedItem = this.itemList[index];
    const ingredientFGs = this.displayedItem.ingredients.map(item => this.createIngredient(item));
    this.recipeForm.controls.ingredients = this.formBuilder.array(ingredientFGs);
    this.readOnly = true;
    this.recipeForm.setValue(this.displayedItem);
  }

  edit() {
    this.readOnly = false;
  }

  createIngredient(item = {name: '', quantity: ''}) {
    return this.formBuilder.group(item)
  }

  addIngredient(event) {
    event.preventDefault();
    (this.recipeForm.get('ingredients') as FormArray).push(this.createIngredient());
  }

  save() {
    const formModel = this.recipeForm.value;

    const ingredientsDeepCopy = this.ingredients.map(
      (ingredient) => Object.assign({}, ingredient.value)
    );

    const recipe = formModel;
    recipe.ingredients = ingredientsDeepCopy;
    this.displayedItem = this.recipeService.saveItem(recipe, this.displayedItem);
  }

}
