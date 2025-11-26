import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-chore-dialog',
  imports: [MatDialogModule, MatButtonModule, MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './create-chore-dialog.html',
  styleUrl: './create-chore-dialog.scss',
})
export class CreateChoreDialog {
  dialogRef = inject(MatDialogRef<CreateChoreDialog>);
  choreName = '';

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    if (this.choreName.trim()) {
      this.dialogRef.close(this.choreName.trim());
    }
  }
}
