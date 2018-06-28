import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Events} from 'ionic-angular';
// import { Keyboard } from '@ionic-native/keyboard';
import { ActionSheetController, AlertController} from 'ionic-angular';
import {ImagePicker, ImagePickerOptions} from "@ionic-native/image-picker";
import {Camera, CameraOptions} from "@ionic-native/camera";
import { ProfilePage } from '../profile/profile';
import { Http} from "@angular/http";
import { HTTP} from "@ionic-native/http";
@IonicPage()
@Component({
  selector: 'page-improve',
  templateUrl: 'improve.html',
})
export class ImprovePage {
  avatar: string = "";
  username=localStorage.getItem('username');
  gender:string;
  email:string;
  introduction:string;
  gen:string;
  headers = new Headers( {'Content-Type':'application/x-www-form-urlencoded'} );
  constructor(private Http:HTTP,public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController, public imagePicker: ImagePicker, public camera: Camera,private event:Events,public http:Http) {
  }

  ionViewDidLoad() {

    // this.keyboard.onKeyboardShow().subscribe(() => this.event.publish('hideTabs'));
    // this.keyboard.onKeyboardHide().subscribe(() => this.event.publish('showTabs'));
  }
  
  submit(){
    
    this.http.get('http://192.168.110.1:3000/login/amend?username='+this.username+'&gender='+this.gender+'&email='+this.email+'&introduction='+this.introduction).subscribe(data=>{
      console.log(data['_body']);
      this.navCtrl.push(ProfilePage,this.navParams);      
    });
  }
  
  presentActionSheet(e) {

    // let e=document.getElementsByClassName('e');
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
    // var image = document.getElementById('image');
    // image.style.background = "url(" + this.userinfo.url + ")";
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

    this.Http.post('http://192.168.110.1:3000/imguser',{
      imgData:base64Image,
       username:this.username

      },{}).then(res=>{
      var data=JSON.parse(res['data']);
      var url=data.avatar;
      
      e.target.style.backgroundImage = "url(http://192.168.110.1:3000/upload/" + url + ")";

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

    this.Http.post('http://192.168.110.1:3000/imguser',{
      imgData:base64Image,
       username:this.username

      },{}).then(res=>{
      var data=JSON.parse(res['data']);
      var url=data.avatar;
      
      e.target.style.backgroundImage = "url(http://192.168.110.1:3000/upload/" + url + ")";

    }).catch(err=>{
      console.log(err);
    });

    }, (err) => {
    // Handle error
    });
  }
  
  mitt(){
    var file=document.getElementsByTagName('input')[0].files[0];
    console.log(file.name);
    this.gen='../assets/touxiang/'+file.name;
    // var reader=new FileReader();
    // var imgFile;
    // reader.onload=function(e){
    //   console.log('wancheng');
    //   imgFile=this.result; 
    //   localStorage.setItem('img',imgFile);
    //   console.log(imgFile);
      
    // }
    // console.log(imgFile);
    // reader.readAsDataURL(file);
    // console.log(imgFile);
    console.log(this.gen);
    // this.getBase64Image(this.gen);
  }
}

