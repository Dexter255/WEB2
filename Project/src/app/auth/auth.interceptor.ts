import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor{

    constructor(private router: Router) {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        if(localStorage.getItem('token') !== null){
            const clonedRequest = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
            });

            return next.handle(clonedRequest)
                .pipe(
                    tap(
                        succ => {},
                        err => {
                            if(err.status === 400){
                                
                            }
                            else if(err.status === 401){
                                localStorage.removeItem('token');
                                this.router.navigate(['']);
                            }
                            else if(err.status === 403){
                                this.router.navigateByUrl('forbidden', {skipLocationChange: true});
                            }
                            else if(err.status === 404){
                                this.router.navigateByUrl('error', {skipLocationChange: true});
                            }
                        }
                    )
                )
        }
        else{
            return next.handle(req.clone());
        }
    }
}