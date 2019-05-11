import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UserData } from './user-data';
import { Routes } from '../Routes';
@Injectable({
  providedIn: 'root'
})
export class Authentication implements CanLoad {
  constructor(private storage: Storage,
    private router: Router,
    private userData: UserData) {}

  canLoad() {

    return this.userData.hasAccess(Routes.Vendors).then(acces => {

      if(acces)
        return true;
      else {
        this.router.navigateByUrl(Routes.Login);
        return false;
      }
    });
    
  }
}
