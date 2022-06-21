import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { NoAuthGuard } from './guard/no-auth.guard';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'about',component:AboutUsComponent},
  {path:'contact',component:ContactComponent},
  { path: 'login', component: LoginComponent  ,canActivate:[NoAuthGuard]},
  { path: 'register', component: SignupComponent,canActivate:[NoAuthGuard] },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
