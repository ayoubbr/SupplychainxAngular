import {Routes} from '@angular/router';
import {HomeComponent} from './features/home/home.component';
import {LoginComponent} from './features/auth/login/login.component';

export const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "/procurement/dashboard", component: LoginComponent},
  {path: "/procurement/suppliers", component: LoginComponent},
  {path: "/procurement/materials", component: LoginComponent},
  {path: "/procurement/orders", component: LoginComponent},
  {path: "login", component: LoginComponent},
  {path: "**", redirectTo: ""},
];
