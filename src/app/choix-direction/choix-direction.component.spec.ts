import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoixDirectionComponent } from './choix-direction.component';

describe('ChoixDirectionComponent', () => {
  let component: ChoixDirectionComponent;
  let fixture: ComponentFixture<ChoixDirectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChoixDirectionComponent]
    });
    fixture = TestBed.createComponent(ChoixDirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
