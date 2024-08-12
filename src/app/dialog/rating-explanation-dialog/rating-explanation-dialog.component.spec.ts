import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingExplanationDialogComponent } from './rating-explanation-dialog.component';

describe('RatingExplanationDialogComponent', () => {
  let component: RatingExplanationDialogComponent;
  let fixture: ComponentFixture<RatingExplanationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingExplanationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingExplanationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
