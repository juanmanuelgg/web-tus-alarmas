import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAlarmaComponent } from './detalle-alarma.component';

describe('DetalleAlarmaComponent', () => {
  let component: DetalleAlarmaComponent;
  let fixture: ComponentFixture<DetalleAlarmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleAlarmaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleAlarmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
