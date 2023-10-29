import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NegativeSnackbarService } from 'src/app/shared/snackbars/negative-snackbar/negative-snackbar.service';
import { PositiveSnackbarService } from 'src/app/shared/snackbars/positive-snackbar/positive-snackbar.service';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
	productForm: FormGroup;
	itemsAdded: number = 0;
	cost: number = 0;
	quantity: number = 0;
	totalCost: number = 0;
	cart: any[] = [];

	private api_products = "http://localhost:8080/products/add";

	protected products = [
		{ name: 'Product 1', price: 1000, formControlName: 'product1', quantity: 0 },
		{ name: 'Product 2', price: 2000, formControlName: 'product2', quantity: 0 },
		{ name: 'Product 3', price: 3000, formControlName: 'product3', quantity: 0 },
		{ name: 'Product 4', price: 4000, formControlName: 'product4', quantity: 0 },
		{ name: 'Product 5', price: 5000, formControlName: 'product5', quantity: 0 },
		{ name: 'Product 6', price: 6000, formControlName: 'product6', quantity: 0 },
		{ name: 'Product 7', price: 7000, formControlName: 'product7', quantity: 0 },
		{ name: 'Product 8', price: 8000, formControlName: 'product8', quantity: 0 },
		{ name: 'Product 9', price: 9000, formControlName: 'product9', quantity: 0 },
	];

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private http: HttpClient,
		private positiveSnackbarService: PositiveSnackbarService,
		private negativeSnackbarService: NegativeSnackbarService,
	) {
		this.productForm = this.fb.group({
			product1: [0],
			product2: [0],
			product3: [0],
			product4: [0],
			product5: [0],
			product6: [0],
			product7: [0],
			product8: [0],
			product9: [0],
		});
	}

	ngOnInit() {
	}

	// toggleProductSelection(product: any) {
	// 	product.selected = !product.selected; // Toggle the 'selected' property

	// if (product.selected) {
	// 	this.cart.push(product);
	// 	// console.log("Product added to cart.");
	// } else {
	// 	const index = this.cart.findIndex(item => item === product);
	// 	if (index !== -1) {
	// 		this.cart.splice(index, 1);
	// 		// console.log("Product removed from cart.");
	// 	}
	// }

	// 	console.log("Cart: ", this.cart);
	// 	this.itemsAdded = this.cart.length;
	// }

	updateQuantity(product: any, event: Event) {
		const quantity = (event.target as HTMLInputElement).value;
		this.quantity = parseInt(quantity);
		product.quantity = this.quantity;

		const price = product.price;
		this.cost = this.quantity * price;

		// Omit the "formControlName" property when sending the product to addToCart
		delete product.formControlName;

		this.addToCart(product);

		// console.log(this.quantity);
		// console.log(this.cost);
		console.log(this.cart);
		this.calculateTotalCost();
	}

	calculateTotalCost() {
		this.totalCost = this.products.reduce((total, product) => {
			return total + (product.price * product.quantity);
		}, 0);
	}

	addToCart(product: any) {
		if (product.quantity > 0) {
			const existingProduct = this.cart.find(item => item === product);

			if (existingProduct) {
				// Product is already in the cart, update its quantity
				existingProduct.quantity = product.quantity;
			} else {
				// Product is not in the cart, add it
				this.cart.push(product);
			}
		} else {
			const index = this.cart.findIndex(item => item === product);
			if (index !== -1) {
				// Product is in the cart but quantity is 0, remove it
				this.cart.splice(index, 1);
			}
		}
		console.log(this.cart);
	}

	// Function to handle form submission
	submitProductSelection() {

		// Send the POST request
		this.http.post(this.api_products, this.cart).subscribe({
			next: (response) => {
				this.positiveSnackbarService.openPositiveSnackbar("Creating order summary . . .").afterDismissed().subscribe(() => {
					this.router.navigate(['/summary']);
					console.log(response);
				});
			},
			error: (error) => {
				console.error("Error:", error);
				// this.negativeSnackbarService.openNegativeSnackbar("Failed to create order-summary");
				this.negativeSnackbarService.openNegativeSnackbar("Navigating to Order-Summary").afterDismissed().subscribe(() => {
					this.router.navigate(['/summary']);
				});
			}
		});
	}
}
