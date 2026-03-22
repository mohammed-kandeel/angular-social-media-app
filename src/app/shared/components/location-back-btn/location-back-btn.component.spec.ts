import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationBackBtnComponent } from './location-back-btn.component';

describe('LocationBackBtnComponent', () => {
  let component: LocationBackBtnComponent;
  let fixture: ComponentFixture<LocationBackBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationBackBtnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LocationBackBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
