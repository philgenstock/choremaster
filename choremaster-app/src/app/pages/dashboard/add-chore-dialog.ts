import { Component, inject } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-chore-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  template: `
    <h2 mat-dialog-title>Add New Chore</h2>
    <mat-dialog-content style="overflow: visible; padding-top: 20px;">
      <mat-form-field appearance="outline" style="width: 100%;">
        <mat-label>Chore Name</mat-label>
        <input matInput [(ngModel)]="choreName" (keyup.enter)="onSubmit()" autofocus>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" (click)="onSubmit()" [disabled]="!choreName?.trim()">Add</button>
    </mat-dialog-actions>
  `
})
export class AddChoreDialog {
  dialogRef = inject(MatDialogRef<AddChoreDialog>);
  choreName = '';

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.choreName?.trim()) {
      this.dialogRef.close(this.choreName.trim());
    }
  }
}
