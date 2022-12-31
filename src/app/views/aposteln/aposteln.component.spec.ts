import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApostelnComponent } from './aposteln.component';

describe('FruechteDesGeistesComponent', () => {
  let component: ApostelnComponent;
  let fixture: ComponentFixture<ApostelnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApostelnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApostelnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
