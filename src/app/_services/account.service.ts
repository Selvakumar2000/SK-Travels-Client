import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseURL = environment.apiUrl;  
  currentUserSource = new ReplaySubject<any>(1);
  currentUser$ = this.currentUserSource.asObservable();
  
  constructor(private http: HttpClient) { }

  signup(model: any)
  {
    return this.http.post(this.baseURL + 'account/register', model).pipe(
      map((response: any)=>   
      {
        if(response)
        {
          this.setCurrentUser(response);
        }
      })
    );;
  }

  signin(model: any)
  {
    return this.http.post(this.baseURL + 'account/login', model).pipe(
      map((response:any)=>   
      {
        if(response)
        {
          this.setCurrentUser(response);
        }
      })
    );;
  }

  signout()
  {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  setCurrentUser(user: any)
  {
    console.log(user);
    localStorage.setItem('user',JSON.stringify(user));
    this.currentUserSource.next(user);
  }
}
