import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendrierPsComponent } from './calendrier-ps.component';

describe('CalendrierPsComponent', () => {
  let component: CalendrierPsComponent;
  let fixture: ComponentFixture<CalendrierPsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendrierPsComponent]
    });
    fixture = TestBed.createComponent(CalendrierPsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
