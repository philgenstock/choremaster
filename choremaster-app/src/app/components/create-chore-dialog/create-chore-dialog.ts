import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ChoreDto } from '../../../client';

export interface ChoreDialogData {
  chore?: ChoreDto;
  mode: 'create' | 'edit';
}

export interface ChoreDialogResult {
  name: string;
  intervalDays: number;
}

@Component({
  selector: 'app-add-chore-dialog',
  imports: [MatDialogModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatSelectModule, FormsModule],
  templateUrl: './create-chore-dialog.html',
  styleUrl: './create-chore-dialog.scss',
})
export class CreateChoreDialog implements OnInit {
  dialogRef = inject(MatDialogRef<CreateChoreDialog>);
  data = inject<ChoreDialogData>(MAT_DIALOG_DATA);

  choreName = '';
  intervalDays = 7;

  intervalPresets = [
    { label: 'Daily', value: 1 },
    { label: 'Every 3 days', value: 3 },
    { label: 'Weekly', value: 7 },
    { label: 'Every 2 weeks', value: 14 },
    { label: 'Monthly (30 days)', value: 30 }
  ];

  ngOnInit(): void {
    if (this.data?.chore) {
      this.choreName = this.data.chore.name || '';
      this.intervalDays = this.data.chore.intervalDays || 7;
    }
  }

  get dialogTitle(): string {
    return this.data?.mode === 'edit' ? 'Edit Chore' : 'Create New Chore';
  }

  get confirmButtonText(): string {
    return this.data?.mode === 'edit' ? 'Update' : 'Create';
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    if (this.choreName.trim()) {
      const result: ChoreDialogResult = {
        name: this.choreName.trim(),
        intervalDays: this.intervalDays
      };
      this.dialogRef.close(result);
    }
  }
}
