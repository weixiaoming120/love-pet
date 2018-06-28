import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Events} from 'ionic-angular';
// import { Keyboard } from '@ionic-native/keyboard';
import { ActionSheetController, AlertController} from 'ionic-angular';
import {ImagePicker, ImagePickerOptions} from "@ionic-native/image-picker";
import {Camera, CameraOptions} from "@ionic-native/camera";
import { ImprovePage } from '../improve/improve';
import { Http} from "@angular/http";
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  avatar: string = "";
  username1;pic;gender;telephone;email;introduction;
  username=localStorage.getItem('username');
  list:number[]=[1,2,3,4,5];
  imgbase;

  // pic=localStorage.getItem('pic');
  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController, public imagePicker: ImagePicker, public camera: Camera,private event:Events,public http:Http) {
  }
  improve(){
    this.navCtrl.push(ImprovePage);
  }


  ionViewDidLoad() {
    // this.imgbase=localStorage.getItem('img');
    console.log('进入');
    // this.keyboard.onKeyboardShow().subscribe(() => this.event.publish('hideTabs'));
    // this.keyboard.onKeyboardHide().subscribe(() => this.event.publish('showTabs'));
    this.http.get('http://192.168.110.1:3000/login/get?username='+this.username).subscribe(data=>{
      console.log(data['_body']);
      this.list=JSON.parse(data['_body']);
      this.username1=this.username;
      // this.pic1=this.pic;
      this.pic= 'http://192.168.110.1:3000/upload/'+this.list[0]['pic'];
      console.log(this.pic);
      this.gender= this.list[0]['gender'];
      this.telephone= this.list[0]['telephone'];
      this.email= this.list[0]['email'];
      this.introduction= this.list[0]['introduction'];
     
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
}
