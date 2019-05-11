import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, IonList, LoadingController, ModalController, ToastController } from '@ionic/angular';

import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'products',
  templateUrl: 'products.html',
  styleUrls: ['./products.scss'],
})
export class ProductsPage implements OnInit {
  // Gets a reference to the list element
  @ViewChild('productsList') productsList: IonList;

  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;
  products: any = [];

  constructor(
    public alertCtrl: AlertController,
    public confData: ConferenceData,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public toastCtrl: ToastController,
    public user: UserData,
    private route: ActivatedRoute
  ) { }


  ionViewWillEnter() {
    const vendorId = this.route.snapshot.paramMap.get('vendorId');
    this.refreshFilter(vendorId, '');
  }

  ngOnInit() {
    this.updateProducts();
  }

  refreshFilter(vendorId: string, queryText : string){
     this.confData.getFilteredProducts(vendorId,queryText).subscribe(products =>{
        this.products = products;
     });
  }
  updateProducts() {
    // Close any open sliding items when the schedule updates
    if (this.productsList) {
      this.productsList.closeSlidingItems();
    }
    const vendorId = this.route.snapshot.paramMap.get('vendorId');
    this.refreshFilter(vendorId, this.queryText);
  }

  // async presentFilter() {
  //   const modal = await this.modalCtrl.create({
  //     component: ScheduleFilterPage,
  //     componentProps: { excludedTracks: this.excludeTracks }
  //   });
  //   await modal.present();

  //   const { data } = await modal.onWillDismiss();
  //   if (data) {
  //     this.excludeTracks = data;
  //     this.updateSchedule();
  //   }
  // }

  async addFavorite(slidingItem: HTMLIonItemSlidingElement, sessionData: any) {
    if (this.user.hasFavorite(sessionData.name)) {
      // woops, they already favorited it! What shall we do!?
      // prompt them to remove it
      this.removeFavorite(slidingItem, sessionData, 'Favorite already added');
    } else {
      // remember this session as a user favorite
      this.user.addFavorite(sessionData.name);

      // create an alert instance
      const alert = await this.alertCtrl.create({
        header: 'Favorite Added',
        buttons: [{
          text: 'OK',
          handler: () => {
            // close the sliding item
            slidingItem.close();
          }
        }]
      });
      // now present the alert on top of all other content
      await alert.present();
    }

  }

  async removeFavorite(slidingItem: HTMLIonItemSlidingElement, sessionData: any, title: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: 'Would you like to remove this session from your favorites?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            // they clicked the cancel button, do not remove the session
            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        },
        {
          text: 'Remove',
          handler: () => {
            // they want to remove this session from their favorites
            this.user.removeFavorite(sessionData.name);
            this.updateProducts();

            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        }
      ]
    });
    // now present the alert on top of all other content
    await alert.present();
  }

}
