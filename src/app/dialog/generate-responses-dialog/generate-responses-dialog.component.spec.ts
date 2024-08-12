import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateResponsesDialogComponent } from './generate-responses-dialog.component';

describe('GenerateResponsesDialogComponent', () => {
  let component: GenerateResponsesDialogComponent;
  let fixture: ComponentFixture<GenerateResponsesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateResponsesDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateResponsesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
