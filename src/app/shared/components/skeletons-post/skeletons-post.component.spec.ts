import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonsPostComponent } from './skeletons-post.component';

describe('SkeletonsPostComponent', () => {
  let component: SkeletonsPostComponent;
  let fixture: ComponentFixture<SkeletonsPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonsPostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SkeletonsPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
