import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, take, exhaustMap } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req);
    return this.authService.loginUser.pipe(take(1), exhaustMap(user => {
      console.log(user);
      if (!user)
        return next.handle(req);

      const token = user != null ? user.token ? user.token : '' : '';
      const newReq = req.clone({headers: new HttpHeaders().set('Authorization', 'Bearer ' +token)});
      return next.handle(newReq);
    }))
  }

}