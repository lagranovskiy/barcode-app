import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpielfeldComponent } from './spielfeld.component';

describe('SpielfeldComponent', () => {
  let component: SpielfeldComponent;
  let fixture: ComponentFixture<SpielfeldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpielfeldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpielfeldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
