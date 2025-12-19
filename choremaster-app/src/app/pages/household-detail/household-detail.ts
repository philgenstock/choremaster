import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCard, MatCardTitle, MatCardActions, MatCardContent } from '@angular/material/card';
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { ChoreControllerService, ChoreDto } from '../../../client';
import { MatDialog } from '@angular/material/dialog';
import { CreateChoreDialog, ChoreDialogData, ChoreDialogResult } from '../../components/create-chore-dialog/create-chore-dialog';

@Component({
  selector: 'app-household-detail',
  imports: [MatCard, MatCardTitle, MatCardContent, MatCardActions, MatButton, MatIcon],
  templateUrl: './household-detail.html',
  styleUrl: './household-detail.scss',
  standalone: true
})
export default class HouseholdDetail implements OnInit {

  choreControllerService = inject(ChoreControllerService)
  dialog = inject(MatDialog)
  router = inject(Router)
  route = inject(ActivatedRoute)

  chores = signal<ChoreDto[]>([])
  householdId: number | null = null

  ngOnInit(): void {
    const householdIdParam = this.route.snapshot.paramMap.get('householdId');
    if (householdIdParam) {
      this.householdId = Number(householdIdParam)
      this.loadChores()
    }
  }

  loadChores() {
    if (this.householdId) {
      this.choreControllerService.getChoresByHousehold(this.householdId)
        .subscribe(chores => this.chores.set(chores))
    }
  }

  deleteChore(chore: ChoreDto) {
    this.choreControllerService.deleteChore(chore.id!!).subscribe(() => this.loadChores())
  }

  navigateToChore(chore: ChoreDto) {
    this.router.navigate(['/chores', chore.id]);
  }

  openAddChoreDialog() {
    const dialogData: ChoreDialogData = {
      mode: 'create'
    };

    const dialogRef = this.dialog.open(CreateChoreDialog, {
      width: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe((result: ChoreDialogResult) => {
      if (result) {
        this.addChore(result);
      }
    });
  }

  openEditChoreDialog(chore: ChoreDto) {
    const dialogData: ChoreDialogData = {
      chore: chore,
      mode: 'edit'
    };

    const dialogRef = this.dialog.open(CreateChoreDialog, {
      width: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe((result: ChoreDialogResult) => {
      if (result) {
        this.updateChore(chore.id!!, result);
      }
    });
  }

  private addChore(result: ChoreDialogResult) {
    if (!this.householdId) {
      return;
    }

    this.choreControllerService.createChore({
      name: result.name,
      intervalDays: result.intervalDays,
      householdId: this.householdId
    }).subscribe(() => this.loadChores());
  }

  private updateChore(choreId: number, result: ChoreDialogResult) {
    this.choreControllerService.updateChore(choreId, {
      name: result.name,
      intervalDays: result.intervalDays
    }).subscribe(() => this.loadChores());
  }

  getIntervalText(intervalDays?: number): string {
    if (!intervalDays) return '';

    if (intervalDays === 1) return 'Daily';
    if (intervalDays === 3) return 'Every 3 days';
    if (intervalDays === 7) return 'Weekly';
    if (intervalDays === 14) return 'Every 2 weeks';
    if (intervalDays === 30) return 'Monthly';

    return `Every ${intervalDays} days`;
  }

}
