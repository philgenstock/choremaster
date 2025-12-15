import { Component, inject } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { HouseholdDto } from '../../../client';
import { MatDialog } from '@angular/material/dialog';
import { HouseholdService } from '../../service/household-service';
import { CreateHouseholdDialog } from '../../components/create-household-dialog/create-household-dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [MatCard, MatCardContent, MatButton, MatIcon],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  standalone: true
})
export default class Dashboard {

  householdService = inject(HouseholdService)
  dialog = inject(MatDialog)
  router = inject(Router)

  navigateToHousehold(household: HouseholdDto) {
    this.router.navigate(['/household', household.id]);
  }

  openAddHouseholdDialog() {
    const dialogRef = this.dialog.open(CreateHouseholdDialog, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(householdName => {
      if (householdName) {
        this.addHousehold(householdName);
      }
    });
  }

  private addHousehold(householdName: string) {
    this.householdService.createHousehold(householdName)
      .subscribe(() => this.householdService.loadHouseholds());
  }

}
