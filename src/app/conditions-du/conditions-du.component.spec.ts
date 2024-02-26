import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionsDuComponent } from './conditions-du.component';

describe('ConditionsDuComponent', () => {
  let component: ConditionsDuComponent;
  let fixture: ComponentFixture<ConditionsDuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConditionsDuComponent]
    });
    fixture = TestBed.createComponent(ConditionsDuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
