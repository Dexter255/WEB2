import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPrijateljaComponent } from './lista-prijatelja.component';

describe('ListaPrijateljaComponent', () => {
  let component: ListaPrijateljaComponent;
  let fixture: ComponentFixture<ListaPrijateljaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPrijateljaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPrijateljaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
