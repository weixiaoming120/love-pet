import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from "@angular/http";

@IonicPage()
@Component({
  selector: 'page-helarticle',
  templateUrl: 'helarticle.html',
})
export class HelarticlePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http) {
  }

  ionViewDidLoad() {
    let artcontentID = this.navParams.get('articalid');
    console.log(artcontentID);
    console.log('ionViewDidLoad HelarticlePage');
    // this.http.get('http://127.0.0.1:3000/artical',JSON.stringify({articalid:1})).subscribe( data=>{ 
    //     console.log(JSON.parse(data['_body']));
    //     this.article=JSON.parse(data['_body']);
    // });
  }

}
