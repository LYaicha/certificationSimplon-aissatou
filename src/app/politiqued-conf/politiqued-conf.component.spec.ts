import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolitiquedConfComponent } from './politiqued-conf.component';

describe('PolitiquedConfComponent', () => {
  let component: PolitiquedConfComponent;
  let fixture: ComponentFixture<PolitiquedConfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PolitiquedConfComponent]
    });
    fixture = TestBed.createComponent(PolitiquedConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
