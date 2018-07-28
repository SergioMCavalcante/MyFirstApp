import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

/*
  Generated class for the ProdServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProdServiceProvider {

  data: any;
  url: any;
  constructor(public http: Http) {
    this.data = null;
  }

  getReviews(){
 
    if (this.data) {
      return Promise.resolve(this.data);
    }
 
    return new Promise(resolve => {
      console.log('Antes do GET geral ')
      this.url = 'http://localhost:3000/api/v1/cadprod' 
      console.log('URL: ' + this.url)
      this.http.get(this.url)
        .map(res => res.json()) 
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  getProdId(id){
 
    console.log('ParamProv: ' + id)

    //if (this.data) {
    //  return Promise.resolve(this.data);
    //}
 
    return new Promise(resolve => {
      console.log('Antes do GET ' + id)
      this.url = 'http://localhost:3000/api/v1/cadprod/' + id
      console.log('url ' + this.url)
      this.http.get(this.url)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          console.log('Data prov: ' + this.data)
          resolve(this.data);
        });
    });
  }

  createReview(review) {
 
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    this.http.post('http://localhost:3000/api/v1/cadprod', JSON.stringify(review), { headers: headers })
        .subscribe(res => {
        console.log(res.json());
      });
 
  }
 
  deleteReview(id){
 
    console.log('ParamProv Del: ' + id)
    
    this.url = 'http://localhost:3000/api/v1/cadprod/' + id
    this.http.delete(this.url).subscribe((res) => {
      console.log(res.json());
    });   
 
  }

}