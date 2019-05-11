import { Component, OnInit } from '@angular/core';
import { ReviewsService } from '../../providers/reviews.service';

@Component({
  selector: 'reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
})
export class ReviewsPage implements OnInit {

  product : any;
  vendor : any;
  reviews : any[];

  constructor(private reviewsService : ReviewsService) {

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
}
