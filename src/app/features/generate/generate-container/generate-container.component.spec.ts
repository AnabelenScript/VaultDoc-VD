import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateContainerComponent } from './generate-container.component';

describe('GenerateContainerComponent', () => {
  let component: GenerateContainerComponent;
  let fixture: ComponentFixture<GenerateContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerateContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
