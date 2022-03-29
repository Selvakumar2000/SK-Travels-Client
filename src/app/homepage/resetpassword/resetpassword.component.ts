import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { resetpasswordmodel } from 'src/app/_models/SKTravelsModel';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  passwordresetForm: FormGroup;
  changePasswordDto: resetpasswordmodel = new resetpasswordmodel();
  token: string;
  email: string;
  showHome: boolean = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
              private accountService: AccountService, private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.token = this.route.snapshot.queryParams['token'];
    this.email = this.route.snapshot.queryParams['email'];
  }

  initializeForm()
  {
    this.passwordresetForm = this.fb.group(
    {
        password:['', [ Validators.required,
                        Validators.minLength(6),
                        Validators.maxLength(12),
                        Validators.pattern(/(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{6,13}/),
                      ]
                 ],
        confirmPassword: ['',[Validators.required, this.matchValues('password')]]
    })
    this.passwordresetForm.controls.password.valueChanges.subscribe(() => {
      this.passwordresetForm.controls.confirmPassword.updateValueAndValidity();
    })
  }

  //check password and confirmpassword fields are match
  matchValues(matchTo:string):ValidatorFn
  { //all form control are derived from abstract control
    return (control:AbstractControl) =>
    {
      return control?.value == control?.parent?.controls[matchTo].value ? 
                            null : {misMatching: true};
    }
  }

  passwordreset()
  {
    this.changePasswordDto.password = this.passwordresetForm.get('password').value;
    this.changePasswordDto.confirmPassword = this.passwordresetForm.get('confirmPassword').value;
    this.changePasswordDto.email = this.email;
    this.changePasswordDto.token = this.token;

    this.accountService.resetPassword(this.changePasswordDto).subscribe(response => {
      this.toastr.success(response);
      this.showHome = true;
    });

  }

}
