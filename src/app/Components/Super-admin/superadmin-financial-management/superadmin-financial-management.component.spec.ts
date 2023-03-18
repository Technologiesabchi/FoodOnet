import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperadminFinancialManagementComponent } from './superadmin-financial-management.component';

describe('SuperadminFinancialManagementComponent', () => {
  let component: SuperadminFinancialManagementComponent;
  let fixture: ComponentFixture<SuperadminFinancialManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperadminFinancialManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperadminFinancialManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
