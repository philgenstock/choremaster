import { Component, inject } from '@angular/core';
import { ChoreService } from '../../service/chore-service';
import { MatCard, MatCardTitle, MatCardActions } from '@angular/material/card';
import { MatAnchor } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { ChoreControllerService, ChoreDto } from '../../../client';

@Component({
  selector: 'app-dashboard',
  imports: [MatCard, MatCardTitle, MatCardActions, MatAnchor, MatIcon],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  standalone: true
})
export default class Dashboard {

  choreService = inject(ChoreService)
  choreControllerService = inject(ChoreControllerService)

  deleteChore(chore: ChoreDto) {
    this.choreControllerService.deleteChore(chore.id!!).subscribe(() => this.choreService.loadChores())

  }

}
