import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrFrageAnzeigeComponent } from './qr-frage-anzeige.component';

describe('QrFrageAnzeigeComponent', () => {
  let component: QrFrageAnzeigeComponent;
  let fixture: ComponentFixture<QrFrageAnzeigeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrFrageAnzeigeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrFrageAnzeigeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
