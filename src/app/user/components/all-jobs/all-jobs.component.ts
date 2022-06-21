import { Component, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { JobService } from '../../service/job-service';

@Component({
  selector: 'app-all-jobs',
  templateUrl: './all-jobs.component.html',
  styleUrls: ['./all-jobs.component.scss']
})
export class AllJobsComponent implements OnInit {

  size: NzButtonSize = 'large';
  jobs: any;
  isSpinning = false;
  currentPage = 0;
  totalPages: any;

  constructor(private jobService: JobService,
              private notification: NzNotificationService,) { }
  ngOnInit(): void {
    this.onPageIndexChange(this.currentPage + 1)
  }

  onPageIndexChange(event: any) {
    console.log(event);
    this.isSpinning = true;
    this.jobService.fetchAllJobsByPageNumber(event).subscribe((res) => {
      console.log(res);
      this.currentPage = res.page;
      this.totalPages = res.page_count * 10;
      this.jobs = res.results;
      this.isSpinning = false;
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    })
  }

  addToFavourite(jobId: any) {
    const data = {
      userid: UserStorageService.getUserId(),
      jobId: jobId,
    }
    console.log(data);
    this.isSpinning = true;
    this.jobService.storeJobId(data).subscribe((res) => {
      console.log(res);
      this.isSpinning = false;
      if (res.status == "CREATED") {
        this.notification
          .success(
            'SUCCESS',
            `Added successfully!`,
            { nzDuration: 5000 }
          );

      } else {
        this.notification
          .error(
            'ERROR',
            `${res.message}`,
            { nzDuration: 5000 }
          )
      }
    }, error => {
      console.log("errorr", error);
      if (error.status == 406) {
        this.notification
          .error(
            'ERROR',
            `${error.error}`,
            { nzDuration: 5000 }
          )
      }
      this.isSpinning = false;
    })

  }


}
