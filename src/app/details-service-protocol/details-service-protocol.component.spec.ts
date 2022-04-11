import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsServiceProtocolComponent } from './details-service-protocol.component';

describe('DetailsServiceProtocolComponent', () => {
  let component: DetailsServiceProtocolComponent;
  let fixture: ComponentFixture<DetailsServiceProtocolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsServiceProtocolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsServiceProtocolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
