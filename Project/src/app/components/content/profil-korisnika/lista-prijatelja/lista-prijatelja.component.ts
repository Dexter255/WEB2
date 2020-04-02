import { Component, OnInit } from '@angular/core';
import { prijatelj } from 'src/app/models/korisnik/prijatelj.model';


@Component({
  selector: 'app-lista-prijatelja',
  templateUrl: './lista-prijatelja.component.html',
  styleUrls: ['./lista-prijatelja.component.css']
})
export class ListaPrijateljaComponent implements OnInit {

  listaPrijatelja: prijatelj[];

  
  constructor() 
  { 
    this.listaPrijatelja = [];
    this.listaPrijatelja.push(new prijatelj("Mihajlo", "Rohalj"));
    this.listaPrijatelja.push(new prijatelj("Vukasin", "Radic"));
  }

  ngOnInit(): void {
  }

}
