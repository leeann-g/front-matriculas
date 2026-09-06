import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioRoturas } from './formulario-roturas';

describe('FormularioRoturas', () => {
  let component: FormularioRoturas;
  let fixture: ComponentFixture<FormularioRoturas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioRoturas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioRoturas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
