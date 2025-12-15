import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCard, MatCardTitle, MatCardActions } from '@angular/material/card';
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { ChoreControllerService, ChoreDto } from '../../../client';
import { MatDialog } from '@angular/material/dialog';
import { CreateChoreDialog } from '../../components/create-chore-dialog/create-chore-dialog';

@Component({
  selector: 'app-household-detail',
  imports: [MatCard, MatCardTitle, MatCardActions, MatButton, MatIcon],
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
    const dialogRef = this.dialog.open(CreateChoreDialog, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(choreName => {
      if (choreName) {
        this.addChore(choreName);
      }
    });
  }

  private addChore(choreName: string) {
    if (!this.householdId) {
      return;
    }

    this.choreControllerService.createChore({ name: choreName, householdId: this.householdId })
      .subscribe(() => this.loadChores());
  }

}
