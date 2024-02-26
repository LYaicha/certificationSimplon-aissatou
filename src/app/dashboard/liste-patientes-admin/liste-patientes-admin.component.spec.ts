import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePatientesAdminComponent } from './liste-patientes-admin.component';

describe('ListePatientesAdminComponent', () => {
  let component: ListePatientesAdminComponent;
  let fixture: ComponentFixture<ListePatientesAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListePatientesAdminComponent]
    });
    fixture = TestBed.createComponent(ListePatientesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
