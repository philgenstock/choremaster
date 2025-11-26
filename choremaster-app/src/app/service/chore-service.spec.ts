import { TestBed } from '@angular/core/testing';
import { ChoreService } from './chore-service';
import { defaultTestProviders } from '../../test-utils';


describe('ChoreService', () => {
  let service: ChoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ...defaultTestProviders
      ]
    });
    service = TestBed.inject(ChoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
