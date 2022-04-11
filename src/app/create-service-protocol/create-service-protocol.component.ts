import { Component, OnInit, Renderer2 } from '@angular/core';
import {  FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { ServiceprotocolService } from '../services/serviceprotocol.service';
import { NotificationService } from '../services/notification.service';
import { ServicePart } from '../models/ServicePart';
declare const patternLockInit: any;
declare const resetLockPattern: any;

@Component({
  selector: 'app-create-service-protocol',
  templateUrl: './create-service-protocol.component.html',
  styleUrls: ['./create-service-protocol.component.css']
})
export class CreateServiceProtocolComponent implements OnInit {
  
  serviceProtocolForm: FormGroup;
  //serviceParts: Array<ServicePart>;
  servicePart: ServicePart;

  constructor(private service: ServiceprotocolService,
              private fb: FormBuilder,
              private authService: AuthService,
              private router:Router,
              private loaderService: LoaderService,
              private notificationService: NotificationService) {
        
        this.serviceProtocolInit();
        
   }

  ngOnInit() {
    if(!this.authService.isAuthenticated()){
      this.router.navigate(["login"]);
    }
    patternLockInit();
  }

  

  submitServiceProtocol() {
    this.loaderService.showLoader = true;
    if(this.serviceProtocolForm.value.FinalPrice == ""){
      this.serviceProtocolForm.value.FinalPrice = 0;
    }
    let row = 1;
    let isInError = 0;
    this.servicePartsArray.forEach(el=>{
      if (isNaN(Number(el.value.partPrice))) {
        this.notificationService.showError("Полето 'Цена' трабва да е само с числа!", "Част/Услуги Ред:" + row);
        isInError = 1;
      }
  
      if (isNaN(Number(el.value.warrantyPeriod))) {
        this.notificationService.showError("Полето 'Гаранция' трабва да е само с числа!", "Част/Услуги Ред:" + row);
        isInError = 1;
      }
      row++;
    })

    if(isInError == 0){
      this.serviceProtocolForm.value.LockPattern = (<HTMLInputElement>document.getElementById("lockPattern")).value;
      this.serviceProtocolForm.value.ServicePartsJson = JSON.stringify(this.serviceProtocolForm.value.ServiceParts)
      this.service.create(this.serviceProtocolForm.value).subscribe(res=>{

        if(this.servicePartsArray.length > 0){
           this.servicePartsArray.forEach(el=>{
           el.value.serviceProtocolId = res;
   
           if(el.value.partPrice == ''){
             el.value.partPrice = 0;
           }
           if(el.value.warrantyPeriod == ''){
             el.value.warrantyPeriod = 0;
           }
         })
        }
        
         this.notificationService.showSuccess("Беше създаден успешно.", "Сервизен Протокол №" + res);
         this.serviceProtocolInit();
         this.clearPartArray();
         resetLockPattern();
       })
    }
    this.loaderService.showLoader = false;  
  }

  serviceProtocolInit():FormGroup{
    return this.serviceProtocolForm = this.fb.group({
      'ClientPhone':[''],
      'BrandModel' : [''],
      'ClientEmail' : [''],
      'ServiceAction' : [''],
      'FaultInformation' : [''],
      'FinalPrice' : [''],
      'Comment' : [''],
      'Bag':[false],
      'SimTray': [false],
      'Charger':[false],
      'Other':[''],
      'Pin':[''],
      'UnlockPass':[''],
      'LockPattern':[''],
      'ServicePartsJson':[''],
      'ServiceParts':this.fb.array([])
    });
  }

  addServicePartsGroup():FormGroup{
    return this.fb.group({
      supplier:[''],
      partType:[''],
      partPrice:[''],
      warrantyPeriod:[''],
      date:[null],
      serviceProtocolId:['']
    })
  }

  onAddPart(){
    (<FormArray>this.serviceProtocolForm.get('ServiceParts')).push(this.addServicePartsGroup());
  }

  clearPartArray(){
    (<FormArray>this.serviceProtocolForm.get('ServiceParts')).clear();
  }

  deleteServicePart(index: number) {
    (<FormArray>this.serviceProtocolForm.get('ServiceParts')).removeAt(index);
  }

  get servicePartsArray(){
    return (<FormArray>this.serviceProtocolForm.get('ServiceParts')).controls
  }
}
