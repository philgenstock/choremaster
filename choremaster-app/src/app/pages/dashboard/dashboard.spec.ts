import { ComponentFixture, TestBed } from '@angular/core/testing';
import Dashboard from './dashboard';
import { defaultTestProviders } from '../../../test-utils';


describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        ...defaultTestProviders
      ],
      imports: [Dashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
