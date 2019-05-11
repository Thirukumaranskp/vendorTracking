import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  IonList,
  LoadingController,
  ModalController,
  ToastController
} from '@ionic/angular';

import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';
import { Routes } from '../../Routes';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
  styleUrls: ['./schedule.scss']
})
export class SchedulePage implements OnInit {
  // Gets a reference to the list element
  @ViewChild('vendorList') vendorList: IonList;

  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownVendors = true;
  groups: any = [];
  confDate: string;
  vendors: any = [];

  constructor(
    public alertCtrl: AlertController,
    public confData: ConferenceData,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public toastCtrl: ToastController,
    public user: UserData
  ) {}

  ngOnInit() {
    // check access.
    this.user.hasAccess(Routes.Vendors).then(acces => {
      if (acces) {
        this.updateVendors();
      } else {
        this.router.navigateByUrl(Routes.Login);
      }
    });
  }

  updateVendors() {
    if (this.vendorList) {
      this.vendorList.closeSlidingItems();
    }

    if (this.queryText) {
      this.confData.getFilteredVendors(this.queryText).subscribe((vendors: any[]) => {
        this.vendors = vendors;
        this.shownVendors = this.vendors.length === 0;
      });
    } else {
      this.confData.getVendors().subscribe((vendors: any[]) => {
        this.vendors = vendors;
        this.shownVendors = this.vendors.length > 0;

      });
    }

  }
}
