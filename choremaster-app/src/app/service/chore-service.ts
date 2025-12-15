import { inject, Injectable, signal } from '@angular/core';
import { ChoreControllerService, ChoreDto } from '../../client';
import { HouseholdService } from './household-service';
import { toObservable } from '@angular/core/rxjs-interop';
import { first, map, mergeMap, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChoreService {
  choreControllerService = inject(ChoreControllerService)
  householdService = inject(HouseholdService)

  chores = signal<ChoreDto[]>([])
  choresObservable = toObservable(this.chores)

  constructor() {
    toObservable(this.householdService.selectedHouseholdId).subscribe(householdId => {
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

  getChore(choreId: Number): Observable<ChoreDto | null> {
    if(this.chores().length != 0) {
      return of(this.chores().find(chore => chore.id == chore))
      .pipe(map(data => data? data: null))
    }

    return this.choresObservable
    .pipe(
      map(_ => this.chores().find(chore => chore.id == choreId) ),
      map(data => data? data: null),
      first(value => value !== null)
    )
  }
}
