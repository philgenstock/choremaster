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
    localStorage.clear();

    householdControllerServiceSpy = jasmine.createSpyObj<HouseholdControllerService>(
      'HouseholdControllerService',
      ['getAllHouseholdForCurrentUser', 'createHousehold']
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
    householdControllerServiceSpy.createHousehold.calls.reset();
    localStorage.clear();
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

  describe('createHousehold', () => {
    it('should call createHousehold from controller service with household name', () => {
      const newHousehold: HouseholdDto = { id: 4, name: 'New Household' };
      (householdControllerServiceSpy.createHousehold as jasmine.Spy).and.returnValue(
        of(newHousehold)
      );

      const result$ = service.createHousehold('New Household');

      expect(householdControllerServiceSpy.createHousehold).toHaveBeenCalledWith({ name: 'New Household' });

      result$.subscribe(result => {
        expect(result).toEqual(newHousehold);
      });
    });

    it('should return an observable with the created household', (done) => {
      const newHousehold: HouseholdDto = { id: 5, name: 'Test Household' };
      (householdControllerServiceSpy.createHousehold as jasmine.Spy).and.returnValue(
        of(newHousehold)
      );

      service.createHousehold('Test Household').subscribe(result => {
        expect(result).toEqual(newHousehold);
        done();
      });
    });

    it('should propagate errors from the controller service', (done) => {
      const error = new Error('Creation failed');
      (householdControllerServiceSpy.createHousehold as jasmine.Spy).and.returnValue(
        throwError(() => error)
      );

      service.createHousehold('Failed Household').subscribe({
        next: () => fail('should not succeed'),
        error: (err) => {
          expect(err).toBe(error);
          done();
        }
      });
    });
  });

  describe('selectedHouseholdId', () => {
    it('should allow setting selectedHouseholdId', () => {
      service.selectedHouseholdId.set(123);
      expect(service.selectedHouseholdId()).toBe(123);
    });

    it('should allow resetting selectedHouseholdId to null', () => {
      service.selectedHouseholdId.set(456);
      service.selectedHouseholdId.set(null);
      expect(service.selectedHouseholdId()).toBeNull();
    });
  });

  describe('constructor localStorage integration', () => {
    it('should initialize selectedHouseholdId from localStorage when value exists', () => {
      // Arrange: Set up localStorage before service creation
      localStorage.setItem('SELECTED_HOUSEHOLD', '42');

      // Re-inject service to trigger constructor
      const newService = TestBed.inject(HouseholdService);

      // Assert
      expect(newService.selectedHouseholdId()).toBe(42);
    });

    it('should initialize selectedHouseholdId as null when localStorage is empty', () => {
      // localStorage is already cleared in beforeEach

      // Re-inject service to trigger constructor
      const newService = TestBed.inject(HouseholdService);

      // Assert
      expect(newService.selectedHouseholdId()).toBeNull();
    });

    it('should save selectedHouseholdId to localStorage when value changes', () => {
      // Act
      service.selectedHouseholdId.set(123);

      // Assert
      expect(localStorage.getItem('SELECTED_HOUSEHOLD')).toBe('123');
    });

    it('should update localStorage when selectedHouseholdId changes to null', () => {
      // Arrange
      service.selectedHouseholdId.set(456);
      expect(localStorage.getItem('SELECTED_HOUSEHOLD')).toBe('456');

      // Act
      service.selectedHouseholdId.set(null);

      // Assert
      expect(localStorage.getItem('SELECTED_HOUSEHOLD')).toBe('null');
    });
  });

});
