import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdSelect } from './household-select';

describe('HouseholdSelect', () => {
  let component: HouseholdSelect;
  let fixture: ComponentFixture<HouseholdSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HouseholdSelect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseholdSelect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
