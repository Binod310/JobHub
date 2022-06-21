import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { AllJobsComponent } from './components/all-jobs/all-jobs.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { DemoNgZorroAntdModule } from '../DemoNgZorroAntdModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchJobComponent } from './components/search-job/search-job.component';
import { SettingComponent } from './components/setting/setting.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


@NgModule({
  declarations: [
    UserComponent,
    AllJobsComponent,
    UserProfileComponent,
    SearchJobComponent,
    SettingComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    DemoNgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
