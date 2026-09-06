import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioRoturas } from './inicio-roturas';

describe('InicioRoturas', () => {
  let component: InicioRoturas;
  let fixture: ComponentFixture<InicioRoturas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioRoturas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioRoturas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
