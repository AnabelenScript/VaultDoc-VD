import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinPageComponent } from './bin-page.component';

describe('BinPageComponent', () => {
  let component: BinPageComponent;
  let fixture: ComponentFixture<BinPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BinPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BinPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
