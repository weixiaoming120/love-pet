import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Events, Tabs} from 'ionic-angular';
import { YimiaoPage}from '../yimiao/yimiao';
import { GeneralPage}from '../general/general';
import { Subscription } from 'rxjs/Subscription';
import { AddhealrePage} from '../addhealre/addhealre';
import ECharts from 'echarts';
//import {Keyboard} from '@ionic-native/keyboard';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
 
  private hideSubscription: Subscription;
  private showSubscription: Subscription;
  constructor(public navCtrl: NavController,public navParams: NavParams,private event: Events) {
    this.hideSubscription = null;
    this.showSubscription = null;
  }
  addheal(){
    this.navCtrl.push(AddhealrePage);
  }

  ionViewDidEnter(){
    this.createCharts();

    // this.keyboard.onKeyboardShow().subscribe(()=>this.event.publish('hideTabs'));
    // this.keyboard.onKeyboardHide().subscribe(()=>this.event.publish('showTabs'));
  }


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
                    data:[13,14,12,16,11,18]
                },
                {
                    name:'体重',
                    type:'line',
                    smooth:true,
                    yAxisIndex: 1,
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data:[24,21,16,15,16,12]
                }
            ]    
        };
                            
                            

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }
 
}
