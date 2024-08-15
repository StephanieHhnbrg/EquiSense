import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptCustomizationComponent } from './prompt-customization.component';

describe('EditPromptingLinkComponent', () => {
  let component: PromptCustomizationComponent;
  let fixture: ComponentFixture<PromptCustomizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromptCustomizationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromptCustomizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
