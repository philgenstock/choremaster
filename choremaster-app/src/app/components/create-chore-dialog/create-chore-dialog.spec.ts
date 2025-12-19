import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateChoreDialog, ChoreDialogData } from './create-chore-dialog';
import { defaultTestProviders } from '../../../test-utils';

describe('CreateChoreDialog', () => {
  let component: CreateChoreDialog;
  let fixture: ComponentFixture<CreateChoreDialog>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<CreateChoreDialog>>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    const mockDialogData: ChoreDialogData = {
      mode: 'create'
    };

    await TestBed.configureTestingModule({
      imports: [CreateChoreDialog],
      providers: [
        ... defaultTestProviders,
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateChoreDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should close dialog without value when cancel is clicked', () => {
    component.onCancel();
    expect(mockDialogRef.close).toHaveBeenCalledWith();
  });

  it('should close dialog with chore data when confirm is clicked with valid name', () => {
    component.choreName = 'Test Chore';
    component.intervalDays = 7;
    component.onConfirm();
    expect(mockDialogRef.close).toHaveBeenCalledWith({
      name: 'Test Chore',
      intervalDays: 7
    });
  });

  it('should trim chore name before closing', () => {
    component.choreName = '  Test Chore  ';
    component.intervalDays = 3;
    component.onConfirm();
    expect(mockDialogRef.close).toHaveBeenCalledWith({
      name: 'Test Chore',
      intervalDays: 3
    });
  });

  it('should not close dialog when confirm is clicked with empty name', () => {
    component.choreName = '';
    component.onConfirm();
    expect(mockDialogRef.close).not.toHaveBeenCalled();
  });

  it('should not close dialog when confirm is clicked with whitespace only', () => {
    component.choreName = '   ';
    component.onConfirm();
    expect(mockDialogRef.close).not.toHaveBeenCalled();
  });

  it('should display "Create New Chore" title in create mode', () => {
    expect(component.dialogTitle).toBe('Create New Chore');
  });

  it('should display "Create" button text in create mode', () => {
    expect(component.confirmButtonText).toBe('Create');
  });

  it('should set default interval to 7 days', () => {
    expect(component.intervalDays).toBe(7);
  });
});

describe('CreateChoreDialog in edit mode', () => {
  let component: CreateChoreDialog;
  let fixture: ComponentFixture<CreateChoreDialog>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<CreateChoreDialog>>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    const mockDialogData: ChoreDialogData = {
      mode: 'edit',
      chore: {
        id: 1,
        name: 'Existing Chore',
        intervalDays: 14
      }
    };

    await TestBed.configureTestingModule({
      imports: [CreateChoreDialog],
      providers: [
        ... defaultTestProviders,
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateChoreDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should populate fields with existing chore data', () => {
    expect(component.choreName).toBe('Existing Chore');
    expect(component.intervalDays).toBe(14);
  });

  it('should display "Edit Chore" title in edit mode', () => {
    expect(component.dialogTitle).toBe('Edit Chore');
  });

  it('should display "Update" button text in edit mode', () => {
    expect(component.confirmButtonText).toBe('Update');
  });
});
