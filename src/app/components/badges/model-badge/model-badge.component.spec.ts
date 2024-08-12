import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelBadgeComponent } from './model-badge.component';

describe('ModelBadgeComponent', () => {
  let component: ModelBadgeComponent;
  let fixture: ComponentFixture<ModelBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelBadgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
