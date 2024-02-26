import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevenirPSComponent } from './devenir-ps.component';

describe('DevenirPSComponent', () => {
  let component: DevenirPSComponent;
  let fixture: ComponentFixture<DevenirPSComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevenirPSComponent]
    });
    fixture = TestBed.createComponent(DevenirPSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
