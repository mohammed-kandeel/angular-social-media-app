import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustProfilePhotoModalComponent } from './adjust-profile-photo-modal.component';

describe('AdjustProfilePhotoModalComponent', () => {
  let component: AdjustProfilePhotoModalComponent;
  let fixture: ComponentFixture<AdjustProfilePhotoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdjustProfilePhotoModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdjustProfilePhotoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
