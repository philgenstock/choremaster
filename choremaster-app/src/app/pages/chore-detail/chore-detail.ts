import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChoreControllerService, ChoreDto, ChoreExecutionControllerService, ChoreExecutionDto } from '../../../client';
import { T } from '@angular/cdk/keycodes';
import { MatCard } from "@angular/material/card";

@Component({
  selector: 'app-chore-detail',
  imports: [MatCard],
  standalone: true,
  templateUrl: './chore-detail.html',
  styleUrl: './chore-detail.scss',
})
export class ChoreDetail implements OnInit {
  route = inject(ActivatedRoute);
  choreExecutions = signal<ChoreExecutionDto[] | null>(null)

  choreExecutionControllerService = inject(ChoreExecutionControllerService)
  ngOnInit(): void {
    const choreId = this.route.snapshot.paramMap.get('choreId');
    if(choreId) {
      this.choreExecutionControllerService.getExecutionsByChore(Number(choreId))
        .subscribe(executions => this.choreExecutions.set(executions))
      
    }
  }
}
