import { Component, OnInit } from '@angular/core';
import { JobService } from '../../service/job-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  jobs: any
  isSpinning: boolean;
  data: any;

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.favouriteJobs();
  }

  favouriteJobs(){
    this.jobService.getFavouriteJobsID().subscribe((res)=>{
      console.log(res);
      this.data= res.data
    })
  }

}
