import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    returnUrl: string;
    isLoading = false;
    submitted = false;
    error: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private userService: UserService,
        private router: Router) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.loginForm.controls.username.valueChanges
            .subscribe(r => this.clearLoginError());
        this.loginForm.controls.password.valueChanges
            .subscribe(r => this.clearLoginError());

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
    }

    private clearLoginError() {
        this.error = '';
    }

    onSubmit() {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.isLoading = true;
        const controls = this.loginForm.controls;
        this.userService.login(controls.username.value, controls.password.value)
            .subscribe(
                data => {
                    // this.router.navigate([this.returnUrl]);
                    // this.userService.updateNotificationInfo();
                },
                error => {
                    // this.isLoading = false;
                    // this.error = 'Unable to login. Check your login and password';
                });
        this.userService.currentUserSubj.subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
                this.userService.updateNotificationInfo();
            },
            error => {
                this.isLoading = false;
                this.error = 'Unable to login. Check your login and password';
            });
    }
}
