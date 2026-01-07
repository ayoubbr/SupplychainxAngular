import {Routes} from '@angular/router';
import {HomeComponent} from './features/home/home.component';
import {LoginComponent} from './features/auth/login/login.component';
import {DashboardComponent} from './features/procurement/dashboard/dashboard.component';
import {SuppliersComponent} from './features/procurement/suppliers/suppliers.component';
import {MaterialsComponent} from './features/procurement/materials/materials.component';
import {OrdersComponent} from './features/procurement/orders/orders.component';

export const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "procurement/dashboard", component: DashboardComponent},
  {path: "procurement/suppliers", component: SuppliersComponent},
  {path: "procurement/materials", component: MaterialsComponent},
  {path: "procurement/orders", component: OrdersComponent},
  {path: "login", component: LoginComponent},
  {path: "**", redirectTo: ""},
];
