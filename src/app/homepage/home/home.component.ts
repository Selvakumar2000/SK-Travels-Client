import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { interval } from 'rxjs';
import { delay, take } from 'rxjs/operators';
import { resetpasswordLinkModel, saveTravelCities, saveTravelDays, signin, traveldetails } from 'src/app/_models/SKTravelsModel';
import { AccountService } from 'src/app/_services/account.service';
import { BusyService } from 'src/app/_services/busy.service';
import { TravelService } from 'src/app/_services/travel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //home-page
  showvideo: boolean = true;
  showcontent: boolean = true;
  menu: boolean = false;
  navbutton: boolean = true;
  counter: number = 1;
  showpageContent: boolean = true;
  sliderBtn: boolean = true;
  
  //analytics
  analyticsmodalRef: BsModalRef;
  analyticsmodalconfig: ModalOptions = {
    backdrop: 'static',
    keyboard: false,
    class: 'modal-lg'
  };

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


  //cities
  cities: boolean = false;
  locationset: number = 1;
  
  //signin form
  @ViewChild('signinForm') signinForm: NgForm;
  model: signin = new signin();

  //signup form
  signupForm: FormGroup;

  //reset password model
  inputfocus: boolean = false;
  resetpasswordLinkModel: resetpasswordLinkModel = new resetpasswordLinkModel();
  modalRef: BsModalRef;
  config: ModalOptions = {
    backdrop: 'static',
    keyboard: false
  };

  //visit city
  isvisit: boolean = false;
  cityname: string;
  cityid: number;
  bookingstage: number;
  placecount: string;
  totalcost: string;
  usertraveldetails: traveldetails = new traveldetails();
  savetraveldays: saveTravelDays = new saveTravelDays();
  savetravelcities: saveTravelCities = new saveTravelCities();
  days = [
    { id: 1, value: '1 day' },
    { id: 2, value: '2 days' },
    { id: 3, value: '3 days' },
    { id: 4, value: '4 days' }, 
    { id: 5, value: '5 days' },
    { id: 6, value: '6 days' },
    { id: 7, value: '1 week' },
    { id: 7, value: '2 week' }
  ];
  visitingcities: any;
  pricemodalRef?: BsModalRef;
  pricemodalconfig: ModalOptions = {
    backdrop: 'static',
    keyboard: false,
    class: 'modal-dialog-centered'
  };
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  gallerymodalRef?: BsModalRef;
  gallerymodalconfig: ModalOptions = {
    backdrop: 'static',
    keyboard: false,
    class: 'modal-lg'
  };

  constructor(public accountService: AccountService, public fb: FormBuilder,
              private toastr: ToastrService, private busyService: BusyService,
              private modalService1: BsModalService,private modalService2: BsModalService,
              private travelService: TravelService, private modalService3: BsModalService) { 
    this.resetpasswordLinkModel.clientUrl = 'https://localhost:4200/resetpassword';

    interval(8000).subscribe(x => {
      if(!this.cities)
      {
        this.counter++;
        if(this.counter == 6)
        {
          this.counter = 1;
        }      
      }      
    });
  }
  
  ngOnInit(): void {
    this.initializeForm();

    //for images gallery
    this.galleryOptions = [
      {
        width: '650px',
        height: '450px',
        thumbnailsColumns: 4,
        arrowPrevIcon: 'fa fa-chevron-left',
        arrowNextIcon: 'fa fa-chevron-right',
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];
  }

  //analytics
  showAnalytics(analyticsmodal: TemplateRef<any>)
  {
    this.analyticsmodalRef = this.modalService3.show(analyticsmodal,this.analyticsmodalconfig);
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
    this.cities = false;
    this.showpageContent = true;
    this.sliderBtn = true;
    this.showauthPage = false;
    this.menu = !this.menu;
  }
  
  showMain()
  {
    this.showpageContent = true;
    this.sliderBtn = true;
    this.showauthPage = false;
    this.cities = false;
  }

  //switch between homepage and authentication page
  showauthentication()
  {     
    this.showauthPage = true;
    this.cities = true;
    this.showpageContent = false; 
    this.accountService.currentUser$.pipe(take(1)).subscribe(response =>
    {
      if(response)
      {
        this.sliderBtn = true;          
      }
      else
      {
        this.sliderBtn = false;
      }
    });
    
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
      this.cities = true;
      this.toastr.success('Logged in Successfully');  
      this.signinForm.reset();         
      this.showauthPage = false; 
      this.showpageContent = false; 
      this.sliderBtn = true;
      this.inputfocus = false;
      this.inputfocus1 = false;
      this.inputfocus2 = false;
      this.inputfocus3 = false;
      this.inputfocus4 = false;
      this.inputfocus5 = false;
      this.inputfocus6 = false;
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
        confirmPassword: ['',[Validators.required, this.matchValues('password')]],
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
      this.signupForm.reset();             
      this.cities = true;  
      this.toastr.success('Registration Successful');           
      this.showauthPage = false; 
      this.showpageContent = false;
      this.sliderBtn = true;
      this.inputfocus = false;
      this.inputfocus1 = false;
      this.inputfocus2 = false;
      this.inputfocus3 = false;
      this.inputfocus4 = false;
      this.inputfocus5 = false;
      this.inputfocus6 = false;
    });
  }

  //signout
  signout()
  {
    this.menu = !this.menu;
    this.accountService.signout();
    this.showauthPage = false;
    this.cities = false;
    this.showpageContent = true; 
    this.sliderBtn = true;
    this.inputfocus = false;
    this.inputfocus1 = false;
    this.inputfocus2 = false;
    this.inputfocus3 = false;
    this.inputfocus4 = false;
    this.inputfocus5 = false;
    this.inputfocus6 = false;
  }

  //password reset link generate
  focusInput()
  {
    this.inputfocus = true;
  }

  generatePasswordresetLink(resetPasswordLinkGenerateForm: any)
  {
    this.accountService.generatePasswordresetLink(this.resetpasswordLinkModel).subscribe(response => {
      resetPasswordLinkGenerateForm.reset();
      this.modalRef.hide();
      this.toastr.info(response);     
      this.inputfocus = false;
      this.inputfocus1 = false;
      this.inputfocus2 = false;
      this.inputfocus3 = false;
      this.inputfocus4 = false;
      this.inputfocus5 = false;
      this.inputfocus6 = false; 
    });
  }

  passwordResetLinkGenerateModal(passwordResetLinkGenerate: TemplateRef<any>)
  {
    this.modalRef = this.modalService1.show(passwordResetLinkGenerate, this.config);
  }

  //locationset change
  changelocationsetRA()
  {
    this.locationset++;
    if(this.locationset == 4)
    {
      this.locationset = 1;
    }
  }

  changelocationsetLA()
  {
    this.locationset--;
    if(this.locationset == 0)
    {
      this.locationset = 1;
    }
  }

  visitcity(id: number, city: string)
  {
    if(id == 1)
    {
      this.galleryImages = [
        {
          small: './assets/kodai1.jpg',
          medium: './assets/kodai1.jpg',
          big: './assets/kodai1.jpg'
        },  
        {
          small: './assets/kodai2.jpg',
          medium: './assets/kodai2.jpg',
          big: './assets/kodai2.jpg'
        },  
        {
          small: './assets/kodai3.jpg',
          medium: './assets/kodai3.jpg',
          big: './assets/kodai3.jpg'
        },  
        {
          small: './assets/kodai7.jpg',
          medium: './assets/kodai7.jpg',
          big: './assets/kodai7.jpg'
        },  
        {
          small: './assets/forest.mp4',
          medium: './assets/forest.mp4',
          big: './assets/forest.mp4'
        },
        {
          small: './assets/kodai4.jpg',
          medium: './assets/kodai4.jpg',
          big: './assets/kodai4.jpg'
        },    
        {
          small: './assets/kodai5.jpg',
          medium: './assets/kodai5.jpg',
          big: './assets/kodai5.jpg'
        },  
        {
          small: './assets/kodai6.jpg',
          medium: './assets/kodai6.jpg',
          big: './assets/kodai6.jpg'
        },    
      ];
    }

    if(id == 2)
    {
      this.galleryImages = [
        {
          small: './assets/kerala.jpg',
          medium: './assets/kerala.jpg',
          big: './assets/kerala.jpg'
        }, 
        {
          small: './assets/kerala2.jpg',
          medium: './assets/kerala2.jpg',
          big: './assets/kerala2.jpg'
        },  
        {
          small: './assets/kerala3.jpg',
          medium: './assets/kerala3.jpg',
          big: './assets/kerala3.jpg'
        },  
        {
          small: './assets/kerala5.jpg',
          medium: './assets/kerala5.jpg',
          big: './assets/kerala5.jpg'
        },    
        {
          small: './assets/kerala6.jpg',
          medium: './assets/kerala6.jpg',
          big: './assets/kerala6.jpg'
        }   
      ];
    }

    if(id == 3)
    {
      this.galleryImages = [
        {
          small: './assets/maldiv1.jpg',
          medium: './assets/maldiv1.jpg',
          big: './assets/maldiv1.jpg'
        },  
        {
          small: './assets/maldiv2.jpg',
          medium: './assets/maldiv2.jpg',
          big: './assets/maldiv2.jpg'
        },  
        {
          small: './assets/maldiv3.jpg',
          medium: './assets/maldiv3.jpg',
          big: './assets/maldiv3.jpg'
        },  
        {
          small: './assets/maldiv4.jpg',
          medium: './assets/maldiv4.jpg',
          big: './assets/maldiv4.jpg'
        },  
        {
          small: './assets/maldiv5.jpg',
          medium: './assets/maldiv5.jpg',
          big: './assets/maldiv5.jpg'
        },    
        {
          small: './assets/maldiv6.jpg',
          medium: './assets/maldiv6.jpg',
          big: './assets/maldiv6.jpg'
        },
        {
          small: './assets/maldiv7.jpg',
          medium: './assets/maldiv7.jpg',
          big: './assets/maldiv7.jpg'
        }      
      ];
    }

    this.accountService.currentUser$.pipe(take(1)).subscribe(res => {
      this.savetraveldays.userID = res.UserID;
      this.savetravelcities.userID = res.UserID;
    });

    this.usertraveldetails.traveldays = null;
    this.usertraveldetails.travelcities = null;
    this.bookingstage = 1;
    this.cityname = city;
    this.cityid = id;
    this.isvisit = true;
    this.locationset = 0;
    this.savetraveldays.maincityID = this.cityid;
    this.travelService.gettraveldays(this.savetraveldays).subscribe((res: any) => {
      this.usertraveldetails.traveldays = res.Data[0].NumberOfDays;
    });
  }

  showgallery(gallerymodal: TemplateRef<any>)
  {
    this.gallerymodalRef = this.modalService3.show(gallerymodal,this.gallerymodalconfig);
  }

  displaylocations()
  {
    this.isvisit = false;
    if([1,2,3].includes(this.cityid))
    {
      this.locationset = 1;
    }
    if([4,5,6].includes(this.cityid))
    {
      this.locationset = 2;
    }
    if([7,8,9].includes(this.cityid))
    {
      this.locationset = 3;
    }
  }

  savedays(data: boolean)
  {
    this.savetraveldays.maincityID = this.cityid;
    this.savetraveldays.numberofDays = this.usertraveldetails.traveldays
    this.travelService.savetraveldays(this.savetraveldays).subscribe((res: any) => {
      this.visitingcities = res.Data;
      this.placecount = res.AdditionalParam1;
      this.usertraveldetails.travelcities = res.AdditionalParam2 ? JSON.parse(res.AdditionalParam2) : null;
      console.log(this.usertraveldetails.travelcities);
      this.toastr.success('Saved Successfully');
      if(data)
      {
        this.bookingstage = 2;
      }
    });
  }

  savecities(data: boolean, priceModal: TemplateRef<any>)
  {
    if(this.usertraveldetails.travelcities.length > Number(this.placecount))
    {
      this.toastr.warning('Please select only '+this.placecount+' places');
      return;
    }

    this.savetravelcities.maincityID = this.cityid;
    this.savetravelcities.VisitingcityIDs = this.usertraveldetails.travelcities;   
    this.travelService.savetravelcities(this.savetravelcities).subscribe((res: any) => {
      this.totalcost = res.AdditionalParam1;
      this.toastr.success('Saved Successfully');
      if(data)
      {
        this.pricemodalRef = this.modalService2.show(priceModal,this.pricemodalconfig);
      }
    });
  }

  proceedtopayment()
  {
    this.pricemodalRef.hide();
    this.bookingstage = 3;
  }

  savepayment(data: boolean)
  {
    if(data)
    {
      this.bookingstage = 1;
    }
  }

  back(data: string)
  { 
    if(data == 'home')
    {
      this.bookingstage--;
    }

    if(data == 'days')
    {
      this.savetraveldays.maincityID = this.cityid;
      this.travelService.gettraveldays(this.savetraveldays).subscribe((res: any) => {
        this.usertraveldetails.traveldays = res.Data[0].NumberOfDays;
        this.bookingstage--;
      });
    }

    if(data == 'cities')
    {
      this.savetraveldays.maincityID = this.cityid;
      this.savetraveldays.numberofDays = this.usertraveldetails.traveldays
      this.travelService.savetraveldays(this.savetraveldays).subscribe((res: any) => {
        this.visitingcities = res.Data;
        this.placecount = res.AdditionalParam1;
        this.usertraveldetails.travelcities = res.AdditionalParam2 ? JSON.parse(res.AdditionalParam2) : null;
        this.bookingstage--;
      });
    }

    if(this.bookingstage == 0)
    {
      this.isvisit = false;
      if([1,2,3].includes(this.cityid))
      {
        this.locationset = 1;
      }
      if([4,5,6].includes(this.cityid))
      {
        this.locationset = 2;
      }
      if([7,8,9].includes(this.cityid))
      {
        this.locationset = 3;
      }
    }
  }
}