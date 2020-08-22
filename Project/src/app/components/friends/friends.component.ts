import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { ServerService } from '../server.service';
import { Friend } from 'src/app/models/korisnik/friend.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  searchUser: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router,
    public serverService: ServerService) { }

  ngOnInit(): void {
    this.serverService.getUserProfile().subscribe();

    this.searchUser = new FormGroup({
      'username': new FormControl(null)
    });
  }

  // onSortChange(sortBy: string){
  //   if(sortBy === '0'){
  //     this.serverService.friends = this.serverService.friends.sort((a, b) => (a.Username > b.Username) ? 1 : -1);
  //   }
  //   else if(sortBy === '1'){
  //     this.serverService.friends = this.serverService.friends.sort((a, b) => (a.Username > b.Username) ? -1 : 1);
  //   }
  // }

  //#region Friend
  onSearch() {
    if (this.searchUser.get("username").value !== null) {
      this.serverService.searchUsers(this.searchUser.get("username").value).subscribe(
        (res: Friend[]) => {
          this.serverService.friends = res;
        },
        err => {
          console.log(err);
        }
      )
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
    this.serverService.sendFriendRequest(username).subscribe();
    this.resetForm();
  }

  onCancelFriendRequest(username: string) {
    this.serverService.cancelFriendRequest(username).subscribe();
    this.resetForm();
  }

  onAcceptFriendRequest(username: string) {
    this.serverService.acceptFriendRequest(username).subscribe();
    this.resetForm();
  }

  onDeclineFriendRequest(username: string) {
    this.serverService.declineFriendRequest(username).subscribe();
  }

  onDeleteFriend(username: string) {
    this.serverService.deleteFriend(username).subscribe();
    this.resetForm();
  }

  onDetailsFriend(username: string){
    this.router.navigate(['details', username], {relativeTo: this.route});
  }
  //#endregion
}
