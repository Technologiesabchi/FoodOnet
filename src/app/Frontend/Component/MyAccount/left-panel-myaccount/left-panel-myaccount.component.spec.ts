import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftPanelMyaccountComponent } from './left-panel-myaccount.component';

describe('LeftPanelMyaccountComponent', () => {
  let component: LeftPanelMyaccountComponent;
  let fixture: ComponentFixture<LeftPanelMyaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftPanelMyaccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeftPanelMyaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
