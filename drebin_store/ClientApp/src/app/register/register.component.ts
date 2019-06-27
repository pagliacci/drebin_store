import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    shouldShowValidation = false;
    error: string;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService
    ) {}

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            username: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            vkId: ['']
        });

        this.registerForm.valueChanges.subscribe(() => this.shouldShowValidation = false);
    }

    onSubmit() {
        this.shouldShowValidation = true;

        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .subscribe(
                data => {
                    this.router.navigate(['/login']);
                },
                error => {
                    this.loading = false;
                    this.error = 'This login is already taken';
                }
            );
    }
}
