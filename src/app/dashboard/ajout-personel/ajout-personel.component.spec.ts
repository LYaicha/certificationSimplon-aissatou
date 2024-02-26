import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutPersonelComponent } from './ajout-personel.component';

describe('AjoutPersonelComponent', () => {
  let component: AjoutPersonelComponent;
  let fixture: ComponentFixture<AjoutPersonelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjoutPersonelComponent]
    });
    fixture = TestBed.createComponent(AjoutPersonelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
