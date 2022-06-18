import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FruechteDesGeistesComponent } from './fruechte-des-geistes.component';

describe('FruechteDesGeistesComponent', () => {
  let component: FruechteDesGeistesComponent;
  let fixture: ComponentFixture<FruechteDesGeistesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FruechteDesGeistesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FruechteDesGeistesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
