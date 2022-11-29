import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from './../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter()
  model : any = {}

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {

  }

  register() {
    //@ts-ignore
    this.accountService.register(this.model).subscribe({
       //@ts-ignore
      next: (res) => {
        console.log(res)
        this.cancel()
      },
       //@ts-ignore
      error: (err) => {
        console.log(err)
      }
    })
  }

  cancel() {
   this.cancelRegister.emit(false)
  }

}
