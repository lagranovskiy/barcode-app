import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpielerdatenComponent } from './spielerdaten.component';

describe('SpielerdatenComponent', () => {
  let component: SpielerdatenComponent;
  let fixture: ComponentFixture<SpielerdatenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpielerdatenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpielerdatenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
