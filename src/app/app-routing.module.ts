import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { SummaryComponent } from './pages/summary/summary.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { ConfirmPaymentComponent } from './pages/confirm-payment/confirm-payment.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'summary', component: SummaryComponent },
  { path: 'invoice', component: InvoiceComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'confirm-payment', component: ConfirmPaymentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
