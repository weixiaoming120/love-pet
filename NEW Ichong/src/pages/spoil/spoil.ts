import { PetdetailPage } from '../petdetail/petdetail';
import { PetpublishPage } from '../petpublish/petpublish';
import { CityDataProvider} from "../../providers/city-data/city-data";
import { Component ,ViewChildren, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams ,Content} from 'ionic-angular';
import { Http} from "@angular/http";

@IonicPage()
@Component({
  selector: 'page-spoil',
  templateUrl: 'spoil.html',

})
export class SpoilPage {
  adopt:string = 'jiyang';
  cityColumns: any[];
  indexes: Array<string> = [];
  cities: Array<any> = [];
  filterCities: Array<any> = [];
  @ViewChildren('cityGroup') cityGroup;
  @ViewChild(Content) content: Content;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public cityDataProvider: CityDataProvider,public http:Http ) {
    this.cityColumns = this.cityDataProvider.cities; 
     
  }

  shopName:string;
  list:number[]=[1,2,3,4,5];
  petlist:number[]=[1,2];
  ionViewDidLoad() {
    console.log('ionViewDidLoad SpoilPage');
    this.http.get('http://127.0.0.1:3000/petshop').subscribe( data=>{ 
        console.log(JSON.parse(data['_body']));
        this.list=JSON.parse(data['_body']);
     
    });
    this.http.get('http://127.0.0.1:3000/petlist').subscribe( data=>{ 
        console.log(JSON.parse(data['_body']));
        this.petlist=JSON.parse(data['_body']);
     
    });
  
  }

  petdetail(){
    this.navCtrl.push(PetdetailPage);
  } 
  petpublish(){
    this.navCtrl.push(PetpublishPage);
  } 
  
}
