import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from '../guard/user.guard';
import { AllJobsComponent } from './components/all-jobs/all-jobs.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SearchJobComponent } from './components/search-job/search-job.component';
import { SettingComponent } from './components/setting/setting.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  { path: '', component: UserComponent },
  { path: 'all-jobs', component: AllJobsComponent , canActivate:[UserGuard]},
  { path: 'user-profile', component: UserProfileComponent , canActivate:[UserGuard]},
  { path: 'search-job', component: SearchJobComponent , canActivate:[UserGuard]},
  { path: 'setting', component: SettingComponent , canActivate:[UserGuard]},
  { path: 'dashboard', component: DashboardComponent , canActivate:[UserGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
