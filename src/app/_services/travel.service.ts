import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  baseURL = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  savetraveldays(model: any)
  {
    return this.http.post(this.baseURL + 'travels/save/traveldays', model);
  }

  gettraveldays(model: any)
  {
    return this.http.post(this.baseURL + 'travels/get/traveldays', model);
  }

  savetravelcities(model: any)
  {
    return this.http.post(this.baseURL + 'travels/save/travelcities', model);
  }
}
