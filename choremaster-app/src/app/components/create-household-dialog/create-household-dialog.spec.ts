import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateHouseholdDialog } from './create-household-dialog';
import { defaultTestProviders } from '../../../test-utils';

describe('CreateHouseholdDialog', () => {
  let component: CreateHouseholdDialog;
  let fixture: ComponentFixture<CreateHouseholdDialog>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<CreateHouseholdDialog>>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [CreateHouseholdDialog],
      providers: [
        ... defaultTestProviders,
        { provide: MatDialogRef, useValue: mockDialogRef }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateHouseholdDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty household name', () => {
    expect(component.householdName).toBe('');
  });

  it('should close dialog without value when cancel is clicked', () => {
    component.onCancel();
    expect(mockDialogRef.close).toHaveBeenCalledWith();
  });

  it('should close dialog with household name when confirm is clicked with valid name', () => {
    component.householdName = 'Test Household';
    component.onConfirm();
    expect(mockDialogRef.close).toHaveBeenCalledWith('Test Household');
  });

  it('should trim household name before closing', () => {
    component.householdName = '  Test Household  ';
    component.onConfirm();
    expect(mockDialogRef.close).toHaveBeenCalledWith('Test Household');
  });

  it('should not close dialog when confirm is clicked with empty name', () => {
    component.householdName = '';
    component.onConfirm();
    expect(mockDialogRef.close).not.toHaveBeenCalled();
  });

  it('should not close dialog when confirm is clicked with whitespace only', () => {
    component.householdName = '   ';
    component.onConfirm();
    expect(mockDialogRef.close).not.toHaveBeenCalled();
  });
});
