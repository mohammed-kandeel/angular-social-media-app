import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostEmptyCommentsComponent } from './post-empty-comments.component';

describe('PostEmptyCommentsComponent', () => {
  let component: PostEmptyCommentsComponent;
  let fixture: ComponentFixture<PostEmptyCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostEmptyCommentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PostEmptyCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
