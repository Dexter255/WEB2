import { Component } from '@angular/core';
import { ServerService } from './components/server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public serverService: ServerService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onLogout(){
    this.serverService.logout();
    this.router.navigate(['']);
  }
}
