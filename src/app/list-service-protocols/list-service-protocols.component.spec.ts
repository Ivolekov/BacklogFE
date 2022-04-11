import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListServiceProtocolsComponent } from './list-service-protocols.component';

describe('ListServiceProtocolsComponent', () => {
  let component: ListServiceProtocolsComponent;
  let fixture: ComponentFixture<ListServiceProtocolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListServiceProtocolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListServiceProtocolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
