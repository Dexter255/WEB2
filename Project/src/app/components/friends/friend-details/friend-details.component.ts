import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ServerService } from '../../server.service';

@Component({
  selector: 'app-friend-details',
  templateUrl: './friend-details.component.html',
  styleUrls: ['./friend-details.component.css']
})
export class FriendDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, 
    public serverService: ServerService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.serverService.getFriend(params['username']).subscribe(
        res => {},
        err => {}
      );
    });
  }

}
