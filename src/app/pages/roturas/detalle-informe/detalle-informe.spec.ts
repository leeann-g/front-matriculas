import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleInforme } from './detalle-informe';

describe('DetalleInforme', () => {
  let component: DetalleInforme;
  let fixture: ComponentFixture<DetalleInforme>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleInforme]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DetalleInforme);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
