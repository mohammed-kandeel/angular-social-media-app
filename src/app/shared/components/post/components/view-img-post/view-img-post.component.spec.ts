import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewImgPostComponent } from './view-img-post.component';

describe('ViewImgPostComponent', () => {
  let component: ViewImgPostComponent;
  let fixture: ComponentFixture<ViewImgPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewImgPostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewImgPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
