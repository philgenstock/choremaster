import { ComponentFixture, TestBed } from '@angular/core/testing';
import HouseholdDetail from './household-detail';
import { defaultTestProviders } from '../../../test-utils';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ChoreDto } from '../../../client';

describe('HouseholdDetail', () => {
  let component: HouseholdDetail;
  let fixture: ComponentFixture<HouseholdDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        ...defaultTestProviders,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => key === 'householdId' ? '1' : null
              }
            }
          }
        }
      ],
      imports: [HouseholdDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseholdDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load household id from route params', () => {
    expect(component.householdId).toBe(1);
  });

  describe('getIntervalText', () => {
    it('should return empty string for undefined interval', () => {
      expect(component.getIntervalText(undefined)).toBe('');
    });

    it('should return "Daily" for 1 day interval', () => {
      expect(component.getIntervalText(1)).toBe('Daily');
    });

    it('should return "Every 3 days" for 3 day interval', () => {
      expect(component.getIntervalText(3)).toBe('Every 3 days');
    });

    it('should return "Weekly" for 7 day interval', () => {
      expect(component.getIntervalText(7)).toBe('Weekly');
    });

    it('should return "Every 2 weeks" for 14 day interval', () => {
      expect(component.getIntervalText(14)).toBe('Every 2 weeks');
    });

    it('should return "Monthly" for 30 day interval', () => {
      expect(component.getIntervalText(30)).toBe('Monthly');
    });

    it('should return "Every X days" for custom interval', () => {
      expect(component.getIntervalText(5)).toBe('Every 5 days');
    });
  });

  describe('getExecutionStatusText', () => {
    it('should return "Never executed" when lastExecution is null', () => {
      const chore: ChoreDto = { id: 1, name: 'Test', intervalDays: 7 };
      expect(component.getExecutionStatusText(chore)).toBe('Never executed');
    });

    it('should return "Never executed" when executedAt is null', () => {
      const chore: ChoreDto = { id: 1, name: 'Test', intervalDays: 7, lastExecution: {} };
      expect(component.getExecutionStatusText(chore)).toBe('Never executed');
    });

    it('should return "Executed today" for today execution', () => {
      const today = new Date().toISOString();
      const chore: ChoreDto = { id: 1, name: 'Test', intervalDays: 7, lastExecution: { executedAt: today } };
      expect(component.getExecutionStatusText(chore)).toBe('Executed today');
    });

    it('should return "Executed yesterday" for yesterday execution', () => {
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      const chore: ChoreDto = { id: 1, name: 'Test', intervalDays: 7, lastExecution: { executedAt: yesterday } };
      expect(component.getExecutionStatusText(chore)).toBe('Executed yesterday');
    });

    it('should return "Executed X days ago" for older executions', () => {
      const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();
      const chore: ChoreDto = { id: 1, name: 'Test', intervalDays: 7, lastExecution: { executedAt: threeDaysAgo } };
      expect(component.getExecutionStatusText(chore)).toBe('Executed 3 days ago');
    });
  });

  describe('getDaysUntilDue', () => {
    it('should return null when lastExecution is null', () => {
      const chore: ChoreDto = { id: 1, name: 'Test', intervalDays: 7 };
      expect(component.getDaysUntilDue(chore)).toBeNull();
    });

    it('should return null when executedAt is null', () => {
      const chore: ChoreDto = { id: 1, name: 'Test', intervalDays: 7, lastExecution: {} };
      expect(component.getDaysUntilDue(chore)).toBeNull();
    });

    it('should return null when intervalDays is null', () => {
      const today = new Date().toISOString();
      const chore: ChoreDto = { id: 1, name: 'Test', lastExecution: { executedAt: today } };
      expect(component.getDaysUntilDue(chore)).toBeNull();
    });

    it('should return positive days when not yet due', () => {
      const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();
      const chore: ChoreDto = { id: 1, name: 'Test', intervalDays: 7, lastExecution: { executedAt: threeDaysAgo } };
      expect(component.getDaysUntilDue(chore)).toBe(4);
    });

    it('should return negative days when overdue', () => {
      const tenDaysAgo = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString();
      const chore: ChoreDto = { id: 1, name: 'Test', intervalDays: 7, lastExecution: { executedAt: tenDaysAgo } };
      expect(component.getDaysUntilDue(chore)).toBeLessThan(0);
    });
  });

  describe('getDueStatusText', () => {
    it('should return "No due date" when getDaysUntilDue returns null', () => {
      const chore: ChoreDto = { id: 1, name: 'Test', intervalDays: 7 };
      expect(component.getDueStatusText(chore)).toBe('No due date');
    });

    it('should return "Due today" when due today', () => {
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const chore: ChoreDto = { id: 1, name: 'Test', intervalDays: 7, lastExecution: { executedAt: sevenDaysAgo } };
      expect(component.getDueStatusText(chore)).toBe('Due today');
    });

    it('should return "Due tomorrow" when due tomorrow', () => {
      const sixDaysAgo = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString();
      const chore: ChoreDto = { id: 1, name: 'Test', intervalDays: 7, lastExecution: { executedAt: sixDaysAgo } };
      expect(component.getDueStatusText(chore)).toBe('Due tomorrow');
    });

    it('should return "Due in X days" when due in the future', () => {
      const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();
      const chore: ChoreDto = { id: 1, name: 'Test', intervalDays: 7, lastExecution: { executedAt: threeDaysAgo } };
      expect(component.getDueStatusText(chore)).toBe('Due in 4 days');
    });

    it('should return "Overdue by 1 day" when overdue by 1 day', () => {
      const eightDaysAgo = new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString();
      const chore: ChoreDto = { id: 1, name: 'Test', intervalDays: 7, lastExecution: { executedAt: eightDaysAgo } };
      expect(component.getDueStatusText(chore)).toBe('Overdue by 1 day');
    });

    it('should return "Overdue by X days" when overdue by multiple days', () => {
      const tenDaysAgo = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString();
      const chore: ChoreDto = { id: 1, name: 'Test', intervalDays: 7, lastExecution: { executedAt: tenDaysAgo } };
      expect(component.getDueStatusText(chore)).toBe('Overdue by 3 days');
    });
  });

  describe('isOverdue', () => {
    it('should return false when getDaysUntilDue returns null', () => {
      const chore: ChoreDto = { id: 1, name: 'Test', intervalDays: 7 };
      expect(component.isOverdue(chore)).toBe(false);
    });

    it('should return false when not yet due', () => {
      const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();
      const chore: ChoreDto = { id: 1, name: 'Test', intervalDays: 7, lastExecution: { executedAt: threeDaysAgo } };
      expect(component.isOverdue(chore)).toBe(false);
    });

    it('should return false when due today', () => {
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const chore: ChoreDto = { id: 1, name: 'Test', intervalDays: 7, lastExecution: { executedAt: sevenDaysAgo } };
      expect(component.isOverdue(chore)).toBe(false);
    });

    it('should return true when overdue', () => {
      const tenDaysAgo = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString();
      const chore: ChoreDto = { id: 1, name: 'Test', intervalDays: 7, lastExecution: { executedAt: tenDaysAgo } };
      expect(component.isOverdue(chore)).toBe(true);
    });
  });
});
