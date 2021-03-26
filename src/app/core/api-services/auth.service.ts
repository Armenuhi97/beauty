import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginRequest, ILoginResponse, IUser } from '@models/index';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _userInfoState$: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null);
    public currentUser: IUser;

    constructor(private _httpClient: HttpClient) { }

    public login(credentials: ILoginRequest): Observable<ILoginResponse> {
        return this._httpClient.post<ILoginResponse>('userdetails/login-user/', credentials)
            .pipe(
                map((res) => {
                    this.currentUser = res.user;
                    this._userInfoState$.next(res.user);
                    return res;
                }),
                catchError((err) => {
                    return throwError(err);
                })
            );
    }

    public isUserLoggedIn(): Observable<boolean> | boolean {
        return true;
        // return this.getMe()
        //     .pipe(
        //         switchMap(() => {
        //             if (this.currentUser) {
        //                 return of(true);
        //             } else {
        //                 return of(false);
        //             }
        //         })
        //     );
    }

    get getUserState(): Observable<IUser> {
        return this._userInfoState$.asObservable().pipe(filter((user) => user !== null));
    }
}
