import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http} from "@angular/http";
@IonicPage()
@Component({
  selector: 'page-petdetail',
  templateUrl: 'petdetail.html',
})
export class PetdetailPage {
  petname;
  address;
  phone;
  petinformation;
  petimage;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http) {
    this.petname=navParams.get('petitem').petname;
    this.address=navParams.get('petitem').address;
    this.phone=navParams.get('petitem').phone;
    this.petinformation=navParams.get('petitem').petinformation;
    this.petimage=navParams.get('petitem').petimage;
  }
  // list:number[]=[1];
  ionViewDidLoad() {
    console.log('ionViewDidLoad PetdetailPage');
    // let ID = this.navParams.get('id');
    // console.log(ID);
    // console.log('ionViewDidLoad HelarticlePage');
    // this.http.get('http://127.0.0.1:3000/petlist').subscribe( data=>{ 
    //     console.log(JSON.parse(data['_body']));
    //     this.list=JSON.parse(data['_body'])[0];
     
    // });
  }

}