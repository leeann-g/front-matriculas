import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformeRoturas } from './informe-roturas';

describe('InformeRoturas', () => {
  let component: InformeRoturas;
  let fixture: ComponentFixture<InformeRoturas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformeRoturas]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InformeRoturas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
