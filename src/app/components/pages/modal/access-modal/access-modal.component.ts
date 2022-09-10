import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainService } from './../../../services/main.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-access-modal',
  templateUrl: './access-modal.component.html',
  styleUrls: ['./access-modal.component.css']
})
export class AccessModalComponent implements OnInit {

  accessForm!: FormGroup;

  cities = [
    {name: 'New York', code: 'NY'},
    {name: 'Rome', code: 'RM'},
    {name: 'London', code: 'LDN'},
    {name: 'Istanbul', code: 'IST'},
    {name: 'Paris', code: 'PRS'}
];
selectedCountry: any;

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private mainService: MainService,
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
  }

  closeModal(): void{
    this.modalService.dismissAll()
  }

}
