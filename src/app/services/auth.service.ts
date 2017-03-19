import { Injectable } from '@angular/core';

// todo: remove - temp mock
const user = {
  name: 'SJ',
  email: 'sj@example.com',
  photoURL: 'photo.com'
};

@Injectable()
export class AuthService {
  authResponse = 'Auth Response';

  constructor() { }

  getUser() {
    return user;
  }

}
