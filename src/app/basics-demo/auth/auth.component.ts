import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'sj-auth',
  template: `
    <div>
      <button (click)="signInWithGoogle()">Sign in with Google</button>
    </div>
    <div>
      <input type="email" #emailInput/>
      <input type="password" #passwordInput/>
      <button (click)="signInWithEmail(emailInput.value, passwordInput.value)">
        Sign in with email and password
      </button>
    </div>
    <div>
      <button (click)="signOut()">Sign Out</button>
    </div>
    
    <p>
      <label>Current authentication details:</label> {{ auth.authResponse | json }}
    </p>
    <p>
      <label>Current user details:</label> {{ auth.getUser() | json }}
    </p>
    <div>
      <h3>Passing the user to stateless component</h3>
      <sj-user-details [userDetails]="auth.getUser()"></sj-user-details>
    </div>
  `,
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  signInWithGoogle() {
    this.auth.login('Google');
  }

  signInWithEmail(email, password) {
    this.auth.login(email, password);
  }

  signOut() {
    this.auth.logout();
  }

}
