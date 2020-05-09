import { Component, OnInit } from '@angular/core';
import { prijatelj } from 'src/app/models/korisnik/prijatelj.model';

@Component({
  selector: 'app-profil-korisnika',
  templateUrl: './profil-korisnika.component.html',
  styleUrls: ['./profil-korisnika.component.css']
})
export class ProfilKorisnikaComponent implements OnInit {
  prijatelji: prijatelj[];

  constructor() { }

  ngOnInit(): void {
    this.prijatelji = [];
    this.prijatelji.push(new prijatelj("Mihajlo", "Rohalj"));
    this.prijatelji.push(new prijatelj("Vukasin", "Radic"));
  }

}
