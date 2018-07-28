import { ListPage } from './../list/list';
import { ProdServiceProvider } from './../../providers/prod-service/prod-service';
import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { TestPage } from '../test/test';
import 'rxjs/add/operator/map';

// teste de GITHUB //

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  prod: any;
 
  constructor(public nav: NavController, 
              public prodService: ProdServiceProvider, 
              public modalCtrl: ModalController) {
 
  } 

  ionViewDidLoad(){
 
    this.prodService.getReviews().then((data) => {
      console.log(data);
      this.prod = data;
    });
 
  }
 
  addReview(){
 
    let modal = this.modalCtrl.create(ListPage);
 
    modal.onDidDismiss(review => {
      if(review){
        this.prod.push(review);
        this.prodService.createReview(review);       
      }
    });
 
    modal.present();
 
  }

  getProdId(review){
    console.log('ID: ' + review.id)
    this.nav.push(TestPage, {
      'prod_id': review.id
    });
    
  }
 
  deleteReview(review){
 
    //Remove locally
      let index = this.prod.indexOf(review);
 
      if(index > -1){
        this.prod.splice(index, 1);
      }  
 
    //Remove from database
    this.prodService.deleteReview(review.id);
  }

}
