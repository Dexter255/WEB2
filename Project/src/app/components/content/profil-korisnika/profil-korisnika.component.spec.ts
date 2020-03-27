import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilKorisnikaComponent } from './profil-korisnika.component';

describe('ProfilKorisnikaComponent', () => {
  let component: ProfilKorisnikaComponent;
  let fixture: ComponentFixture<ProfilKorisnikaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilKorisnikaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilKorisnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
