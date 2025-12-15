import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChoreControllerService, ChoreDto, ChoreExecutionControllerService, ChoreExecutionDto } from '../../../client';
import { MatCard, MatCardTitle } from "@angular/material/card";
import { MatFabButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chore-detail',
  imports: [MatCard, MatCardTitle, MatFabButton, MatIcon, DatePipe],
  standalone: true,
  templateUrl: './chore-detail.html',
  styleUrl: './chore-detail.scss',
})
export class ChoreDetail implements OnInit {
  route = inject(ActivatedRoute);
  choreExecutions = signal<ChoreExecutionDto[]>([])
  chore = signal<ChoreDto | null>(null)

  choreId: number | null = null

  choreExecutionControllerService = inject(ChoreExecutionControllerService)
  choreControllerService = inject(ChoreControllerService)

  ngOnInit(): void {
    const choreId = this.route.snapshot.paramMap.get('choreId');
    if(choreId) {
      this.choreId = Number(choreId)
      this.choreExecutionControllerService.getExecutionsByChore(this.choreId)
        .subscribe(executions => this.choreExecutions.set(executions))

      this.choreControllerService.getChoreById(this.choreId)
        .subscribe(chore => this.chore.set(chore))

    }
  }

  executeChore() {
    if(this.choreId) {
      this.choreExecutionControllerService.executeChore(this.choreId)
      .subscribe(choreExecution => this.choreExecutions.update(oldData => oldData.concat(choreExecution)))
    }
  }
}
