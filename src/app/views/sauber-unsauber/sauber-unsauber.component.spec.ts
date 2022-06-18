import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SauberUnsauberComponent } from './sauber-unsauber.component';

describe('SauberUnsauberComponent', () => {
  let component: SauberUnsauberComponent;
  let fixture: ComponentFixture<SauberUnsauberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SauberUnsauberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SauberUnsauberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
