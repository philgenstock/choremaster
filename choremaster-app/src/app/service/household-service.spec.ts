import { TestBed } from '@angular/core/testing';
import { HouseholdService } from './household-service';
import { HouseholdControllerService, HouseholdDto } from '../../client';
import { of, throwError } from 'rxjs';
import { defaultTestProviders } from '../../test-utils';

describe('HouseholdService', () => {
  let service: HouseholdService;
  let householdControllerServiceSpy: jasmine.SpyObj<HouseholdControllerService>;
  let localStorageSpy: jasmine.SpyObj<Storage>;

  const mockHouseholds: HouseholdDto[] = [
    { id: 1, name: 'Household 1' },
    { id: 2, name: 'Household 2' },
    { id: 3, name: 'Household 3' }
  ];

  beforeEach(() => {
    localStorageSpy = jasmine.createSpyObj('localStorage', ['getItem', 'setItem', 'removeItem']);
    Object.defineProperty(window, 'localStorage', {
      value: localStorageSpy,
      writable: true
    });

    householdControllerServiceSpy = jasmine.createSpyObj<HouseholdControllerService>(
      'HouseholdControllerService',
      ['getAllHouseholdForCurrentUser', 'createHousehold']
    );
    // Set up the default return value
    (householdControllerServiceSpy.getAllHouseholdForCurrentUser as jasmine.Spy).and.returnValue(
      of([])
    );
  });

  afterEach(() => {
    localStorageSpy.getItem.calls.reset();
    localStorageSpy.setItem.calls.reset();
    localStorageSpy.removeItem.calls.reset();
    householdControllerServiceSpy.getAllHouseholdForCurrentUser.calls.reset();
    householdControllerServiceSpy.createHousehold.calls.reset();
  });

  it('should be created', () => {
    localStorageSpy.getItem.and.returnValue(null);
    TestBed.configureTestingModule({
      providers: [
        ...defaultTestProviders,
        { provide: HouseholdControllerService, useValue: householdControllerServiceSpy }
      ]
    });
    service = TestBed.inject(HouseholdService);
    expect(service).toBeTruthy();
  });

  describe('initial state', () => {
    beforeEach(() => {
      localStorageSpy.getItem.and.returnValue(null);
      TestBed.configureTestingModule({
        providers: [
          ...defaultTestProviders,
          { provide: HouseholdControllerService, useValue: householdControllerServiceSpy }
        ]
      });
      service = TestBed.inject(HouseholdService);
    });

    it('should initialize with empty households array', () => {
      expect(service.households()).toEqual([]);
    });
  });

  describe('loadHouseholds', () => {
    beforeEach(() => {
      localStorageSpy.getItem.and.returnValue(null);
      TestBed.configureTestingModule({
        providers: [
          ...defaultTestProviders,
          { provide: HouseholdControllerService, useValue: householdControllerServiceSpy }
        ]
      });
      service = TestBed.inject(HouseholdService);
    });

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
    beforeEach(() => {
      localStorageSpy.getItem.and.returnValue(null);
      TestBed.configureTestingModule({
        providers: [
          ...defaultTestProviders,
          { provide: HouseholdControllerService, useValue: householdControllerServiceSpy }
        ]
      });
      service = TestBed.inject(HouseholdService);
    });

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
    beforeEach(() => {
      localStorageSpy.getItem.and.returnValue(null);
      TestBed.configureTestingModule({
        providers: [
          ...defaultTestProviders,
          { provide: HouseholdControllerService, useValue: householdControllerServiceSpy }
        ]
      });
      service = TestBed.inject(HouseholdService);
    });

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

});
