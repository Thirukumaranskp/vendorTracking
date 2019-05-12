import { Component, OnInit } from '@angular/core';
import { ReviewsService } from '../../providers/reviews.service';
import { ActivatedRoute } from '@angular/router';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
})
export class ReviewsPage implements OnInit {

  product : any;
  vendor : any;
  reviews : any[];
  defaultRouting: string;
  addReview = false;
  username : string = "";
  readonly defaultBack = "/app/tabs/schedule/products/";

  constructor(
    private reviewsService : ReviewsService,
    private route: ActivatedRoute,
    private userData: UserData
    ) {

    this.ngOnInit = this.ngOnInit.bind(this);
  }

  getUsername() {
    this.userData.getUsername().then((username) => {
      this.username = username;
    });
  }

  enableEdit() {
    this.addReview = true;
  }

  disableEdit() {
    this.addReview = false;
  }

  ngOnInit() {
    let self = this;

    this.getUsername();

    this.reviewsService
    .getReviews("vscode")
    .subscribe(data => { 
        self.product = data; 
        self.vendor = data.Vendor; 
        self.reviews = data.Reviews;
        console.log(self.product);});
  }

  ionViewWillEnter() {
    console.log("View Enter");
    const vendorId = this.route.snapshot.paramMap.get('id');
    this.defaultRouting = `${this.defaultBack}${vendorId}`;
    console.log("Default Routing" , this.defaultRouting);

  }

}
