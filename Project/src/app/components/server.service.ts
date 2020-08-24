import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from '../models/korisnik/user.model';
import { Friend } from '../models/korisnik/friend.model';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ServerService {
    private readonly BaseURI = 'https://localhost:44305/api';
    public friend: Friend;
    public friends: Friend[];
    public friendRequests: Friend[];
    public friendRequestsSent: Friend[];

    constructor(private http: HttpClient,
        private router: Router) {
        this.friends = [];
        this.friendRequests = [];
        this.friendRequestsSent = [];
    }

    login(body: any) {
        return this.http.post(this.BaseURI + '/ApplicationUser/Login', body);
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['']);
    }

    register(user: User) {
        return this.http.post(this.BaseURI + '/ApplicationUser/Register', user);
    }

    getUserProfile() {
        return this.http.get(this.BaseURI + '/ApplicationUser/GetUserProfile')
            .pipe(
                tap(
                    (res: User) => {
                        this.friends = res.Friends;
                        this.friendRequests = res.FriendRequests;
                        this.friendRequestsSent = res.FriendRequestsSent;
                    }
                )
            );
    }

    isUserLoggedIn() {
        return localStorage.getItem('token') !== null;
    }

    getUserType() {
        if(localStorage.getItem('token') !== null){
            let token = localStorage.getItem('token');
            
            let jwtData = token.split('.')[1];
            let decodedJwtJsonData = window.atob(jwtData);
            let decodedJwtData = JSON.parse(decodedJwtJsonData);
            
            return decodedJwtData.role;
        }

        return null;
    }

    getUserId() {
        let token = localStorage.getItem('token');

        let jwtData = token.split('.')[1];
        let decodedJwtJsonData = window.atob(jwtData);
        let decodedJwtData = JSON.parse(decodedJwtJsonData);

        return decodedJwtData.UserID;
    }

    updateUser(user: User) {
        return this.http.put(this.BaseURI + '/ApplicationUser/UpdateUser/' + user.Username, user);
    }

    searchUsers(username: string) {
        return this.http.get(this.BaseURI + '/ApplicationUser/SearchUsers/' + username);
    }

    sendFriendRequest(username: string) {
        return this.http.get(this.BaseURI + '/ApplicationUser/SendFriendRequest/' + this.getUserId() + '/' + username)
            .pipe(
                tap(
                    (res: User) => {
                        this.friends = res.Friends;
                        this.friendRequests = res.FriendRequests;
                        this.friendRequestsSent = res.FriendRequestsSent;
                    }
                )
            );
    }

    cancelFriendRequest(username: string) {
        return this.http.get(this.BaseURI + '/ApplicationUser/CancelFriendRequest/' + this.getUserId() + '/' + username)
            .pipe(
                tap(
                    (res: User) => {
                        this.friends = res.Friends;
                        this.friendRequests = res.FriendRequests;
                        this.friendRequestsSent = res.FriendRequestsSent;
                    }
                )
            );
    }

    acceptFriendRequest(username: string) {
        return this.http.get(this.BaseURI + '/ApplicationUser/AcceptFriendRequest/' + this.getUserId() + '/' + username)
            .pipe(
                tap(
                    (res: User) => {
                        this.friends = res.Friends;
                        this.friendRequests = res.FriendRequests;
                        this.friendRequestsSent = res.FriendRequestsSent;
                    }
                )
            );
    }

    declineFriendRequest(username) {
        return this.http.get(this.BaseURI + '/ApplicationUser/DeclineFriendRequest/' + this.getUserId() + '/' + username)
            .pipe(
                tap(
                    (res: User) => {
                        this.friends = res.Friends;
                        this.friendRequests = res.FriendRequests;
                        this.friendRequestsSent = res.FriendRequestsSent;
                    }
                )
            );
    }

    deleteFriend(username) {
        return this.http.get(this.BaseURI + '/ApplicationUser/DeleteFriend/' + this.getUserId() + '/' + username)
            .pipe(
                tap(
                    (res: User) => {
                        this.friends = res.Friends;
                        this.friendRequests = res.FriendRequests;
                        this.friendRequestsSent = res.FriendRequestsSent;
                    }
                )
            );
    }

    getFriend(username: string) {
        return this.http.get(this.BaseURI + '/ApplicationUser/GetFriend/' + username)
            .pipe(
                tap(
                    (res: Friend) => {
                        this.friend = res;
                    }
                )
            );
    }

    changePassword(body: any){
        return this.http.put(this.BaseURI + '/ApplicationUser/ChangePassword/' + this.getUserId(), body);
    }
}