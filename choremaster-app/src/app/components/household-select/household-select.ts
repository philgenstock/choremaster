import { Component, inject } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { HouseholdService } from '../../service/household-service';

@Component({
  selector: 'app-household-select',
  imports: [MatSelectModule],
  templateUrl: './household-select.html',
  styleUrl: './household-select.scss',
})
export class HouseholdSelect {

  householdService = inject(HouseholdService)
}
