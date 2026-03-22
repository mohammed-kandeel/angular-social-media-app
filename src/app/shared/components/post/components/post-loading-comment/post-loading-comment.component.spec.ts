import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostLoadingCommentComponent } from './post-loading-comment.component';

describe('PostLoadingCommentComponent', () => {
  let component: PostLoadingCommentComponent;
  let fixture: ComponentFixture<PostLoadingCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostLoadingCommentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PostLoadingCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
