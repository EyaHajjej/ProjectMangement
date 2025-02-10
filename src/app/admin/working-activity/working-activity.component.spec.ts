import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingActivityComponent } from './working-activity.component';

describe('WorkingActivityComponent', () => {
  let component: WorkingActivityComponent;
  let fixture: ComponentFixture<WorkingActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkingActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkingActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
