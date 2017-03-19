import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicsDemoRoutingModule } from './basics-demo-routing.module';
import { AuthComponent } from './auth/auth.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AuthService } from '../services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    BasicsDemoRoutingModule
  ],
  declarations: [
    AuthComponent,
    UserDetailsComponent,
    NotificationsComponent
  ],
  providers: [
    AuthService
  ]
})
export class BasicsDemoModule {
}
