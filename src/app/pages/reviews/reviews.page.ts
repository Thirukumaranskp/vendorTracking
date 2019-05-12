import { Component, OnInit } from '@angular/core';
import { ReviewsService } from '../../providers/reviews.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
})
export class ReviewsPage implements OnInit {

  product : any;
  vendor : any;
  reviews : any[];
  readonly defaultBack = "/app/tabs/schedule/products/";
  defaultRouting: string;
  constructor(private reviewsService : ReviewsService,
    private route: ActivatedRoute
    ) {

    this.ngOnInit = this.ngOnInit.bind(this);
  }

  ngOnInit() {
    let self = this;

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
