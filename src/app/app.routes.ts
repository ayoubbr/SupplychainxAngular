import {Routes} from '@angular/router';
import {HomeComponent} from './features/home/home.component';
import {LoginComponent} from './features/auth/login/login.component';
import {DashboardComponent} from './features/procurement/components/dashboard/dashboard.component';
import {SuppliersComponent} from './features/procurement/components/suppliers/suppliers.component';
import {MaterialsComponent} from './features/procurement/components/materials/materials.component';
import {SupplyOrdersComponent} from './features/procurement/components/supply-orders/supply-orders.component';

export const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "procurement/dashboard", component: DashboardComponent},
  {path: "procurement/suppliers", component: SuppliersComponent},
  {path: "procurement/materials", component: MaterialsComponent},
  {path: "procurement/orders", component: SupplyOrdersComponent},
  {path: "login", component: LoginComponent},
  {path: "**", redirectTo: ""},
];
