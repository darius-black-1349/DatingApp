import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators'
import {ReplaySubject} from 'rxjs'
import { User } from './../_models/user';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  basUrl = 'https://localhost:5001/api/'
  private currentUserSource = new ReplaySubject<User>(1)
  currentUser$ = this.currentUserSource.asObservable()

  constructor(private http: HttpClient) { }


  login(model: any) {
    return this.http.post(this.basUrl + 'account/login', model).pipe(
      //@ts-ignore
      map((res: User) => {
        const user = res
        if(user) {
          localStorage.setItem('user', JSON.stringify(user))
          this.currentUserSource.next(user)
        }
      })
    )
  }

  register(model: any) {
    return this.http.post(this.basUrl + 'acoount/register', model).pipe(
      //@ts-ignore
      map((user: User) => {
        if(user) {
          localStorage.setItem('user', JSON.stringify(user))
          this.currentUserSource.next(user)
        }
      })
    )
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user)
  }

  logout() {
    localStorage.removeItem('user')
    //@ts-ignore
    this.currentUserSource.next(null)
  }
}
