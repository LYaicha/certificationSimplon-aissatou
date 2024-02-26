import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPatientesComponent } from './gestion-patientes.component';

describe('GestionPatientesComponent', () => {
  let component: GestionPatientesComponent;
  let fixture: ComponentFixture<GestionPatientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionPatientesComponent]
    });
    fixture = TestBed.createComponent(GestionPatientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
