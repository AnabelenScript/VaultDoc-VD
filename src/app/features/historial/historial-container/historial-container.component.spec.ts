import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialContainerComponent } from './historial-container.component';

describe('HistorialContainerComponent', () => {
  let component: HistorialContainerComponent;
  let fixture: ComponentFixture<HistorialContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistorialContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
