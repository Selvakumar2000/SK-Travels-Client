import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  constructor(public spinnerService: NgxSpinnerService) { }

  busy()
  {
    this.spinnerService.show();
  }

  idle()
  {
    this.spinnerService.hide();
  }
}
