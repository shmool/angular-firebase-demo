import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { Item } from '../../../services/recipes.service';

@Component({
  selector: 'sj-recipe-form',
  template: `
    <button *ngIf="readOnly" (click)="edit()">Edit</button>
      <button *ngIf="!readOnly" (click)="handleSave()">Save</button>
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
  `,
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit, OnChanges {
  @Input() recipe;
  @Output() save: EventEmitter<Item> = new EventEmitter();
  private readOnly = false;
  private recipeForm;

  constructor(private formBuilder: FormBuilder) {
    this.resetForm();
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.recipe) {
      const ingredientFGs = this.recipe.ingredients.map(
        ingredient => this.createIngredient(ingredient));

      this.recipeForm.controls.ingredients =
        this.formBuilder.array(ingredientFGs);

      this.readOnly = true;
      this.recipeForm.patchValue(this.recipe);
    } else {
      this.resetForm();
      this.edit();
    }
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

  createIngredient(item = { name: '', quantity: '' }) {
    return this.formBuilder.group(item)
  }

  addIngredient(event) {
    event.preventDefault();
    (this.recipeForm.get('ingredients') as FormArray).push(this.createIngredient());
  }

  edit() {
    this.readOnly = false;
  }

  handleSave() {
    this.save.emit(this._getDataFromForm());
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
