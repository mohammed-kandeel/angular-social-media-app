import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPeopleWhoReactedModalComponent } from './post-people-who-reacted-modal.component';

describe('PostPeopleWhoReactedModalComponent', () => {
  let component: PostPeopleWhoReactedModalComponent;
  let fixture: ComponentFixture<PostPeopleWhoReactedModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostPeopleWhoReactedModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostPeopleWhoReactedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
