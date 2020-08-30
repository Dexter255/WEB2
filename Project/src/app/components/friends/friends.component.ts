import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ServerService } from '../server.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  searchUser: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    public serverService: ServerService) { }

  ngOnInit(): void {
    this.serverService.getUserProfile().subscribe();

    this.searchUser = new FormGroup({
      'username': new FormControl(null)
    });
  }

  onSearch() {
    if (this.searchUser.get("username").value !== null) {
      this.serverService.searchUsers(this.searchUser.get("username").value).subscribe();
    }
  }

  onReset() {
    this.resetForm();
    this.serverService.getUserProfile().subscribe();
  }

  resetForm() {
    this.searchUser.setValue({
      'username': null
    });
  }

  onSendFriendRequest(username: string) {
    this.serverService.sendFriendRequest(username).subscribe(
      res => {
        this.toastr.success('Request was successfuly sent.', 'Friend');
      }
    );
    this.resetForm();
  }

  onCancelFriendRequest(username: string) {
    this.serverService.cancelFriendRequest(username).subscribe(
      res => {
        this.toastr.info('Request was successfuly canceled.', 'Friend');
      }
    );
    this.resetForm();
  }

  onAcceptFriendRequest(username: string) {
    this.serverService.acceptFriendRequest(username).subscribe(
      res => {
        this.toastr.success('Request was successfuly accepted.', 'Friend');
      }
    );
    this.resetForm();
  }

  onDeclineFriendRequest(username: string) {
    this.serverService.declineFriendRequest(username).subscribe(
      res => {
        this.toastr.success('Request was successfuly declined.', 'Friend');
      }
    );
  }

  onDeleteFriend(username: string) {
    this.serverService.deleteFriend(username).subscribe(
      res => {
        this.toastr.success('Friend was successfuly deleted.', 'Friend');
      }
    );
    this.resetForm();
  }

  onDetailsFriend(username: string){
    this.router.navigate(['details', username], {relativeTo: this.route});
  }
}
