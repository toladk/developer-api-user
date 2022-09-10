import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainService } from './../../services/main.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { HotToastService } from '@ngneat/hot-toast';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  accessForm!: FormGroup;

  applicationList: any[] = [];
  isSpinning = false;
  showApis = false;
  showApps = true;

  panels = [
    {
      active: true,
      name: 'This is endpoint 1',
      disabled: false
    },
    {
      active: false,
      disabled: false,
      name: 'This is endpoint 2'
    },
    {
      active: false,
      disabled: false,
      name: 'This is endpoint 3'
    }
  ];

  constructor(
    private mainService: MainService,
    private spinner: NgxSpinnerService,
    private toast: HotToastService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.accessForm = this.formBuilder.group({
      applicationName: ['', [Validators.required]],
      debitAccount: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)]],
      description: ['', Validators.required],
      isFinTech: ['', Validators.required],
      allowedScopes: this.formBuilder.array([])
    });

    this.getAllApplications();

  }

  getAllApplications(): void{
    this.isSpinning = true;
    this.mainService.getAllApplications().subscribe((result: any) => {
      if(result.IsSuccess === true){
        this.applicationList = result.Value;
        this.isSpinning = false;
      } else {
        this.toast.error(result.Error, {duration: 5000, position: 'top-right', style: { padding: '16px', color: '#000'}});
        this.isSpinning = false;
      }
    }, error => {
      this.toast.error(error.error.responseMessage, {duration: 7000, position: 'top-right', style: { padding: '16px', color: '#000'}});
      this.isSpinning = false;
    })
  }

  viewEndpoints(): void{
    this.showApis = true;
    this.showApps = false;
  }

  viewAppsCheck(): void{
    this.showApis = false;
    this.showApps = true;
  }

  openModalAccess(accessFields: any, id: any): void{
    this.isSpinning = true;
    this.modalService.open(accessFields, {centered: true, scrollable: true, size: 'md'})

    this.mainService.getAssignedApplicationById(id).subscribe((result : any) => {
      if (result.IsSuccess === true){
        this.isSpinning = false;
      } else {
        this.toast.error(result.Error, {duration: 5000, position: 'top-right', style: { padding: '16px', color: '#000'}});
        this.isSpinning = false;
      }
    }, error => {
      this.toast.error(error.error.responseMessage, {duration: 7000, position: 'top-right', style: { padding: '16px', color: '#000'}});
      this.isSpinning = false;
    })

  }

  closeModal(): void{
    this.modalService.dismissAll()
  }

}
