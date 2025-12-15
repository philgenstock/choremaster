import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { ChoreDetail } from './chore-detail';
import { defaultTestProviders } from '../../../test-utils';

describe('ChoreDetail', () => {
  let component: ChoreDetail;
  let fixture: ComponentFixture<ChoreDetail>;

  beforeEach(async () => {
     await TestBed.configureTestingModule({
          providers: [
            ...defaultTestProviders,
            {
              provide: ActivatedRoute,
              useValue: {
                snapshot: {
                  paramMap: {
                    get: () => null
                  }
                }
              }
            }
          ],
      imports: [ChoreDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoreDetail);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
