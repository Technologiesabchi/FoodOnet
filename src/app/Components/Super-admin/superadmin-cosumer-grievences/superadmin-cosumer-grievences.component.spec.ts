import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperadminCosumerGrievencesComponent } from './superadmin-cosumer-grievences.component';

describe('SuperadminCosumerGrievencesComponent', () => {
  let component: SuperadminCosumerGrievencesComponent;
  let fixture: ComponentFixture<SuperadminCosumerGrievencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperadminCosumerGrievencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperadminCosumerGrievencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
