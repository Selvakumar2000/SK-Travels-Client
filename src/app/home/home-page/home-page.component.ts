import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { signin } from 'src/app/_models/signin-model';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  //home-page
  showvideo: boolean = true;
  showcontent: boolean = true;
  navbutton: boolean = true;
  menu: boolean = false;
  counter: number = 1;
  showpageContent: boolean = true;
  showsliderBtn:  boolean = true;

  //authentication-page
  showauthPage: boolean = false;
  showSignin: boolean = true;
  showSignup: boolean = false;
  inputfocus1: boolean = false;
  inputfocus2: boolean = false;
  inputfocus3: boolean = false;
  inputfocus4: boolean = false;
  inputfocus5: boolean = false;
  inputfocus6: boolean = false;
  hide: boolean = true;

  //signin form
  @ViewChild('signinForm') signinForm: NgForm;
  model: signin = new signin();

  //signup form
  signupForm: FormGroup;
  
  constructor(public accountService: AccountService, public fb: FormBuilder,
              private toastr: ToastrService, private router: Router) { 
      
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  //home-page
  changeContent1()
  {
    this.counter = 1;
  }

  changeContent2()
  {
    this.counter = 2;
  }

  changeContent3()
  {
    this.counter = 3;
  }

  changeContent4()
  {
    this.counter = 4;
  }

  changeContent5()
  {
    this.counter = 5;
  }

  showMenu()
  {
    this.menu = !this.menu;
    this.showauthPage = false;
    this.showpageContent = true;
  }

  showHome()
  {
    this.showpageContent = true;
    this.showsliderBtn = true;
    this.showauthPage = false;
    this.menu = !this.menu;
  }

  showMain()
  {
    this.showpageContent = true;
    this.showsliderBtn = true;
    this.showauthPage = false;
  }

  //switch between homepage and authentication page
  showauthentication()
  {
    this.showpageContent = false;
    this.showsliderBtn = false;
    this.showauthPage = true;
  }

  //authentication-page
  showSignupPage()
  {
    this.showSignin = false;
    this.showSignup = true;
  }

  showSigninPage()
  {
    this.showSignin = true;
    this.showSignup = false;
  }

  focusInput1()
  {
    this.inputfocus1 = true;
    this.inputfocus2 = false;
  }

  focusInput2()
  {
    this.inputfocus2 = true;
    this.inputfocus1 = false;
  }

  focusInput3()
  {
    this.inputfocus3 = true;
    this.inputfocus4 = false;
    this.inputfocus5 = false;
    this.inputfocus6 = false;
  }

  focusInput4()
  {
    this.inputfocus4 = true;
    this.inputfocus3 = false;
    this.inputfocus5 = false;
    this.inputfocus6 = false;
  }

  focusInput5()
  {
    this.inputfocus5 = true;
    this.inputfocus3 = false;
    this.inputfocus4 = false;
    this.inputfocus6 = false;
  }

  focusInput6()
  {
    this.inputfocus6 = true;
    this.inputfocus3 = false;
    this.inputfocus4 = false;
    this.inputfocus5 = false;
  }

  showPassword()
  {
    this.hide = !this.hide;
  }

  //signin form
  signin()
  {
    this.accountService.signin(this.model).subscribe((response: any) => {
      this.toastr.success('Logged in Successfully');  
      this.signinForm.reset(); 
      this.showauthPage = false; 
      this.showpageContent = false;
      this.showsliderBtn = true;   
    });
  }  

  //signup form
  initializeForm()
  {
    this.signupForm = this.fb.group(
    {
        fullname: ['', Validators.required],
        email: ['', Validators.required],
        password:['', [ Validators.required,
                        Validators.minLength(6),
                        Validators.maxLength(12),
                        Validators.pattern(/(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{6,13}/),
                      ]
                 ],
        confirmPassword: ['',[Validators.required, this.matchValues('password')]]
    })
    this.signupForm.controls.password.valueChanges.subscribe(() => {
      this.signupForm.controls.confirmPassword.updateValueAndValidity();
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

  signup()
  {
    this.accountService.signup(this.signupForm.value).subscribe(response => {
      this.toastr.success('Registeration Successful');
      this.signupForm.reset();
    });
  }

  //signout
  signout()
  {
    this.accountService.signout();
    this.router.navigateByUrl('/'); 
  }

}
