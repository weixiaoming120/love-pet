import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ActionSheetController, AlertController} from 'ionic-angular';
import {ImagePicker, ImagePickerOptions} from "@ionic-native/image-picker";
import {Camera, CameraOptions} from "@ionic-native/camera";
import { Http} from "@angular/http";
import { MypetPage} from '../mypet/mypet';
import { HTTP} from "@ionic-native/http";
@IonicPage()
@Component({
  selector: 'page-addpet',
  templateUrl: 'addpet.html',
})
export class AddpetPage {
  username=localStorage.getItem('username');

  avatar: string = "";
  constructor(private Http:HTTP,public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController, public imagePicker: ImagePicker, public camera: Camera,public http:Http) {
  }
  usrid:string;
  autoManufacturers:string;
  addone:string;
  myDate:string;
  petid;
  list=[1,2,3,4,5];
  presentAlert1() {
    let alert = this.alertCtrl.create({
      title: '添加成功',
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
      title: '添加错误',
      subTitle: '请重新添加',
      buttons: ['OK']
    });
    alert.present();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddpetPage');
  }
  conserve(){
    let petid=localStorage.getItem('petid'); 
    this.http.get('http://192.168.110.1:3000/petmessageAdd?petid='+petid+'&petname='+this.usrid+'&petsex='+this.autoManufacturers+'&petdate='+this.myDate+'&petkind='+this.addone).subscribe(data=>{
      console.log(data['_body']);
      this.presentAlert1();
      this.navCtrl.push(MypetPage,this.navParams); 
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

    this.Http.post('http://192.168.110.1:3000/addpetimg',{
      imgData:base64Image,
       username:this.username

      },{}).then(res=>{
      var data=JSON.parse(res['data']);
      var url=data.avatar;
      
      e.target.style.background ="url(http://192.168.110.1:3000/upload/" + url + ")";
      this.http.get('http://192.168.110.1:3000/petmessage?username='+this.username).subscribe(data=>{
        console.log(JSON.parse(data['_body']));  
        this.list=JSON.parse(data['_body']);
        this.petid=this.list[0]['petid'];
        localStorage.setItem('petid',this.petid);
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

    this.Http.post('http://192.168.110.1:3000/addpetimg',{
      imgData:base64Image,
       username:this.username

      },{}).then(res=>{
      var data=JSON.parse(res['data']);
      var url=data.avatar;
      
      e.target.style.backgroundImage = "url(http://192.168.110.1:3000/upload/" + url + ")";
      this.http.get('http://192.168.110.1:3000/petmessage?username='+this.username).subscribe(data=>{
        console.log(JSON.parse(data['_body']));  
        this.list=JSON.parse(data['_body']);
        this.petid=this.list[0]['petid'];
        localStorage.setItem('petid',this.petid);
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
