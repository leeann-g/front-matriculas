import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioMatriculas } from './inicio-matriculas';

describe('InicioMatriculas', () => {
  let component: InicioMatriculas;
  let fixture: ComponentFixture<InicioMatriculas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioMatriculas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioMatriculas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
