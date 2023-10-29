import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PaymentSuccessfulComponent } from 'src/app/dialogs/payment-successful/payment-successful.component';

@Component({
	selector: 'app-payment',
	templateUrl: './payment.component.html',
	styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
	summaries!: any[]; // Define the 'summaries' property to hold the data
	totalCost!: number;
	paymentForm: FormGroup;
	paymentSuccess: boolean = false;

	private api_summary = "http://localhost:8080/products/last-order";

	constructor(
		private fb: FormBuilder,
		private http: HttpClient,
		private dialog: MatDialog
	) {
		this.paymentForm = this.fb.group({
			cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
			expiryDate: ['', [Validators.required]],
			cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
		});
	}

	ngOnInit() {
		// Make an HTTP request to fetch the summary data
		this.http.get(this.api_summary).subscribe((data: any) => {
			this.summaries = data; // Assign the data to the 'summaries' property
			this.calculateTotalCost();
		});
	}

	calculateTotalCost() {
		this.totalCost = this.summaries.reduce(
			(total, summary) => total + (summary.price * summary.quantity),
			0
		);
	}

	makePayment() {
		if (this.paymentForm.valid) {
			// Open the dialog
			const dialogRef = this.dialog.open(PaymentSuccessfulComponent, {
				disableClose: true, // Prevent the user from closing the dialog
				width: '400px'
			});

			// Automatically close the dialog after 5 seconds (no need to subscribe)
			setTimeout(() => {
				dialogRef.close();

				// Simulate a payment (you can add more complex logic here)
				this.paymentSuccess = true;
			}, 5000);
		}
	}
}
