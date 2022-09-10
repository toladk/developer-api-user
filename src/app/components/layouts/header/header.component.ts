import { Router } from '@angular/router';
import { TokenService } from './../../../authentication/services/token.service';
import { AccessModalComponent } from './../../pages/modal/access-modal/access-modal.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  checkLoggedin = true;
  checkName = false;

  constructor(
    private modalService: NgbModal,
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.checkLogin();

  }

  checkLogin(): void{
    if (sessionStorage.length === 0){
      this.checkLoggedin = true;
      this.checkName = false;
    } else {
      this.checkLoggedin = false;
      this.checkName = true;
    }
  }

  requestAccess(): void{
    this.modalService.open(AccessModalComponent, {centered: true, scrollable: true, size: 'md'})
  }
  closeModal(): void{
    this.modalService.dismissAll()
  }

  logout(): void{
    this.tokenService.logout();
  }

  reload(): void{
    window.location.reload();
  }



}
