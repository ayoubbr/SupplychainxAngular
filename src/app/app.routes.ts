import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/procurement/components/dashboard/dashboard.component';
import { DashboardComponent as DC } from './features/production/components/dashboard/dashboard.component';
import { SuppliersComponent } from './features/procurement/components/suppliers/suppliers.component';
import { MaterialsComponent } from './features/procurement/components/materials/materials.component';
import { SupplyOrdersComponent } from './features/procurement/components/supply-orders/supply-orders.component';
import { ProductsComponent } from './features/production/components/products/products.component';
import { BillOfMaterialComponent } from './features/production/components/bill-of-material/bill-of-material.component';

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "procurement/dashboard", component: DashboardComponent },
  { path: "procurement/suppliers", component: SuppliersComponent },
  { path: "procurement/materials", component: MaterialsComponent },
  { path: "procurement/orders", component: SupplyOrdersComponent },
  { path: "production/dashboard", component: DC },
  { path: "production/products", component: ProductsComponent },
  { path: "production/bill-of-materials", component: BillOfMaterialComponent },
  // { path: "production/production-orders", component: BillOfMaterialComponent },
  { path: "login", component: LoginComponent },
  { path: "**", redirectTo: "" },
];
