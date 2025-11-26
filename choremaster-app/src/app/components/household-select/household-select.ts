import { Component, inject } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { HouseholdService } from '../../service/household-service';
import { CreateHouseholdDialog } from '../create-household-dialog/create-household-dialog';

@Component({
  selector: 'app-household-select',
  imports: [MatSelectModule],
  templateUrl: './household-select.html',
  styleUrl: './household-select.scss',
})
export class HouseholdSelect {

  householdService = inject(HouseholdService);
  dialog = inject(MatDialog);

  onSelectionChange(value: number | string) {
    if (value === 'create') {
      this.openCreateDialog();
    } else {
      this.householdService.selectedHouseholdId.set(value as number);
    }
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(CreateHouseholdDialog, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(householdName => {
      if (householdName) {
        this.householdService.createHousehold(householdName).subscribe({
          next: (newHousehold) => {
            this.householdService.loadHouseholds();
            this.householdService.selectedHouseholdId.set(newHousehold.id ?? null);
          },
          error: (error) => {
            console.error('Error creating household:', error);
          }
        });
      } else {
        this.householdService.selectedHouseholdId.set(null);
      }
    });
  }
}
