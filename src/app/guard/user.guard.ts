import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private router: Router,
    private notification: NzNotificationService,) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    if (!UserStorageService.hasToken()) {
      UserStorageService.signOut();
      this.router.navigateByUrl('/login');
      this.notification
        .error(
          'ERROR',
          `You Are Not LoggedIn. Please Login First!!!`,
          { nzDuration: 5000 }
        );
      return false;
    }
    return true;
  }

}