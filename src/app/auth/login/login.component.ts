import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NegativeSnackbarService } from 'src/app/shared/snackbars/negative-snackbar/negative-snackbar.service';
import { PositiveSnackbarService } from 'src/app/shared/snackbars/positive-snackbar/positive-snackbar.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	loginForm!: FormGroup;

	private api_login = "http://localhost:8080/auth/login";

	constructor(
		private fb: FormBuilder,
		private _snackBar: MatSnackBar,
		private router: Router,
		private http: HttpClient,
		private positiveSnackbarService: PositiveSnackbarService,
		private negativeSnackbarService: NegativeSnackbarService,
	) {
		this.loginForm = this.fb.group({
			username: ['username@gmail.com', [Validators.required, Validators.email]],
			password: ['User1', Validators.required]
		})
	}

	ngOnInit() {
		// Check if user is already authenticated
		// if (this.auth.isAuthenticated()) {
		// 	// Navigate to dashboard
		// 	this.router.navigate(['/dashboard']);
		// } else {
		// 	this.router.navigate(['/login']);
		// }
	}

	// Convenience getter for easy access to form fields
	get f() { return this.loginForm.controls; }
	get username() { return this.loginForm.get('username'); }
	get password() { return this.loginForm.get('password'); }

	onSubmit() {
		if (this.loginForm.invalid) {
			return;
		}

		const formData = {
			username: this.loginForm.value.username,
			password: this.loginForm.value.password
		};

		// Set headers for JSON content type
		const headers = {
			'Content-Type': 'application/json'
		};

		// Send the POST request
		this.http.post(this.api_login, formData, { headers, responseType: 'text' }).subscribe({
			next: (response) => {
				this.positiveSnackbarService.openPositiveSnackbar("Logging In . . .").afterDismissed().subscribe(() => {
					this.router.navigate(['/products']);
					// console.log(response);
				});
			},
			error: (error) => {
				// console.error("Error:", error);
				this.negativeSnackbarService.openNegativeSnackbar("Wrong Credintials!");
			}
		});

		// console.log('Form submitted:', formData);
	}
}
