import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { ServiceProtocol } from '../models/ServiceProtocol';
import { ServiceprotocolService } from '../services/serviceprotocol.service';
import { LoaderService } from '../services/loader.service';
import { NotificationService } from '../services/notification.service';
import { ServicePart } from '../models/ServicePart';
import { DocumentService } from '../services/document.service';
declare const patternLockInit: any;

@Component({
  selector: 'app-details-service-protocol',
  templateUrl: './details-service-protocol.component.html',
  styleUrls: ['./details-service-protocol.component.css']
})
export class DetailsServiceProtocolComponent implements OnInit {

  serviceProtocol: ServiceProtocol;
  serviceProtocolForm: FormGroup;

  constructor(private service: ServiceprotocolService, 
              private documentService: DocumentService,
              private route: ActivatedRoute, 
              private fb: FormBuilder, 
              private loaderService: LoaderService,  
              private notificationService: NotificationService) {
    this.serviceProtocolForm = this.fb.group({
      'Id':[0],
      'ClientPhone':[''],
      'BrandModel':[''],
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
      'DataOfIssue':[''],
      'LockPattern':[''],
      'ServiceParts':this.fb.array([
        this.addServicePartsGroup()
      ])
    });
     this.fetchData();
   }

  ngOnInit() {
    patternLockInit();
  }

  fetchData(){
    this.loaderService.showLoader = true;
    this.route.params.pipe(map(params => {
      const id = params['id'];
      return id;
    }), mergeMap( id => this.service.getServiceProtocol(id))).subscribe(res => {
      this.serviceProtocol = res;
      
      this.serviceProtocolForm = this.fb.group({
        'Id':[this.serviceProtocol.id],
        'ClientPhone':[this.serviceProtocol.clientPhone],
        'BrandModel':[this.serviceProtocol.brandModel],
        'ClientEmail' : [this.serviceProtocol.clientEmail],
        'ServiceAction' : [this.serviceProtocol.serviceAction],
        'FaultInformation' : [this.serviceProtocol.faultInformation],
        'FinalPrice' : [this.serviceProtocol.finalPrice],
        'Comment' : [this.serviceProtocol.comment],
        'Bag':[this.serviceProtocol.bag],
        'SimTray': [this.serviceProtocol.simTray],
        'Charger':[this.serviceProtocol.charger],
        'Other':[this.serviceProtocol.other],
        'Pin':[this.serviceProtocol.pin],
        'UnlockPass':[this.serviceProtocol.unlockPass],
        'ServiceParts':[this.serviceProtocol.serviceParts],
        'LockPattern':[this.serviceProtocol.lockPattern],
        'DateOfIssue':[this.serviceProtocol.dateOfIssue],
        'ServicePartsJson':[this.serviceProtocol.servicePartsJson],
      });
      this.serviceProtocolForm.setControl('ServiceParts', this.setExistingParts(this.serviceProtocol.servicePartsJson));
      this.loaderService.showLoader = false;
    })
  }

  fetchDataWithConfimPopup(){
    if(confirm("Сиигурни ли сте че искате да презаредите данните на екрана?"))
    this.fetchData()
  }

  setExistingParts(servicePartsJson: string): FormArray{
     const formArray = new FormArray([]);
     let serviceParts = JSON.parse(servicePartsJson) as ServicePart[];  
     if(serviceParts != null){
      serviceParts.forEach(el => {
        formArray.push(this.fb.group({
          id: el.id,
          supplier: el.supplier,
          partType: el.partType,
          partPrice: el.partPrice,
          warrantyPeriod: el.warrantyPeriod,
          date: el.date
        }))
      });
     }
     
     return formArray;
  }

  editServiceProtocol(){
    this.loaderService.showLoader = true;
    this.serviceProtocolForm.value.LockPattern = (<HTMLInputElement>document.getElementById("lockPattern")).value;
    this.serviceProtocolForm.value.ServicePartsJson = JSON.stringify(this.serviceProtocolForm.value.ServiceParts)
    this.service.edit(this.serviceProtocolForm.value, this.serviceProtocol.id).subscribe(res => {   
      this.notificationService.showWarning("Сервизен протокол №" + this.serviceProtocol.id,"Успешна редакция");
      this.loaderService.showLoader = false;
    })
  }

  addServicePartsGroup():FormGroup{
    return this.fb.group({
      id:[0],
      supplier:[''],
      partType:[''],
      partPrice:[''],
      warrantyPeriod:[''],
      date:[null],
      serviceProtocolId:['']
    })
  }

  get servicePartsArray(){
    return (<FormArray>this.serviceProtocolForm.get('ServiceParts')).controls
  }

  onAddPart(){
    (<FormArray>this.serviceProtocolForm.get('ServiceParts')).push(this.addServicePartsGroup());
  }

  deleteServicePart(index: number) {
    (<FormArray>this.serviceProtocolForm.get('ServiceParts')).removeAt(index);
  }

  generateServiceProtocolDocument(){
    this.loaderService.showLoader = true;
    this.documentService.getServiceProtocolDocument(this.serviceProtocol.id).subscribe(res =>{
      let file = new Blob([res], { type: 'application/pdf' });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      this.loaderService.showLoader = false;
    });

  }
}
