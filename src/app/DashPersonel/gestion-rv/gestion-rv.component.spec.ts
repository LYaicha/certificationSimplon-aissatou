import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionRVComponent } from './gestion-rv.component';

describe('GestionRVComponent', () => {
  let component: GestionRVComponent;
  let fixture: ComponentFixture<GestionRVComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionRVComponent]
    });
    fixture = TestBed.createComponent(GestionRVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
