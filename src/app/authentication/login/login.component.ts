import { Router } from '@angular/router';
import { JarwisService } from './../services/jarwis.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  isSpinning = false;

  constructor(
    public formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private jarwisService: JarwisService,
    private toast: HotToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [ Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/) ]],
      password: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9_@./#&!%$+-]*$/), Validators.minLength(10)]]
    });
  }

  async login(): Promise<void>{
    this.isSpinning = true;
    await this.jarwisService.login(this.loginForm.value).toPromise().then((result: any) => {
      if(result.IsSuccess === true){
        sessionStorage.setItem('token', result.Value.Access_Token);
        this.toast.success('Login Successfull !!', {duration: 5000, position: 'top-right', style: { padding: '16px', color: '#000'}});
        this.isSpinning = false;
        this.router.navigateByUrl('/main/dashboard');
      } else {
        this.toast.error(result.Error, {duration: 5000, position: 'top-right', style: { padding: '16px', color: '#000'}});
        this.isSpinning = false;
      }
    }, error => {
      this.toast.error(error.error.responseMessage, {duration: 5000, position: 'top-right', style: { padding: '16px', color: '#000'}});
      this.isSpinning = false;
    })
  }

}
