import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertContainerComponent } from './convert-container.component';

describe('ConvertContainerComponent', () => {
  let component: ConvertContainerComponent;
  let fixture: ComponentFixture<ConvertContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConvertContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvertContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
