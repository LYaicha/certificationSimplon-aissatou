import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonCycleComponent } from './mon-cycle.component';

describe('MonCycleComponent', () => {
  let component: MonCycleComponent;
  let fixture: ComponentFixture<MonCycleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonCycleComponent]
    });
    fixture = TestBed.createComponent(MonCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
