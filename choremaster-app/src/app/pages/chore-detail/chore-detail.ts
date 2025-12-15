import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChoreControllerService, ChoreDto, ChoreExecutionControllerService, ChoreExecutionDto } from '../../../client';
import { T } from '@angular/cdk/keycodes';
import { MatCard, MatCardTitle } from "@angular/material/card";
import { ChoreService } from '../../service/chore-service';

@Component({
  selector: 'app-chore-detail',
  imports: [MatCard, MatCardTitle],
  standalone: true,
  templateUrl: './chore-detail.html',
  styleUrl: './chore-detail.scss',
})
export class ChoreDetail implements OnInit {
  route = inject(ActivatedRoute);
  choreExecutions = signal<ChoreExecutionDto[] | null>(null)
  chore = signal<ChoreDto | null>(null)

  choreExecutionControllerService = inject(ChoreExecutionControllerService)
  choreService = inject(ChoreService)
  ngOnInit(): void {
    const choreId = this.route.snapshot.paramMap.get('choreId');
    if(choreId) {
      const choreIdNumber = Number(choreId)
      this.choreExecutionControllerService.getExecutionsByChore(choreIdNumber)
        .subscribe(executions => this.choreExecutions.set(executions))

      this.choreService.getChore(choreIdNumber)
        .subscribe(chore => this.chore.set(chore))
      
    }
  }
}
