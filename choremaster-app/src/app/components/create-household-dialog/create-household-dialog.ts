import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-household-dialog',
  imports: [MatDialogModule, MatButtonModule, MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './create-household-dialog.html',
  styleUrl: './create-household-dialog.scss',
})
export class CreateHouseholdDialog {
  dialogRef = inject(MatDialogRef<CreateHouseholdDialog>);
  householdName = '';

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    if (this.householdName.trim()) {
      this.dialogRef.close(this.householdName.trim());
    }
  }
}
