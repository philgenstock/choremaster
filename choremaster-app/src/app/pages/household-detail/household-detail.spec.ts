import { ComponentFixture, TestBed } from '@angular/core/testing';
import HouseholdDetail from './household-detail';
import { defaultTestProviders } from '../../../test-utils';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('HouseholdDetail', () => {
  let component: HouseholdDetail;
  let fixture: ComponentFixture<HouseholdDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        ...defaultTestProviders,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => key === 'householdId' ? '1' : null
              }
            }
          }
        }
      ],
      imports: [HouseholdDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseholdDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load household id from route params', () => {
    expect(component.householdId).toBe(1);
  });
});
