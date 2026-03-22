import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostLoadMoreCommentsBtnComponent } from './post-load-more-comments-btn.component';

describe('PostLoadMoreCommentsBtnComponent', () => {
  let component: PostLoadMoreCommentsBtnComponent;
  let fixture: ComponentFixture<PostLoadMoreCommentsBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostLoadMoreCommentsBtnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PostLoadMoreCommentsBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
