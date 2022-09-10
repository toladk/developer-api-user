import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { NgxSpinnerService } from 'ngx-spinner';
import { JarwisService } from '../services/jarwis.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserForm!: FormGroup;
  registerCorporateForm!: FormGroup;

  selectionPage = true;
  userPage = false;
  companyPage = false;
  companiesList: any[] = [];
  isSpinning = false;

  constructor(
    public formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private jarwisService: JarwisService,
    private toast: HotToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerUserForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]*$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]*$/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(11)]],
      bvn: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(11)]],
      userName: ['', [ Validators.required, Validators.pattern(/^[A-Za-z0-9_.]*$/) ]],
      email: ['', [ Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/) ]],
      password: ['', [Validators.required, Validators.pattern(/^[ A-Za-z0-9_@./#&!%$+-]*$/), Validators.minLength(10)]],
      homeAddress: ['', Validators.required],
      tenantID: ['', Validators.required]
    });

    this.registerCorporateForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[ A-Za-z]*$/)]],
      corporatePhone: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(11)]],
      corporateEmail: ['', [ Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/) ]],
      corporateAddress: ['', Validators.required],
      description: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]*$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]*$/)]],
      userName: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9_.@]*$/)]],
      email: ['', [Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)]],
      password: ['', [Validators.required, Validators.pattern(/^[ A-Za-z0-9_@./#&!%$+-]*$/), Validators.minLength(10)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(11)]],
      homeAddress: ['', Validators.required],
    });

    this.getCompanies();

  }

  getCompanies(): void{
    this.isSpinning = true;
    this.jarwisService.getCompanies().subscribe((result: any) => {
        this.companiesList = result
        this.isSpinning = false;
    }, error => {
      this.isSpinning = false;
      this.toast.error(error.error.responseMessage, {duration: 5000, position: 'top-right', style: { padding: '16px', color: '#000'}});
    })
  }

  selectType(val: any) {
    if(val === 'user') {
      this.userPage = true;
      this.companyPage = false;
      this.selectionPage = false;
    } else {
      this.userPage = false;
      this.companyPage = true;
      this.selectionPage = false;
    }
  }

  submit(val: any): void{
    this.isSpinning = true;
    if (val === 'user'){
      this.registerUserForm.value.tenantID = Number(this.registerUserForm.value.tenantID);
      this.registerUserForm.value.phoneNumber = this.registerUserForm.value.phoneNumber.slice(1),
      this.jarwisService.signupUser(this.registerUserForm.value).subscribe((result: any) => {
        if (result.IsSuccess === true){
          this.isSpinning = false;
          this.toast.success('User registered Successfully !!', {duration: 5000, position: 'top-right', style: { padding: '16px', color: '#000'}});
          this.router.navigateByUrl('login');
        } else {
          this.isSpinning = false;
          this.toast.error(result.Error, {duration: 5000, position: 'top-right', style: { padding: '16px', color: '#000'}});
        }
      }, error => {
        this.isSpinning = false;
        this.toast.error(error.error.Error, {duration: 5000, position: 'top-right', style: { padding: '16px', color: '#000'}});
      })
    } else {
      const payload = {
        name: this.registerCorporateForm.value.name,
        description: this.registerCorporateForm.value.description,
        corporateAddress: this.registerCorporateForm.value.corporateAddress,
        corporatePhone: this.registerCorporateForm.value.corporatePhone.slice(1),
        corporateEmail: this.registerCorporateForm.value.corporateEmail,
        tenantAdministrator: {
          firstName: this.registerCorporateForm.value.firstName,
          lastName: this.registerCorporateForm.value.lastName,
          userName: this.registerCorporateForm.value.userName,
          email: this.registerCorporateForm.value.email,
          password: this.registerCorporateForm.value.password,
          phoneNumber: this.registerCorporateForm.value.phoneNumber,
          homeAddress: this.registerCorporateForm.value.homeAddress
        }
      }
      this.jarwisService.signupCompany(payload).subscribe((result: any) => {
        if (result.IsSuccess === true){
          this.isSpinning = false;
          this.toast.success('Company registered Successfully !!', {duration: 5000, position: 'top-right', style: { padding: '16px', color: '#000'}});
          this.router.navigateByUrl('login');
        } else {
          this.isSpinning = false;
          this.toast.error(result.Error, {duration: 5000, position: 'top-right', style: { padding: '16px', color: '#000'}});
        }
      }, error => {
        this.isSpinning = false;
        this.toast.error(error.error.responseMessage, {duration: 5000, position: 'top-right', style: { padding: '16px', color: '#000'}});
      })
    }
  }



}
