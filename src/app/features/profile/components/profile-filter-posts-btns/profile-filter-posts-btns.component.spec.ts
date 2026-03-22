import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFilterPostsBtnsComponent } from './profile-filter-posts-btns.component';

describe('ProfileFilterPostsBtnsComponent', () => {
  let component: ProfileFilterPostsBtnsComponent;
  let fixture: ComponentFixture<ProfileFilterPostsBtnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileFilterPostsBtnsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileFilterPostsBtnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
