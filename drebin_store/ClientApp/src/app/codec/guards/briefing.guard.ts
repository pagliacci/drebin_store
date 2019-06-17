import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { BriefingComponent } from '../briefing/briefing.component';

@Injectable({
    providedIn: 'root'
})
export class BriefingGuard implements CanActivate {
    constructor(
        private router: Router,
        private userService: UserService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (route.component !== BriefingComponent && this.userService.currentUser && this.userService.currentUser.briefingPassed) {
            return true;
        }
        this.router.navigate(['/briefing']);
        return false;
    }
}
