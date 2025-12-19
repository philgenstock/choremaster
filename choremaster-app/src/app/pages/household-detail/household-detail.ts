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

  getExecutionStatusText(chore: ChoreDto): string {
    if (!chore.lastExecution?.executedAt) {
      return 'Never executed';
    }

    const lastExecutionDate = new Date(chore.lastExecution.executedAt);
    const now = new Date();
    const daysSinceExecution = Math.floor((now.getTime() - lastExecutionDate.getTime()) / (1000 * 60 * 60 * 24));

    if (daysSinceExecution === 0) {
      return 'Executed today';
    } else if (daysSinceExecution === 1) {
      return 'Executed yesterday';
    } else {
      return `Executed ${daysSinceExecution} days ago`;
    }
  }

  getDaysUntilDue(chore: ChoreDto): number | null {
    if (!chore.lastExecution?.executedAt || !chore.intervalDays) {
      return null;
    }

    const lastExecutionDate = new Date(chore.lastExecution.executedAt);
    const dueDate = new Date(lastExecutionDate.getTime() + (chore.intervalDays * 24 * 60 * 60 * 1000));
    const now = new Date();
    const daysUntilDue = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    return daysUntilDue;
  }

  getDueStatusText(chore: ChoreDto): string {
    const daysUntilDue = this.getDaysUntilDue(chore);

    if (daysUntilDue === null) {
      return 'No due date';
    }

    if (daysUntilDue < 0) {
      const daysOverdue = Math.abs(daysUntilDue);
      return daysOverdue === 1 ? 'Overdue by 1 day' : `Overdue by ${daysOverdue} days`;
    } else if (daysUntilDue === 0) {
      return 'Due today';
    } else if (daysUntilDue === 1) {
      return 'Due tomorrow';
    } else {
      return `Due in ${daysUntilDue} days`;
    }
  }

  isOverdue(chore: ChoreDto): boolean {
    const daysUntilDue = this.getDaysUntilDue(chore);
    return daysUntilDue !== null && daysUntilDue < 0;
  }

}
