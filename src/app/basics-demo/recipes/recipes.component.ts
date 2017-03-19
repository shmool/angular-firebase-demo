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
        <li *ngFor="let item of itemList | async; let i = index" 
            (click)="showItem(item)">
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
  private displayedItem;
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

  showItem(item) {
    return this.recipeService.getItem(item)
      .subscribe((recipe) => {
        this.displayedItem = recipe;
        const ingredientFGs = recipe.ingredients.map(ingredient => this.createIngredient(ingredient));
        this.recipeForm.controls.ingredients = this.formBuilder.array(ingredientFGs);
        this.readOnly = true;
        this.recipeForm.setValue(recipe);
      });
  }

  edit() {
    this.readOnly = false;
  }

  createIngredient(item = { name: '', quantity: '' }) {
    return this.formBuilder.group(item)
  }

  addIngredient(event) {
    event.preventDefault();
    (this.recipeForm.get('ingredients') as FormArray).push(this.createIngredient());
  }

  save() {
    const recipe = this._getDataFromForm();

    this.recipeService.saveItem(recipe, this.displayedItem)
      .then(savedItem => this.displayedItem = savedItem);
  }

  _getDataFromForm() {
    const formModel = this.recipeForm.value;

    const ingredientsDeepCopy = this.ingredients.map(
      (ingredient) => Object.assign({}, ingredient.value)
    );

    const recipe = formModel;
    recipe.ingredients = ingredientsDeepCopy;
    return recipe;
  }

}
