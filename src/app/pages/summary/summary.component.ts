import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-summary',
	templateUrl: './summary.component.html',
	styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
	summaries!: any[]; // Define the 'summaries' property to hold the data
	totalCost!: number;

	private api_summary = "http://localhost:8080/products/last-order";

	constructor(private http: HttpClient) { }

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
}
