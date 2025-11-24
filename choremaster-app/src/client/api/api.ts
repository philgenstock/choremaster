export * from './householdController.service';
import { HouseholdControllerService } from './householdController.service';
export * from './userController.service';
import { UserControllerService } from './userController.service';
export const APIS = [HouseholdControllerService, UserControllerService];
