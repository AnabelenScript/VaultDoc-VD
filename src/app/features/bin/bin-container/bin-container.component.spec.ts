import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinContainerComponent } from './bin-container.component';

describe('BinContainerComponent', () => {
  let component: BinContainerComponent;
  let fixture: ComponentFixture<BinContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BinContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BinContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
