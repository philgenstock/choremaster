export * from './choreController.service';
import { ChoreControllerService } from './choreController.service';
export * from './householdController.service';
import { HouseholdControllerService } from './householdController.service';
export * from './userController.service';
import { UserControllerService } from './userController.service';
export const APIS = [ChoreControllerService, HouseholdControllerService, UserControllerService];
