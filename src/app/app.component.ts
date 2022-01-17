import { Component } from '@angular/core';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private accountService: AccountService) {}
  
  ngOnInit()
  {
    this.setCurrentUser();    
  }

  setCurrentUser() {
    const user: any = JSON.parse(localStorage.getItem('user'));
    if(user)
    {
      this.accountService.setCurrentUser(user);
    }  
  }
  
  title = 'sk-travels';
}
