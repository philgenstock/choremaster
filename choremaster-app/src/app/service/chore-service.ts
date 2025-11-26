import { inject, Injectable, signal } from '@angular/core';
import { ChoreControllerService, ChoreDto } from '../../client';
import { HouseholdService } from './household-service';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ChoreService {
  choreControllerService = inject(ChoreControllerService)
  householdService = inject(HouseholdService)

  chores = signal<ChoreDto[]>([])

  constructor() {
    toObservable(this.householdService.selectedHouseholdId).subscribe(householdId => {
      console.debug(householdId)
      if(!householdId) {
        this.chores.set([])
      } else {
        this.loadChores()
      }
    })
  }

  loadChores() {
    const householdId = this.householdService.selectedHouseholdId();
    if(!householdId) {
      return
    }
    this.choreControllerService.getChoresByHousehold(householdId)
      .subscribe(chores => this.chores.set(chores))
  }
}
