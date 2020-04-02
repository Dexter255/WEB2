import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrijateljComponent } from './prijatelj.component';

describe('PrijateljComponent', () => {
  let component: PrijateljComponent;
  let fixture: ComponentFixture<PrijateljComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrijateljComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrijateljComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
