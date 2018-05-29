import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ActionSheetController, AlertController} from 'ionic-angular';
import {ImagePicker, ImagePickerOptions} from "@ionic-native/image-picker";
import {Camera, CameraOptions} from "@ionic-native/camera";
import { SpoilPage } from '../spoil/spoil';

import { Http} from "@angular/http";
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController, public imagePicker: ImagePicker, public camera: Camera,public http:Http
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
  presentAlert2() {
    let alert = this.alertCtrl.create({
      title: '填写不详细',
      subTitle: '请完善您的爱宠信息',
      buttons: ['OK']
    });
    alert.present();
  }
  presentAlert3() {
    let alert = this.alertCtrl.create({
      title: '发布错误',
      subTitle: '请重新发布',
      buttons: ['OK']
    });
    alert.present();
  }

  publish(){
    this.http.get('http://127.0.0.1:3000/petlistAdd?petname='+this.petcl+'&phone='+this.phone+'&address='+this.address+'&petinformation='+this.petinformation).subscribe(data=>{
      console.log(data);
      if(data['_body']==1){
        this.presentAlert1();
        this.navCtrl.push(SpoilPage);
      }
      else if(data['_body']==2){
        this.presentAlert2();
      }
      else {
        this.presentAlert3();
      }
      
    });
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [{
        text: '拍照',
        role: 'takePhoto',
        handler: () => {
          this.takePhoto();
        }
      }, {
        text: '从相册选择',
        role: 'chooseFromAlbum',
        handler: () => {
          this.chooseFromAlbum();
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
  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      allowEdit: true,
      targetWidth: 200,
      targetHeight: 200,
      saveToPhotoAlbum: true,
    };

    this.camera.getPicture(options).then(image => {
      console.log('Image URI: ' + image);
      this.avatar = image.slice(7);
    }, error => {
      console.log('Error: ' + error);
    });
  }

  chooseFromAlbum() {
    const options: ImagePickerOptions = {
      maximumImagesCount: 1,
      width: 200,
      height: 200
    };
    this.imagePicker.getPictures(options).then(images => {
      if (images.length > 1) {
        this.presentAlert();
      } else if (images.length === 1) {
        console.log('Image URI: ' + images[0]);
        this.avatar = images[0].slice(7);
      }
    }, error => {
      console.log('Error: ' + error);
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
