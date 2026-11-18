import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Desarrollador } from './desarrollador';

describe('Desarrollador', () => {
  let component: Desarrollador;
  let fixture: ComponentFixture<Desarrollador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Desarrollador]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Desarrollador);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
