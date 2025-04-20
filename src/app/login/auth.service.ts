import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, catchError, Subject, tap, throwError } from "rxjs";
import { LoginMoldel } from "./login.moldel";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { GenResponseModel } from "../shared/gen-response.moldel";

export interface AuthResponseData {
  username: string;
  role: string;
  token: string;
  expiredInMinute: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  loginUser: BehaviorSubject<LoginMoldel | null> = new BehaviorSubject<LoginMoldel | null>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {
  }


  login(username: string, password: string) {
    return this.http.post<GenResponseModel<AuthResponseData>>(environment.baseUrl + 'api/auth/login',
      {
        username: username,
        password: password
      }).pipe(tap(res => {
        this.handleAuth(res.data);
      }));
  }

  logout() {
    this.loginUser.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer)
      clearTimeout(this.tokenExpirationTimer);

    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    console.log('expirationDuration', expirationDuration)
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration)
  }

  private handleAuth(res: AuthResponseData) {
    const expired = (res.expiredInMinute) * 60 * 1000;
    const expiredDate = new Date(new Date().getTime() + expired);
    const user = new LoginMoldel(res.username, res.token, expiredDate);
    this.loginUser.next(user);
    this.autoLogout(expired);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
