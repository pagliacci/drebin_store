import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

// TODO: make this thing redirect user to login if not authorized
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // const currentUser = this.userService.getCurrentUser();
        // if (currentUser && currentUser.token) {
            // request = request.clone({
                // setHeaders: {
                    // Authorization: `Bearer ${currentUser.token}`
                // }
            // });
        // }

        return next.handle(request);
    }
}
