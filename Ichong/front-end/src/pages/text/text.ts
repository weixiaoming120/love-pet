import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import {ImagePicker, ImagePickerOptions} from "@ionic-native/image-picker";
import {Camera, CameraOptions} from "@ionic-native/camera";
import { HTTP} from "@ionic-native/http";
import { Http} from "@angular/http";
import { HomePage } from '../home/home';
//import { Base64 } from '@ionic-native/base64';

//import { Headers } from '@angular/http';
@IonicPage()
@Component({
  selector: 'page-text',
  templateUrl: 'text.html',
})
export class TextPage {
  items=[];
  avatar: string = "";
  content:string;
  username=localStorage.getItem('username');
  petname=localStorage.getItem('petname');
  dailyid;
  list=[1,2,3,4,5];

  headers = new Headers( {'Content-Type':'application/x-www-form-urlencoded'} );

  constructor(private Http:HTTP,public http:Http ,public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController, public imagePicker: ImagePicker, public camera: Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TextPage');
  }
  presentAlert1() {
    let alert = this.alertCtrl.create({
      title: '发布成功',
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
  daily(){
    let now = new Date();     //获取当前日期
    let year=now.getFullYear();
    let month=now.getMonth()+1;
    let day=now.getDate();
    let hh=now.getHours();
    let mm=now.getMinutes();
    let ss=now.getSeconds();
    let date=year+'年'+month+'月'+day+'日'+hh+':'+mm+':'+ss;
   
    let dailyid=localStorage.getItem('dailyid'); 
    this.http.get('http://192.168.110.1:3000/publishAdd?dailyid='+dailyid+'&petname='+this.petname+'&pubcontent='+this.content+'&date='+date).subscribe(data=>{
      console.log(data['_body']);
      this.presentAlert1();
      this.navCtrl.push(HomePage,this.navParams); 
    });
  }

  presentActionSheet(e) {
  // let =document.getElementsByClassName('xian');
    
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

    this.Http.post('http://192.168.110.1:3000/img/pubpic',{
      imgData:base64Image,
       username:this.username

      },{}).then(res=>{
      var data=JSON.parse(res['data']);
      var url=data.avatar;
      
      e.target.style.backgroundImage = "url(http://192.168.110.1:3000/upload/" + url + ")";
      this.http.get('http://192.168.110.1:3000/publish?username='+this.username).subscribe(data=>{
        console.log(JSON.parse(data['_body']));  
        this.list=JSON.parse(data['_body']);
        this.dailyid=this.list[0]['dailyid'];
        localStorage.setItem('dailyid',this.dailyid);
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

    this.Http.post('http://192.168.110.1:3000/img/pubpic',{
      imgData:base64Image,
      username:this.username

      },{}).then(res=>{
      var data=JSON.parse(res['data']);
      var url=data.avatar;
      e.target.style.backgroundImage = "url(http://192.168.110.1:3000/upload/" + url + ")";
      
      this.http.get('http://192.168.110.1:3000/publish?username='+this.username).subscribe(data=>{
        console.log(JSON.parse(data['_body']));  
        this.list=JSON.parse(data['_body']);
        this.dailyid=this.list[0]['dailyid'];
        localStorage.setItem('dailyid',this.dailyid);
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
}
