import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, MaybeAsync, GuardResult, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { map, take } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): MaybeAsync<GuardResult> {
        return this.authService.loginUser.pipe(
            take(1),
            map(user => {
                const isAuth = user?.token ? true : false;
                if (isAuth)
                    return true;

                return this.router.createUrlTree(['auth']);
            }));
    }
}