import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCreateCommentComponent } from './input-create-comment.component';

describe('InputCreateCommentComponent', () => {
  let component: InputCreateCommentComponent;
  let fixture: ComponentFixture<InputCreateCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputCreateCommentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputCreateCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
