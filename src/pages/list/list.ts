import { Http, Headers, RequestOptions } from '@angular/http';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  name: any;
  fornecedor: any;
  ean: any;
  price: any;
  estoque: any;
  vendas_mes: any;
  qtde_dias: any;
  rating: any;
  data_cad: any;
  img: any;

  /*selectedItem: any;
  icons: string[];
  private url:string = 'http://localhost:3000/produtos';
  public beer = {
    name: "" 
    //price: "",
    //mark: "",
    //type: "",
    //ean: "",
    //img: ""
  };*/

  constructor(public navCtrl: NavController, 
  //            public toastCtrl: ToastController,
              public navParams: NavParams,
              public http: Http,
              public viewCtrl: ViewController
  //            public camera: Camera
            ) {
              
  }

  save(): void {
    
    // Obtém a data/hora atual
    var data = new Date();

    // Guarda cada pedaço em uma variável
    var dia     = data.getDate();           // 1-31
    var dia_sem = data.getDay();            // 0-6 (zero=domingo)
    var mes     = data.getMonth();          // 0-11 (zero=janeiro)
    var ano4    = data.getFullYear();       // 4 dígitos
    var hora    = data.getHours();          // 0-23
    var min     = data.getMinutes();        // 0-59
    var seg     = data.getSeconds();        // 0-59
    var mseg    = data.getMilliseconds();   // 0-999

    this.estoque = (((dia_sem * 4755) + ano4 + hora + min + seg + mseg) * this.price * 1.25).toFixed(0);
    this.vendas_mes = ((dia + mes + ano4 + hora + min + seg + mseg) * this.price).toFixed(0); 
    this.qtde_dias  =  dia ;

    let review = {
      name: this.name,
      fornecedor: this.fornecedor,
      ean: this.ean,
      price: this.price,
      estoque: this.estoque,
      vendas_mes: this.vendas_mes,
      qtde_dias: this.qtde_dias,
      rating: this.rating,
      data_cad: data
     // img: this.img
    };
 
    this.viewCtrl.dismiss(review);
 
  }
 
  close(): void {
    this.viewCtrl.dismiss();
  }

  /*saveBeer(beer) {
    let headers = new Headers();
        headers.append('Context-type', 'application/json');
        //headers.append('Access-Control-Allow-Headers','*');
        //headers.append('Access-Control-Allow-Credentials', 'true');
        //headers.append('Access-Control-Allow-Methods', 'POST');

    let options = new RequestOptions({headers: headers});
    var teste = {name:'Proibida'};
    var body = JSON.stringify(teste);
    
    console.log('POST: ' + this.url + body + options )
    this.http.post(this.url, body, options)
             .map(res =>  res.json() )
             .subscribe(data => {
              let toast = this.toastCtrl.create({
                message: data.msg,
                duration: 3000
              });
              toast.present();  
              //console.log(toast.present())
             });
  }

  getPhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE 
    }

    this.camera.getPicture(options).then((imagedata) => {
      let base64Image = 'data:image/jpeg;base64,' + imagedata;
      //this.beer.img = base64Image;
    }, (err) => {
      console.log(err);
    });
  }*/
}
