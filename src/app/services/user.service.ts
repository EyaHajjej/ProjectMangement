import { Injectable } from '@angular/core';
import { UserForRegister } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {}

  addUser(user: UserForRegister): void {
    const usersJson = localStorage.getItem('Users');
    let users: UserForRegister[] = usersJson ? JSON.parse(usersJson) : [];
    users = [user, ...users];  // Simplified logic to handle both cases
    localStorage.setItem('Users', JSON.stringify(users));
  }
}
