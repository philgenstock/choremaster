import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { signal } from '@angular/core';
import { of } from 'rxjs';

import { HouseholdSelect } from './household-select';
import { defaultTestProviders } from '../../../test-utils';
import { HouseholdService } from '../../service/household-service';
import { CreateHouseholdDialog } from '../create-household-dialog/create-household-dialog';

describe('HouseholdSelect', () => {
  let component: HouseholdSelect;
  let fixture: ComponentFixture<HouseholdSelect>;
  let mockHouseholdService: jasmine.SpyObj<HouseholdService>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    mockHouseholdService = jasmine.createSpyObj('HouseholdService', [
      'loadHouseholds',
      'createHousehold'
    ]);
    (mockHouseholdService as any).households = signal([]);

    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [HouseholdSelect],
      providers: [
        defaultTestProviders,
        { provide: HouseholdService, useValue: mockHouseholdService },
        { provide: MatDialog, useValue: mockDialog }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseholdSelect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with null selected household', () => {
    expect(component.selectedHouseholdId()).toBeNull();
  });

  it('should set selected household id when a household is selected', () => {
    component.onSelectionChange(123);
    expect(component.selectedHouseholdId()).toBe(123);
  });

  it('should open create dialog when "create" option is selected', () => {
    const mockDialogRef = {
      afterClosed: jasmine.createSpy().and.returnValue(of(null))
    };
    mockDialog.open.and.returnValue(mockDialogRef as any);

    component.onSelectionChange('create');

    expect(mockDialog.open).toHaveBeenCalledWith(CreateHouseholdDialog, {
      width: '400px'
    });
  });

  it('should create household and reload list when dialog confirms', () => {
    const newHousehold = { id: 456, name: 'New Household' };
    const mockDialogRef = {
      afterClosed: jasmine.createSpy().and.returnValue(of('New Household'))
    };
    mockDialog.open.and.returnValue(mockDialogRef as any);
    mockHouseholdService.createHousehold.and.returnValue(of(newHousehold));

    component.openCreateDialog();

    expect(mockDialogRef.afterClosed).toHaveBeenCalled();
    expect(mockHouseholdService.createHousehold).toHaveBeenCalledWith('New Household');
    expect(mockHouseholdService.loadHouseholds).toHaveBeenCalled();
    expect(component.selectedHouseholdId()).toBe(456);
  });

  it('should not create household when dialog is cancelled', () => {
    const mockDialogRef = {
      afterClosed: jasmine.createSpy().and.returnValue(of(null))
    };
    mockDialog.open.and.returnValue(mockDialogRef as any);

    component.openCreateDialog();

    expect(mockHouseholdService.createHousehold).not.toHaveBeenCalled();
    expect(component.selectedHouseholdId()).toBeNull();
  });

  it('should reset selection to null when dialog is cancelled', () => {
    component.selectedHouseholdId.set(123);
    const mockDialogRef = {
      afterClosed: jasmine.createSpy().and.returnValue(of(null))
    };
    mockDialog.open.and.returnValue(mockDialogRef as any);

    component.openCreateDialog();

    expect(component.selectedHouseholdId()).toBeNull();
  });

  it('should handle error when household creation fails', () => {
    const mockDialogRef = {
      afterClosed: jasmine.createSpy().and.returnValue(of('New Household'))
    };
    mockDialog.open.and.returnValue(mockDialogRef as any);
    mockHouseholdService.createHousehold.and.returnValue(
      new (class {
        subscribe(handlers: any) {
          handlers.error(new Error('Creation failed'));
        }
      })() as any
    );
    spyOn(console, 'error');

    component.openCreateDialog();

    expect(console.error).toHaveBeenCalledWith('Error creating household:', jasmine.any(Error));
  });
});
