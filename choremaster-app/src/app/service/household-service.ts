import { inject, Injectable, signal, Signal } from '@angular/core';
import { HouseholdControllerService, HouseholdDto } from '../../client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HouseholdService {

  households = signal<HouseholdDto[]>([])

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
