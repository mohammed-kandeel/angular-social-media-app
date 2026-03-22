import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmojiBtnComponent } from './emoji-btn.component';

describe('EmojiBtnComponent', () => {
  let component: EmojiBtnComponent;
  let fixture: ComponentFixture<EmojiBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmojiBtnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmojiBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
