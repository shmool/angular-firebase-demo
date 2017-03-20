import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BasicsDemoRoutingModule } from './basics-demo-routing.module';
import { AuthComponent } from './auth/auth.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AuthService } from '../services/auth.service';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesService } from '../services/recipes.service';
import { RecipeFormComponent } from './recipes/recipe-form/recipe-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BasicsDemoRoutingModule
  ],
  declarations: [
    AuthComponent,
    UserDetailsComponent,
    NotificationsComponent,
    RecipesComponent,
    RecipeFormComponent
  ],
  providers: [
    AuthService,
    RecipesService
  ]
})
export class BasicsDemoModule {
}
