import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadMorePostsSpinnerComponent } from './load-more-posts-spinner.component';

describe('LoadMorePostsSpinnerComponent', () => {
  let component: LoadMorePostsSpinnerComponent;
  let fixture: ComponentFixture<LoadMorePostsSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadMorePostsSpinnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadMorePostsSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
