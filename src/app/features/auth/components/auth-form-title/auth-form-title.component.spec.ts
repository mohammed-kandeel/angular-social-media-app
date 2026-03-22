import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFormTitleComponent } from './auth-form-title.component';

describe('AuthFormTitleComponent', () => {
  let component: AuthFormTitleComponent;
  let fixture: ComponentFixture<AuthFormTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFormTitleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthFormTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
