import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PositiveSnackbarComponent } from './shared/snackbars/positive-snackbar/positive-snackbar.component';
import { NegativeSnackbarComponent } from './shared/snackbars/negative-snackbar/negative-snackbar.component';
import { LoginComponent } from './auth/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './pages/products/products.component';
import { SummaryComponent } from './pages/summary/summary.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { ConfirmPaymentComponent } from './pages/confirm-payment/confirm-payment.component';
import { HeaderComponent } from './navigations/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PositiveSnackbarComponent,
    NegativeSnackbarComponent,
    ProductsComponent,
    SummaryComponent,
    InvoiceComponent,
    PaymentComponent,
    ConfirmPaymentComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
