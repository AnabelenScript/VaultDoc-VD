import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsContainerComponent } from './persons-container.component';

describe('PersonsContainerComponent', () => {
  let component: PersonsContainerComponent;
  let fixture: ComponentFixture<PersonsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonsContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
