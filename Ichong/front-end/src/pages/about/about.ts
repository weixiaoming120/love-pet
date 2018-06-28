import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Events, Tabs, InfiniteScroll} from 'ionic-angular';
import { YimiaoPage}from '../yimiao/yimiao';
import { GeneralPage}from '../general/general';
import { Subscription } from 'rxjs/Subscription';
import { AddhealrePage} from '../addhealre/addhealre';
import { ChangeDetectorRef } from '@angular/core';  

import ECharts from 'echarts';
import { Http} from '@angular/http';
//import {Keyboard} from '@ionic-native/keyboard';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  height:string;
  weight:string;
  birth:string;
  sterilisation:string;
  username=localStorage.getItem('username');
  petname=localStorage.getItem('petname');
  relist:number[]=[1,2,3,4,5];
  list:number[]=[1,2,3,4,5];
  heightarr=[];
  weightarr=[];
  heightarr1=[];
  weightarr1=[];
  items = [];

  private hideSubscription: Subscription;
  private showSubscription: Subscription;
  constructor(public cd: ChangeDetectorRef,public navCtrl: NavController,public navParams: NavParams,private event: Events,public http:Http) {
    this.hideSubscription = null;
    this.showSubscription = null;

    // for (var item = 0; item < 2; item++) {
    //     this.relist.push( this.relist.length );
    //   }   
  
  }
    addheal(){
        this.navCtrl.push(AddhealrePage);
  }
    confirm(){
        this.http.get('http://192.168.110.1:3000/pethealthAdd?username='+this.username+'&petname='+this.petname+'&height='+this.height+'&weight='+this.weight).subscribe(data=>{
        console.log(data);    
        if(this.heightarr1.length>=7){
            this.heightarr1.push(parseFloat(this.height));
            this.heightarr1.shift();
        }
        else{
            this.heightarr1.push(parseFloat(this.height));            
        }
        if(this.weightarr1.length>=7){
            this.weightarr1.push(parseFloat(this.weight)); 
            this.weightarr1.shift();
        }
        else{
            this.weightarr1.push(parseFloat(this.weight)); 

        }

        this.height = '';
        this.weight = '';
        console.log(this.heightarr1);  
        this.createCharts();   
        });  
    }


    ionViewDidEnter(){

        // this.cd.detectChanges();
        this.petname=localStorage.getItem('petname');
        console.log(this.petname);
        this.cd.detectChanges();
        this.http.get('http://192.168.110.1:3000/petrecord?username='+this.username+'&petname='+this.petname).subscribe(data=>{
          console.log(JSON.parse(data['_body']));
          this.relist=JSON.parse(data['_body']);
          console.log(this.relist);
        });

        this.http.get('http://192.168.110.1:3000/pethealth?username='+this.username+'&petname='+this.petname).subscribe(data=>{
           console.log(data['_body']);     
           this.list=JSON.parse(data['_body']);
           this.heightarr=[];
           this.weightarr=[];

           console.log(this.heightarr1);
           for(let i=0;i<this.list.length;i++){        
            this.heightarr.push(parseFloat(this.list[i]['height']));
            this.heightarr1=this.heightarr.slice(-7); 
           }   
           for(let i=0;i<this.list.length;i++){
            this.weightarr.push(parseFloat(this.list[i]['weight']));
            this.weightarr1=this.weightarr.slice(-7); 
           } 
           console.log(this.heightarr1);
           this.createCharts();
           
        });

        
           
        // this.keyboard.onKeyboardShow().subscribe(()=>this.event.publish('hideTabs'));
        // this.keyboard.onKeyboardHide().subscribe(()=>this.event.publish('showTabs'));
    }
  ionViewDidLoad() {

  } 
//下拉
//   doInfinite(infiniteScroll): Promise<any> {
//     console.log('Begin async operation');

//     return new Promise((resolve) => {
//       setTimeout(() => {
//         for (var item = 0; item < 5; item++) {
//           this.relist.push( this.relist[item] );
//         }

//         console.log('Async operation has ended');
//         // resolve();
//         infiniteScroll.complete();
//         // infiniteScroll.enable();
//       }, 500);
//     })
//   }


  ionViewWillLeave(){
    // this.keyboard.close();
    if(this.hideSubscription){
      this.hideSubscription.unsubscribe();
      this.hideSubscription = null;
    }
    if(this.showSubscription){
      this.showSubscription.unsubscribe();
      this.showSubscription = null;
    }
    
    console.log(this.heightarr1);
  }


  yimiao(){
    this.navCtrl.push(YimiaoPage,this.navParams);
  }
  general(){
    this.navCtrl.push(GeneralPage,this.navParams);
  }
  
createCharts() {
    var myChart = ECharts.init(document.getElementById('main') as HTMLDivElement);
    // 指定图表的配置项和数据
        var option = {
            title : {
                text: '身高体重变化',
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:[]
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : ['一','二','三','四','五','六','七']
                }
            ],
            yAxis: [{
            type: 'value',
            name: '身高/cm',
            min: 0,
            max: 130,
            interval: 10,
            axisLabel: {
                formatter: '{value}'
            }
        },
        {
            type: 'value',
            name: '体重',
            min: 0,
            max: 50,
            interval: 5,
            axisLabel: {
                formatter: '{value}'
            }
        }
        ],

            series : [
                {
                    name:'身高',
                    type:'line',
                    smooth:true,
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    yAxisIndex: 0,
                    data:this.heightarr1
                },
                {
                    name:'体重',
                    type:'line',
                    smooth:true,
                    yAxisIndex: 1,
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data:this.weightarr1
                }
            ]    
        };
                            
                            

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }
 
}
