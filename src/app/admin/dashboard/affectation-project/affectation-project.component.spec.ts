import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationProjectComponent } from './affectation-project.component';

describe('AffectationProjectComponent', () => {
  let component: AffectationProjectComponent;
  let fixture: ComponentFixture<AffectationProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectationProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffectationProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
