import { inject, Injectable, signal, Signal } from '@angular/core';
import { HouseholdControllerService, HouseholdDto } from '../../client';
import { Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class HouseholdService {

  households = signal<HouseholdDto[]>([])
  selectedHouseholdId = signal<number | null>(null);
  selectedHouseHoldIdObservable = toObservable(this.selectedHouseholdId)

  constructor() {
    const localStorageSelectedHouseHoldValue = localStorage.getItem(LOCAL_STORAGE_KEY)
    if(!!localStorageSelectedHouseHoldValue) {
      this.selectedHouseholdId.set(Number(localStorageSelectedHouseHoldValue))
    }
    this.selectedHouseHoldIdObservable.subscribe(selectedHouseholdId => localStorage.setItem(LOCAL_STORAGE_KEY, selectedHouseholdId +''))
  }

  private householdControllerService = inject(HouseholdControllerService)

  loadHouseholds() {
    this.householdControllerService.getAllHouseholdForCurrentUser()
      .subscribe(result => {console.debug(result)
        this.households.set(result)})
  }

  

  resetHouseholds() {
    this.households.set([])
  }

  createHousehold(name: string): Observable<HouseholdDto> {
    return this.householdControllerService.createHousehold({ name });
  }


}

const LOCAL_STORAGE_KEY = "SELECTED_HOUSEHOLD"