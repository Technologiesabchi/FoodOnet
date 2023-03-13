import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HSNCodeListComponent } from './hsn-code-list.component';

describe('HSNCodeListComponent', () => {
  let component: HSNCodeListComponent;
  let fixture: ComponentFixture<HSNCodeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HSNCodeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HSNCodeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
