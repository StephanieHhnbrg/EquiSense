import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePromptsDialogComponent } from './generate-prompts-dialog.component';

describe('GeneratePromptsDialogComponent', () => {
  let component: GeneratePromptsDialogComponent;
  let fixture: ComponentFixture<GeneratePromptsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneratePromptsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneratePromptsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
