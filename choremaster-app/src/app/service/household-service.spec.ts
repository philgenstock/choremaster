import { TestBed } from '@angular/core/testing';
import { HouseholdService } from './household-service';
import { HouseholdControllerService, HouseholdDto } from '../../client';
import { of, throwError, Observable } from 'rxjs';
import { defaultTestProviders } from '../../test-utils';

describe('HouseholdService', () => {
  let service: HouseholdService;
  let householdControllerServiceSpy: jasmine.SpyObj<HouseholdControllerService>;

  const mockHouseholds: HouseholdDto[] = [
    { id: 1, name: 'Household 1' },
    { id: 2, name: 'Household 2' },
    { id: 3, name: 'Household 3' }
  ];

  beforeEach(() => {
    householdControllerServiceSpy = jasmine.createSpyObj<HouseholdControllerService>(
      'HouseholdControllerService',
      ['getAllHouseholdForCurrentUser']
    );
    // Set up the default return value
    (householdControllerServiceSpy.getAllHouseholdForCurrentUser as jasmine.Spy).and.returnValue(
      of([])
    );

    TestBed.configureTestingModule({
      providers: [
        ...defaultTestProviders,
        { provide: HouseholdControllerService, useValue: householdControllerServiceSpy }
      ]
    });
    service = TestBed.inject(HouseholdService);
  });

  afterEach(() => {
    householdControllerServiceSpy.getAllHouseholdForCurrentUser.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initial state', () => {
    it('should initialize with empty households array', () => {
      expect(service.households()).toEqual([]);
    });
  });

  describe('loadHouseholds', () => {
    it('should call getAllHouseholdForCurrentUser from controller service', () => {
      (householdControllerServiceSpy.getAllHouseholdForCurrentUser as jasmine.Spy).and.returnValue(
        of(mockHouseholds)
      );

      service.loadHouseholds();

      expect(householdControllerServiceSpy.getAllHouseholdForCurrentUser).toHaveBeenCalledTimes(1);
      expect(service.households()).toEqual(mockHouseholds);
    });

  });

  describe('resetHouseholds', () => {
    it('should set households to empty array', () => {
      (householdControllerServiceSpy.getAllHouseholdForCurrentUser as jasmine.Spy).and.returnValue(
        of(mockHouseholds)
      );
      service.loadHouseholds();

      service.households.set(mockHouseholds)
      service.resetHouseholds();
      expect(service.households()).toEqual([]);
  
    });
  });

});
