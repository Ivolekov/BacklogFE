import { Component, OnInit } from '@angular/core';
import { ServiceProtocol } from '../models/ServiceProtocol';
import { ServiceprotocolService } from '../services/serviceprotocol.service';
import { LoaderService } from '../services/loader.service';
import { NotificationService } from '../services/notification.service';
import { DocumentService } from '../services/document.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-list-service-protocols',
  templateUrl: './list-service-protocols.component.html',
  styleUrls: ['./list-service-protocols.component.css']
})
export class ListServiceProtocolsComponent implements OnInit {
  page = 1;
  pageSize = 15;
  itemsCount = 0;
  serviceProtocols: Array<ServiceProtocol>;
  
  constructor(private service: ServiceprotocolService,
              private documentService: DocumentService,
              private loaderService: LoaderService, 
              private notificationService: NotificationService,
              public authService: AuthService) { 
    loaderService.showLoader = true;
  }

  ngOnInit() {
    this.fetch();
  }

  fetch(){
    this.service.getServiceProtocols().subscribe(res => {
      this.serviceProtocols = res;
      this.itemsCount = this.serviceProtocols.length;
      this.loaderService.showLoader = false;
    });
  }

  changeProtocolStatus(id: number, statusId: number, index:number) {
    this.loaderService.showLoader = true;
     var currentIndexInArray = ((this.page - 1) * this.pageSize + this.pageSize) - this.pageSize + index;
     this.service.changeServiceProtocolStatus(id, statusId).subscribe(res => {
      this.serviceProtocols[currentIndexInArray].serviceProtocolStatusId = statusId;
      this.loaderService.showLoader = false;
     });
  }

  generateServiceProtocolWarrantyCardFileDocument(serviceProtocolId:number){
    let period = prompt("Моля задайте период на гаранцията в месеци:", "0");
    if (period == '0' || period == null || period.trim() == '' || isNaN(Number(period))) {
      return;
    }
    this.loaderService.showLoader = true;
    this.documentService.createServiceProtocolWarrantyCardFileDocument(serviceProtocolId, period).subscribe((res) => {
      let file = new Blob([res], { type: 'application/pdf' });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      this.notificationService.showWarning("Беше генериран успешно в PDF.", "Гаранционна карта към протокол №" + serviceProtocolId)
      this.loaderService.showLoader = false;
    });
  }

  arhiveServiceProtocol(protocolId: number, index: number){
    if (confirm("Сигурни ли сте, че искате да изтриете документ №" + protocolId)) {
      this.loaderService.showLoader = true;
      this.service.deleteServiceProtocol(protocolId).subscribe(res =>{
        var currentIndexInArray = ((this.page - 1) * this.pageSize + this.pageSize) - this.pageSize + index;
        this.serviceProtocols.splice(currentIndexInArray, 1);
        this.loaderService.showLoader = false;
      })
    }
  }

  generateFileDocument(protocolId: number){
    this.loaderService.showLoader = true;
    this.documentService.getServiceProtocolDocument(protocolId).subscribe(res =>{
      let file = new Blob([res], { type: 'application/pdf' });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      this.loaderService.showLoader = false;
    });
  }

  search(input: any){
    if(input.length > 2){
      this.loaderService.showLoader = true;
      this.service.search(input).subscribe(res=>{
      this.serviceProtocols = res;
      this.itemsCount = this.serviceProtocols.length;
      this.loaderService.showLoader = false;
      })
    }
    if(input == ""){
      this.fetch();
    }
  }

  searchOnClick(){
    let input = (<HTMLInputElement>document.getElementById("search")).value;
    this.search(input);
  }
}
