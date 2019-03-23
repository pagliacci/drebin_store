import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UsersManagerComponent } from '../users-manager/users-manager.component';
import { ProductsManagerComponent } from '../products-manager/products-manager.component';
import { OrdersManagerComponent } from '../orders-manager/orders-manager.component';
import { GroupsManagerComponent } from '../groups-manager/groups-manager.component';
import { User } from 'src/app/models/user';

@Injectable({
    providedIn: 'root'
})
export class AdministrationAccessGuard implements CanActivate, CanActivateChild {
    userManagerComponents = [
        UsersManagerComponent,
        GroupsManagerComponent
    ];

    constructor(
        private router: Router,
        private userService: UserService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const user = this.userService.currentUser;
        if (user.canManageOrders || user.canManageProducts || user.canManageUsers) {
            return true;
        }
        return false;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const user = this.userService.currentUser;
        if (this.userManagerComponents.some(c => this.checkComponentOrParent(childRoute, c))) {
            if (!user.canManageUsers) {
                this.router.navigate(['/administration/products']);
            }
            return user.canManageUsers;
        }
        if (this.checkComponentOrParent(childRoute, ProductsManagerComponent)) {
            if (!user.canManageProducts) {
                this.router.navigate(['/administration/orders']);
            }
            return user.canManageProducts;
        }
        if (this.checkComponentOrParent(childRoute, OrdersManagerComponent)) {
            if (!user.canManageOrders) {
                this.router.navigate(['/administration/users']);
            }
            return user.canManageOrders;
        }
        return false;
    }

    private checkComponentOrParent(childRoute: ActivatedRouteSnapshot, component: Object) {
        return childRoute.component === component || childRoute.parent.component === component;
    }
}
