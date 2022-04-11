import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServiceProtocolComponent } from './create-service-protocol.component';

describe('CreateServiceProtocolComponent', () => {
  let component: CreateServiceProtocolComponent;
  let fixture: ComponentFixture<CreateServiceProtocolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateServiceProtocolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateServiceProtocolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
