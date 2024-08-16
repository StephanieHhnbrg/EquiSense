import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenStatisticsComponent } from './token-statistics.component';

describe('TokenStatisticsComponent', () => {
  let component: TokenStatisticsComponent;
  let fixture: ComponentFixture<TokenStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokenStatisticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokenStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
