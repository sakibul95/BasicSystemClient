import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authGuard.guard';
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { ItemsComponent } from "./items/items.component";
import { UsersComponent } from "./users/users.component";
import { PermissionComponent } from "./permission/permission.component";

const routes: Routes = [
  { path: 'login', component : LoginComponent},
  { path: 'home', component : HomeComponent, canActivate: [AuthGuard]},
  { path: 'items', component : ItemsComponent, canActivate: [AuthGuard]},
  { path: 'users', component : UsersComponent, canActivate: [AuthGuard]},
  { path: 'permission', component : PermissionComponent, canActivate: [AuthGuard]},
  { path:'',redirectTo:'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
