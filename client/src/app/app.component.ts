import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Dating App';

  constructor(private accoutnService: AccountService) { }

  users: any;

  ngOnInit() {
    this.setCurrentUser()
  }

  setCurrentUser() {
    //@ts-ignore
    const user: User = JSON.parse(localStorage.getItem('user'))
    this.accoutnService.setCurrentUser(user)
  }



}
