import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateChoreDialog } from './create-chore-dialog';
import { defaultTestProviders } from '../../../test-utils';

describe('CreateChoreDialog', () => {
  let component: CreateChoreDialog;
  let fixture: ComponentFixture<CreateChoreDialog>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<CreateChoreDialog>>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [CreateChoreDialog],
      providers: [
        ... defaultTestProviders,
        { provide: MatDialogRef, useValue: mockDialogRef }
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

  it('should close dialog with chore name when confirm is clicked with valid name', () => {
    component.choreName = 'Test Chore';
    component.onConfirm();
    expect(mockDialogRef.close).toHaveBeenCalledWith('Test Chore');
  });

  it('should trim chore name before closing', () => {
    component.choreName = '  Test Chore  ';
    component.onConfirm();
    expect(mockDialogRef.close).toHaveBeenCalledWith('Test Chore');
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
});
