import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Ingredient } from './../shared/ingredient.model';
import { Recipe } from './recipe.model';
import { ShoppingListService } from './../shopping-list/shopping-list.service';


@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];
/*
  private recipes: Recipe[] = [
    new Recipe('Taco Soup',
    'An EASY Recipe for Taco Soup, completely ready in just 30 minutes!',
    'https://www.thespruceeats.com/thmb/-0JGgYu6RP0MZMgoTrj2Ra4Ev0o=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/instant-pot-taco-soup-4772189-final-6f06dd29e559439f985276b3641c85ed.jpg',
    [
      new Ingredient('Onion', 1),
      new Ingredient('Red Pepper', 1),
      new Ingredient('Green Pepper', 1),
      new Ingredient('Canned Beans', 1),
      new Ingredient('Canned corn', 1),
      new Ingredient('Canned diced tomatoes', 1),
      new Ingredient('Garlic', 1),
      new Ingredient('Ground Beef', 1),
  ])
  ];
*/
  constructor(private slService: ShoppingListService) {

  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }


  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes.slice()[id];
  }

  addIngredientsToshoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
