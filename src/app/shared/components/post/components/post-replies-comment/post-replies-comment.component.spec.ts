import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostRepliesCommentComponent } from './post-replies-comment.component';

describe('PostRepliesCommentComponent', () => {
  let component: PostRepliesCommentComponent;
  let fixture: ComponentFixture<PostRepliesCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostRepliesCommentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PostRepliesCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
