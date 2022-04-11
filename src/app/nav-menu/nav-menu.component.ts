import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faStackOverflow, faGithub, faMedium } from '@fortawesome/free-brands-svg-icons';
import { faSquare, faCheckSquare, faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { AuthService } from '../services/auth.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../services/notification.service';
import { CompanyService } from '../services/company.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CompanyProfile } from '../models/CompanyProfile';
import { LoaderService } from '../services/loader.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  companyProfile: CompanyProfile;
  companyProfileForm: FormGroup;
  closeResult = '';

  constructor(public authService: AuthService, 
              private router: Router,
              private modalService: NgbModal,
              private fb: FormBuilder,
              private library: FaIconLibrary,
              private loaderService: LoaderService,  
              private notificationService: NotificationService,
              private companyService: CompanyService) {
    
    this.library.addIcons(faSquare, faCheckSquare, faStackOverflow, faGithub, faMedium, faUserCircle);
    
    this.companyProfileForm = this.fb.group({
      "Id":[0],
      "CompanyName": [''],
      "CompanyAddress": [''],
      "CompanyPhone": [''],
      "CompanyEmail": [''],
      "CompanyWebAddress": [''],
      "Bulstat":[''],
      "CompanyOwnerName":['']
    });
    //this.fetchData();
  }

  ngOnInit() {
  }

  logout(){
    this.router.navigate(["login"]);
    this.authService.deleteToken();
  }
  
  fetchData(){
    this.loaderService.showLoader = true;
    this.companyService.getCompanyProfile().subscribe(res => {
      this.companyProfile = res;
      this.companyProfileForm = this.fb.group({
        "Id":[this.companyProfile.id],
        "CompanyName":[this.companyProfile.companyName],
        "CompanyAddress":[this.companyProfile.companyAddress],
        "CompanyPhone":[this.companyProfile.companyPhone],
        "CompanyEmail":[this.companyProfile.companyEmail],
        "CompanyWebAddress":[this.companyProfile.companyWebAddress],
        "Bulstat":["999999999"],
        "CompanyOwner":["John Smith"]
      })
      this.loaderService.showLoader = false;
    })
  }

  openCompanyProfileModal(content: any) {
    this.fetchData();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      
      this.closeResult = `Closed with: ${result}`;
      this.companyService.updateCompanyProfile(this.companyProfile.id, this.companyProfileForm.value).subscribe(res => {
        this.notificationService.showInfo("", "Успешно редактирахте своя профил.");
      })
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
