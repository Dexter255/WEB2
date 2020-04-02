import { Component, OnInit, Input } from '@angular/core';
import { prijatelj } from 'src/app/models/korisnik/prijatelj.model';

@Component({
  selector: 'app-prijatelj',
  templateUrl: './prijatelj.component.html',
  styleUrls: ['./prijatelj.component.css']
})
export class PrijateljComponent implements OnInit {

  @Input() prijatelj: prijatelj;
  constructor() { }

  ngOnInit(): void {
  }

}
