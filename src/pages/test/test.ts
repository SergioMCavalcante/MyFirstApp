import { ProdServiceProvider } from './../../providers/prod-service/prod-service';
import { Component, ModuleWithComponentFactories } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular'; 

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { dateDataSortValue } from '../../../node_modules/ionic-angular/umd/util/datetime-util';

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html'
})
export class TestPage {
  public result1: any;
  public result2: any;
  public urlapi: any;
  public a: number;
  public b: number;
  public beer: Array <{}>;
  public prod_id: any;

  prod: any;
 
  constructor(public nav: NavController, 
              public navParams: NavParams,
              public prodService: ProdServiceProvider, 
              public modalCtrl: ModalController) {
              this.prod_id = this.navParams.get('prod_id');  
              console.log("Prod: " + this.prod_id + this.navParams.get('prod_id'));
              this.mediaVendaDia();
  } 
  
  /*constructor(public navCtrl: NavController, 
              public navParams: NavParams,this.prod[0].
              public alertCtrl: AlertController,
              public http: Http)
              {

              let url = this.navParams.get('api_url');
              let beer_id = this.navParams.get('beer_id');  
               
              this.http.get(url + '/produtos/' + beer_id)
             .map(res => res.json())
             .subscribe(data => {
               this.beer = data;
               this.mediaVendaDia();
               console.log(url + '/produtos/' + beer_id)
               
              });
                                            
              };*/
             
             

  //ionViewDidLoad() {
  //  console.log('ionViewDidLoad TestPage');
  //}
 
  mediaVendaDia() {
    this.prodService.getProdId(this.prod_id).then((data) => {
    console.log("ProdMed: " + this.prod_id);
    console.log('Data: ' + data);
    this.prod = data;
    this.a = this.prod[0].vendas_mes;
    this.b = this.prod[0].qtde_dias;
    this.result1 = (this.a / this.b).toFixed(0);
    this.result2 = (this.prod[0].estoque / this.result1).toFixed(0);
    this.urlapi = ("https://cdn-cosmos.bluesoft.com.br/products/" + this.prod[0].ean);
    console.log('url: ' + this.urlapi);
    
   }
   )
  };
}
