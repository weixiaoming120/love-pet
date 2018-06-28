import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ActionSheetController, AlertController} from 'ionic-angular';
import {ImagePicker, ImagePickerOptions} from "@ionic-native/image-picker";
import {Camera, CameraOptions} from "@ionic-native/camera";
import { SpoilPage } from '../spoil/spoil';

import { Http} from "@angular/http";
import { HTTP} from "@ionic-native/http";
@IonicPage()
@Component({
  selector: 'page-petpublish',
  templateUrl: 'petpublish.html',
})
export class PetpublishPage {
  avatar: string = "";
  petcl:string;
  petname:string;
  petinformation:string;
  phone:number;
  address:string;
  username=localStorage.getItem('username');
  headers = new Headers( {'Content-Type':'application/x-www-form-urlencoded'} );
  id;
  list=[1,2,3,4,5];


  constructor(private Http:HTTP,public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController, public imagePicker: ImagePicker, public camera: Camera,public http:Http
  ) {
    
  }

  ionViewDidLoad() {
   
    console.log('ionViewDidLoad PetpublishPage');
  }

  presentAlert1() {
    let alert = this.alertCtrl.create({
      title: '发布成功',
      buttons: ['OK']
    });
    alert.present();
  }
  // presentAlert2() {
  //   let alert = this.alertCtrl.create({
  //     title: '填写不详细',
  //     subTitle: '请完善您的爱宠信息',
  //     buttons: ['OK']
  //   });
  //   alert.present();
  // }
  // presentAlert3() {
  //   let alert = this.alertCtrl.create({
  //     title: '发布错误',
  //     subTitle: '请重新发布',
  //     buttons: ['OK']
  //   });
  //   alert.present();
  // }

  publish(){
    let publishid=localStorage.getItem('id');
    this.http.get('http://192.168.110.1:3000/petlistAdd?&id='+publishid+'&petname='+this.petcl+'&phone='+this.phone+'&address='+this.address+'&petinformation='+this.petinformation).subscribe(data=>{
      console.log(JSON.parse(data['_body']));
      this.presentAlert1();
      this.navCtrl.push(SpoilPage,this.navParams); 
      // if(data['_body']==1){
      //   this.presentAlert1();
      //   this.navCtrl.push(SpoilPage);
      // }
      // else if(data['_body']==2){
      //   this.presentAlert2();
      // }
      // else {
      //   this.presentAlert3();
      // }
      
    });
  }

  presentActionSheet(e) {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [{
        text: '拍照',
        role: 'takePhoto',
        handler: () => {
          this.takePhoto(e);
        }
      }, {
        text: '从相册选择',
        role: 'chooseFromAlbum',
        handler: () => {
          this.chooseFromAlbum(e);
        }
      }, {
        text: '取消',
        role: 'cancel',
        handler: () => {
          console.log("cancel");
        }
      }]
    });

    actionSheet.present().then(value => {
      return value;
    });
  }
  takePhoto(e){
    const options: CameraOptions = {
      sourceType:1,
      quality: 100,
      destinationType: 0,
      encodingType: 0,
      mediaType: 0,
      allowEdit: true,
      targetWidth: 300,
      targetHeight: 300,
      correctOrientation:true,
      // saveToPhotoAlbum: true,   
    }
let base64Image;
this.camera.getPicture(options).then((imageData) => {

 base64Image = 'data:image/jpeg;base64,' + imageData;

    this.Http.post('http://192.168.110.1:3000/imgpet',{
      imgData:base64Image,
      //  username:this.username

      },{}).then(res=>{
      var data=JSON.parse(res['data']);
      var url=data.avatar;     
      e.target.style.background = "url(http://192.168.110.1:3000/upload/" + url + ")";
      this.http.get('http://192.168.110.1:3000/petlist').subscribe(data=>{
        console.log(JSON.parse(data['_body']));  
        this.list=JSON.parse(data['_body']);
        this.id=this.list[0]['id'];
        localStorage.setItem('id',this.id);
      });

    }).catch(err=>{
      console.log(err);
    });

    }, (err) => {
    // Handle error
    });
   
  }
  chooseFromAlbum(e) { 
    const options: CameraOptions = {
      sourceType:0,
      quality: 100,
      destinationType: 0,
      encodingType: 0,
      mediaType: 0,
      allowEdit: true,
      targetWidth: 300,
      targetHeight: 300,
      correctOrientation:true,
      // saveToPhotoAlbum: true,   
    }
let base64Image;
this.camera.getPicture(options).then((imageData) => {

 base64Image = 'data:image/jpeg;base64,' + imageData;

    this.Http.post('http://192.168.110.1:3000/imgpet',{
      imgData:base64Image,
      //  username:this.username

      },{}).then(res=>{
      var data=JSON.parse(res['data']);
      var url=data.avatar;     
      e.target.style.backgroundImage = "url(http://192.168.110.1:3000/upload/" + url + ")";
      
      this.http.get('http://192.168.110.1:3000/petlist').subscribe(data=>{
        console.log(JSON.parse(data['_body']));  
        this.list=JSON.parse(data['_body']);
        this.id=this.list[0]['id'];
        localStorage.setItem('id',this.id);
      });
    }).catch(err=>{
      console.log(err);
    });

    }, (err) => {
    // Handle error
    });
  }


  presentAlert() {
    let alert = this.alertCtrl.create({title: "上传失败", message: "只能选择一张图片作为头像哦", buttons: ["确定"]});
    alert.present().then(value => {
      return value;
    });
  }

  petclass(){
    let alert = this.alertCtrl.create({
      title: 'I宠种类？',
      inputs: [{        
          placeholder: '萨摩耶/柴犬...'
        }],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: data => {
            this.petcl=data[0];
            console.log(this.petcl);
          }
        }
      ]
    });
    alert.present();
  }
}
