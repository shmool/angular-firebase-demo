import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuthState, AuthProviders, AuthMethods } from 'angularfire2';

const availableProviders = ['Google'];

export interface User {
  name: string,
  email: string,
  photoURL?: string,
}

@Injectable()
export class AuthService {
  public user: User;
  private authResponse;

  constructor(public af: AngularFire) {
    this.af.auth.subscribe((authResponse: FirebaseAuthState) => {
      if (authResponse) {
        this.authResponse = authResponse;
        this.user = this.getUserDetails(authResponse);
      } else {
        this.authResponse = null;
        this.user = null;
      }
    })
  }

  getUserDetails(authResponse: FirebaseAuthState): User {
    return {
      name: authResponse.auth.displayName,
      email: authResponse.auth.email,
      photoURL: authResponse.auth.photoURL
    }
  }

  getUser(): User {
    return this.user;
  }

  login(provider: string, password?: string): any {
    return (availableProviders.indexOf(provider) > -1 ?
            this.loginWithProvider(provider) :
            this.loginWithCredentials(provider, password))
      .catch(error => console.log('ERROR @ AuthService#signIn() :', error));
  }

  loginWithProvider(provider: string) {
    return this.af.auth.login({
      provider: AuthProviders[provider],
      method: AuthMethods.Popup,
    })
  }

  loginWithCredentials(email, password) {
    return this.af.auth.login({
        email,
        password
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      })
  }

  logout() {
    this.af.auth.logout();
  }

}
