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
  
  petname;address;phone;petinformation;petimage;petshopimage;
  spoilcity;
  cityn;
  citym:Array<any> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public cityDataProvider: CityDataProvider,public http:Http ) {
    this.cityColumns = this.cityDataProvider.cities; 
    console.log(this.spoilcity);
  }
  
  shopName:string;
  list=[];
  petlist=[];
  petitem=[];
  ionViewDidLoad() {
    console.log('ionViewDidLoad SpoilPage');
    this.http.get('http://192.168.110.1:3000/petshop').subscribe( data=>{ 
        console.log(JSON.parse(data['_body']));
        this.list=JSON.parse(data['_body']);
        var messshop=JSON.parse(data['_body']);
        for(var i=0;i<messshop.length;i++){
          this.list[i]=messshop[i];
          this.list[i].petshopimage='http://192.168.110.1:3000/upload/'+this.list[i].petshopimage;
          
        }
    });
    this.http.get('http://192.168.110.1:3000/petlist').subscribe( data=>{ 
        console.log(JSON.parse(data['_body']));
        this.petlist=JSON.parse(data['_body']);
        var mess=JSON.parse(data['_body']);
        for(var i=0;i<mess.length;i++){
          this.petlist[i]=mess[i];
          this.petlist[i].petimage='http://192.168.110.1:3000/upload/'+this.petlist[i].petimage;
          
        }
    });
  
  }

  petdetail(petitem){
    this.navCtrl.push(PetdetailPage,{petitem:petitem});
  } 
  petpublish(){
    this.navCtrl.push(PetpublishPage);
  } 
  //city
  cityenter(){
    this.cityn=document.getElementById('spoilcity').innerText;
    this.citym=this.cityn.split(' ');
    this.citym=this.citym[0]+this.citym[1];
    console.log(this.citym);
    this.http.get('http://192.168.110.1:3000/petshop/search?petshopregion='+this.citym).subscribe( data=>{ 
        console.log(JSON.parse(data['_body']));
        this.list=JSON.parse(data['_body']);
        var messshopc=JSON.parse(data['_body']);
        for(var i=0;i<messshopc.length;i++){
          this.list[i]=messshopc[i];
          this.list[i].petshopimage='http://192.168.110.1:3000/upload/'+this.list[i].petshopimage;
          
        }
    });
  }
  
















}

