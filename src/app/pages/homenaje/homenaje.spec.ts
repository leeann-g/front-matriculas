import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Homenaje } from './homenaje';

describe('Homenaje', () => {
  let component: Homenaje;
  let fixture: ComponentFixture<Homenaje>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Homenaje]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Homenaje);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
