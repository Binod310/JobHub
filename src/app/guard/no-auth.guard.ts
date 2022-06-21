import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    if (UserStorageService.hasToken() && UserStorageService.hasToken()) {
      this.router.navigateByUrl('/jobs/all-jobs');
      return false;
    }

    return true;
  }


}