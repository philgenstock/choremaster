import { Component, inject } from '@angular/core';
import { ChoreService } from '../../service/chore-service';
import { MatCard, MatCardTitle, MatCardActions } from '@angular/material/card';
import { MatAnchor, MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { ChoreControllerService, ChoreDto } from '../../../client';
import { MatDialog } from '@angular/material/dialog';
import { AddChoreDialog } from './add-chore-dialog';
import { HouseholdService } from '../../service/household-service';

@Component({
  selector: 'app-dashboard',
  imports: [MatCard, MatCardTitle, MatCardActions, MatAnchor, MatButton, MatIcon],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  standalone: true
})
export default class Dashboard {

  choreService = inject(ChoreService)
  choreControllerService = inject(ChoreControllerService)
  householdService = inject(HouseholdService)
  dialog = inject(MatDialog)

  deleteChore(chore: ChoreDto) {
    this.choreControllerService.deleteChore(chore.id!!).subscribe(() => this.choreService.loadChores())
  }

  openAddChoreDialog() {
    const dialogRef = this.dialog.open(AddChoreDialog, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(choreName => {
      if (choreName) {
        this.addChore(choreName);
      }
    });
  }

  private addChore(choreName: string) {
    const householdId = this.householdService.selectedHouseholdId();
    if (!householdId) {
      return;
    }

    this.choreControllerService.createChore({ name: choreName, householdId })
      .subscribe(() => this.choreService.loadChores());
  }

}
