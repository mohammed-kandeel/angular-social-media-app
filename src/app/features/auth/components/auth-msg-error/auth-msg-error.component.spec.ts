import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthMsgErrorComponent } from './auth-msg-error.component';

describe('AuthMsgErrorComponent', () => {
  let component: AuthMsgErrorComponent;
  let fixture: ComponentFixture<AuthMsgErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthMsgErrorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthMsgErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
