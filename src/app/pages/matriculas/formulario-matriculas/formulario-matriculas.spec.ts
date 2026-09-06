import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioMatriculas } from './formulario-matriculas';

describe('FormularioMatriculas', () => {
  let component: FormularioMatriculas;
  let fixture: ComponentFixture<FormularioMatriculas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioMatriculas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioMatriculas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
