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
      email: ['morish.b@gmail.com', [Validators.required, Validators.email]],
      password: ['m1', Validators.required]
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
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const formData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    // Set headers for JSON content type
    const headers = {
      'Content-Type': 'application/json'
    };

    // Send the POST request
    this.http.post<any>(this.api_login, formData, { headers }).subscribe({
      next: (response) => {
        this.positiveSnackbarService.openPositiveSnackbar("Logging In . . .").afterDismissed().subscribe(() => {
          this.router.navigate(['/manager/dashboard']);
        });
      },
      error: (error) => {
        this.negativeSnackbarService.openNegativeSnackbar("Wrong Credintials!");
      }
    });

    console.log('Form submitted:', formData);
  }
}
