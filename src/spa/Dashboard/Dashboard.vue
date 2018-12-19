<template>
  <!--Page content-->
  <!--===================================================-->
<div id="content-container" style="background-color: #0b1521; overflow-x:auto; max-height:910px; margin-left:25px; margin-top:25px;">
  <div class="fluid faq-accordion" style="">

    <div style="display:inline-flex;">
      <div id="btnGroup" >
        <!-- GENERAL -->
        <!--===================================================-->

          <div class="panel-heading">
            <p class="panel-title"><i @click="click1=!click1" href="#toggleDiv-1" data-toggle="collapse" v-bind:class="[ click1 ? 'fa fa-minus-square' : 'fa fa-plus-square' ]"></i>&nbsp; WEB</p>
          </div>

          <div class="panel-collapse collapse in" id="toggleDiv-1" style="">
            <div class="ht-event-btns">

              <div v-for="(server, index) in serverList" :key="server.index" v-bind:class="[server.lastTime!=9999 ?'ht-event-btn stl'+(index%7+1): 'ht-event-btn']" @click="goToLogViewer(server.hostName)" v-on:contextmenu.prevent="delServer(server.hostIp, server.hostName, index)">
                <!-- <router-link to="/logViewer/ip-172-31-31-55"> -->
                <router-link :to="{ name: 'logViewer', params: { hostName : server.hostName } }">

                  <div v-bind:class="[ server.lastTime==9999 ? 'flag dead' : 'flag' ]">
                    
                    <p v-if="server.lastTime==9999"><span id="aliveText">dead</span></p>
                    <p v-else><span id="aliveText">alive</span></p>
                  </div>
                  <p>{{server.hostName}}</p>
                  <div v-bind:class="[ server.lastTime==9999 ? 'subH dead' : 'subH' ]">
                    <p>{{server.hostIp}}<br><span style="color:grey">{{server.timeStamp | frontDateFormat}}</span></p>
                  </div>
                  <div v-bind:class="[ server.lastTime==9999 ? 'loader loading dead' : 'loader loading' ]" ></div>
                </router-link>
              </div>

              <div class="ht-event-btn add" @click="addNewServer()">
                <div class="panel-body demo-nifty-btn" style="text-align:center; padding-top:45px;">
                  <i class="fa fa-plus icon-3x"></i>
                  <div>add</div>
                </div>
              </div>

            </div> <!--ht-event-btns end-->
            
            
          </div><!--Div:End toggleDiv-1-->



          <div class="panel-heading">
            <p class="panel-title">
              <i @click="click2=!click2" href="#toggleDiv-2" data-toggle="collapse" v-bind:class="[ click2 ? 'fa fa-minus-square' : 'fa fa-plus-square' ]">
              </i>&nbsp; WAS
            </p>
          </div>
          <div class="panel-collapse collapse in" id="toggleDiv-2" style="">

            <div class="ht-event-btns">
              <div v-for="(server, index) in serverList2" :key="server.index" v-bind:class="[server.lastTime!=9999 ?'ht-event-btn stl'+(index%7+1): 'ht-event-btn']" v-on:contextmenu.prevent="delServer(server.hostIp, server.hostName, index)">
                <router-link to="/logViewer">
                  <div v-bind:class="[ server.lastTime==9999 ? 'flag dead' : 'flag' ]">
                    <p v-if="server.lastTime==9999"><span id="aliveText">dead</span></p>
                    <p v-else><span id="aliveText">alive</span></p>
                  </div>
                  <p>{{server.hostName}}</p>
                  <div v-bind:class="[ server.lastTime==9999 ? 'subH dead' : 'subH' ]">
                    <p>{{server.hostIp}}<br><span style="color:grey">{{server.timeStamp | frontDateFormat}}</span></p>
                  </div>
                  <div v-bind:class="[ server.lastTime==9999 ? 'loader loading dead' : 'loader loading' ]" ></div>
                </router-link>
              </div>

              <div class="ht-event-btn add" @click="addNewServer()">
                <div class="panel-body demo-nifty-btn" style="text-align:center; padding-top:45px;">
                  <i class="fa fa-plus icon-3x"></i>
                  <div>add</div>
                </div>
              </div>

            </div> <!--ht-event-btns end-->
          </div>



          <div class="panel-heading">
              <p class="panel-title">
                <i @click="click3=!click3" href="#toggleDiv-3" data-toggle="collapse" v-bind:class="[ click3 ? 'fa fa-minus-square' : 'fa fa-plus-square' ]">
                </i>&nbsp; DB
              </p>
          </div>
          <div class="panel-collapse collapse" id="toggleDiv-3" style="padding-bottom:0px;">
    
              
               <div class="ht-event-btns">
              <div v-for="(server, index) in serverList2" :key="server.index" v-bind:class="[server.lastTime!=9999 ?'ht-event-btn stl'+(index%7+1): 'ht-event-btn']" v-on:contextmenu.prevent="delServer(server.hostIp, server.hostName, index)">
                <router-link to="/logViewer">
                  <div v-bind:class="[ server.lastTime==9999 ? 'flag dead' : 'flag' ]">
                    <p v-if="server.lastTime==9999"><span id="aliveText">dead</span></p>
                    <p v-else><span id="aliveText">alive</span></p>
                  </div>
                  <p>{{server.hostName}}</p>
                  <div v-bind:class="[ server.lastTime==9999 ? 'subH dead' : 'subH' ]">
                    <p>{{server.hostIp}}<br><span style="color:grey">{{server.timeStamp | frontDateFormat}}</span></p>
                  </div>
                  <div v-bind:class="[ server.lastTime==9999 ? 'loader loading dead' : 'loader loading' ]" ></div>
                </router-link>
              </div>

              <div class="ht-event-btn add" @click="addNewServer()">
                <div class="panel-body demo-nifty-btn" style="text-align:center; padding-top:45px;">
                  <i class="fa fa-plus icon-3x"></i>
                  <div>add</div>
                </div>
              </div>

            </div> <!--ht-event-btns end-->

              
              
          </div><!--Div:End toggleDiv-3-->

      </div>

      <div id="chartGroup">
        <div style="background-color:#2E343E; padding:4px; border-radius: 8px; height:35px;"><p style="font-size : 20px; text-align:left; padding-left:10px">Log Count</p>
          
        </div>
        <br>
        <div id="chartdiv" style="height:280px; margin-right:20px;">
        </div>
        <br>
        <div style="background-color:#2E343E; padding:4px; border-radius: 8px; height:35px; width:100%; display:inline-block;;">

          <div class="media-body"><p style="font-size : 20px; text-align:left; padding-left:10px;">Keyword Count</p>
           
          </div>
           <!-- <div class="select">
            <select name="slct" id="slct">
              <option v-for="server in serverList" :key="server.index">{{server.hostName}}</option>
            </select>
          </div> -->
                    
        </div>
         
        <br>
        <!-- Chart Div -->
        <div id="chartdiv2" >
        </div>
         
      </div>
    </div>
  </div><!--Div:End fluid faq-accordion-->
   <modals-container :visibleModal.sync="visibleModal" />
</div>
  <!--===================================================-->
  <!--End page content-->
  
</template>

<!--jQuery [ REQUIRED ]-->
<script src="js/jquery.min.js"></script>
<!--BootstrapJS [ RECOMMENDED ]-->
<script src="js/bootstrap.min.js"></script>
<!--NiftyJS [ RECOMMENDED ]-->
<script src="js/nifty.min.js"></script>
<!-- Vue JS -->
<script src="js/app.js"></script>
<!--Demo script [ DEMONSTRATION ]-->
<script src="js/demo/nifty-demo.min.js"></script>
<!--Specify page [ SAMPLE ]-->
<script src="js/demo/dashboard-2.js"></script>

 <script src="https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/4.4.0/bootbox.min.js"></script>

<script>
import * as am4core2 from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import PopupAddServer from './PopupAddServer.vue';

import {askForPermissioToReceiveNotifications} from '../../../public/js/push-notification';

am4core2.useTheme(am4themes_animated);
am4core2.useTheme(am4themes_dark);

export default {
  data (){
    return {
      selectServer:"",
      click1:true,
      click2:true,
      click3:false,
      chartData:[{
        "year": new Date(2018, 12, 1),
        "cars": 1587,
        "motorcycles": 650,
        "bicycles": 121
      }, {
        "year": new Date(2018, 12, 2),
        "cars": 1567,
        "motorcycles": 683,
        "bicycles": 146
      }, {
        "year": new Date(2018, 12, 3),
        "cars": 1617,
        "motorcycles": 691,
        "bicycles": 138
      }, {
        "year": new Date(2018, 12, 4),
        "cars": 1630,
        "motorcycles": 642,
        "bicycles": 127
      }, {
        "year": new Date(2018, 12, 5),
        "cars": 1660,
        "motorcycles": 699,
        "bicycles": 105
      }, {
        "year": new Date(2018, 12, 6),
        "cars": 1683,
        "motorcycles": 721,
        "bicycles": 109
      }, {
        "year": new Date(2018, 12, 7),
        "cars": 1691,
        "motorcycles": 737,
        "bicycles": 112
      }, {
        "year": new Date(2018, 12, 8),
        "cars": 1298,
        "motorcycles": 680,
        "bicycles": 101
      }, {
        "year": new Date(2018, 12, 9),
        "cars": 1275,
        "motorcycles": 664,
        "bicycles": 97
      }, {
        "year": new Date(2018, 12, 10),
        "cars": 1246,
        "motorcycles": 648,
        "bicycles": 93
      }, {
        "year": new Date(2018, 12, 11),
        "cars": 1318,
        "motorcycles": 697,
        "bicycles": 111
      }, {
        "year": new Date(2018, 12, 12),
        "cars": 1213,
        "motorcycles": 633,
        "bicycles": 87
      }, {
        "year": new Date(2018, 12, 13),
        "cars": 1199,
        "motorcycles": 621,
        "bicycles": 79
      }, {
        "year": new Date(2018, 12, 14),
        "cars": 1110,
        "motorcycles": 210,
        "bicycles": 81
      }, {
        "year": new Date(2018, 12, 15),
        "cars": 1165,
        "motorcycles": 232,
        "bicycles": 75
      }, {
        "year": new Date(2018, 12, 16),
        "cars": 1145,
        "motorcycles": 219,
        "bicycles": 88
      }, {
        "year": new Date(2018, 12, 17),
        "cars": 1163,
        "motorcycles": 201,
        "bicycles": 82
      }, {
        "year": new Date(2018, 12, 18),
        "cars": 1180,
        "motorcycles": 285,
        "bicycles": 87
      }, {
        "year": new Date(2018, 12, 19),
        "cars": 1159,
        "motorcycles": 277,
        "bicycles": 71
      }],
      chartDataList : [
      ],
      chartDataList2 : [

      ],
      serverList : [
      ],
      serverList2 : [
        {"hostIp":"172.0.0.1",
        "hostName":"File beat",
        "lastTime":1,
        "timeStamp":"2018-12-20 09:56:12"},
        {"hostIp":"172.0.0.2",
        "hostName":"Elastic search",
        "lastTime":1,
        "timeStamp":"2018-12-20 09:56:12"},
        {"hostIp":"172.0.0.3",
        "hostName":"Logstash",
        "lastTime":1,
        "timeStamp":"2018-12-20 09:56:12"},
        {"hostIp":"172.0.0.4",
        "hostName":"Kibana",
        "lastTime":1,
        "timeStamp":"2018-12-20 09:56:12"},
        {"hostIp":"172.0.0.5",
        "hostName":"Filebeat",
        "lastTime":1,
        "timeStamp":"2018-12-20 09:56:12"},
        {"hostIp":"172.0.0.6",
        "hostName":"Axios",
        "lastTime":1,
        "timeStamp":"2018-12-20 09:56:12"},
        {"hostIp":"172.0.0.7",
        "hostName":"Firebase",
        "lastTime":1,
        "timeStamp":"2018-12-20 09:56:12"},
        {"hostIp":"172.0.0.8",
        "hostName":"Dotenv",
        "lastTime":1,
        "timeStamp":"2018-12-20 09:56:12"},
        {"hostIp":"172.0.0.9",
        "hostName":"GCM",
        "lastTime":9999,
        "timeStamp":"2018-12-20 09:56:12"}
      ],
      sorting : -1,
      visibleModal :false,
      srvUrl :// 'http://192.168.0.7:8080' // 창호
        'http://52.79.220.131:8080' // 배포
       // 'http://192.168.0.11:8080' // 우영
    }

  },
  filters:{
    frontDateFormat(value) {
      if("Exception"== value){
        return "Exception";
      }
      else return moment(value).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  
  methods:{
    createChart1(){
      let chart = am4core2.create("chartdiv", am4charts.XYChart);
      
      let data = [];
      for (var i = 0; i <10; i++) {
        data.push({ date1: new Date(this.chartDataList[0].chartDatas[i].date), count1: this.chartDataList[0].chartDatas[i].count });
      }
      for (var i = 0; i <10; i++) {
        data.push({ date2: new Date(this.chartDataList[1].chartDatas[i].date), count2: this.chartDataList[1].chartDatas[i].count });
      }
      chart.data = data;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.renderer.labels.template.fill = am4core2.color("#427691");

      let dateAxis2 = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis2.renderer.grid.template.location = 0;
      dateAxis2.renderer.labels.template.fill = am4core2.color("#6771DC");

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.labels.template.fill = am4core2.color("#427691");

      valueAxis.renderer.minWidth = 60;

      let valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis2.tooltip.disabled = true;
      valueAxis2.renderer.grid.template.strokeDasharray = "2,3";
      valueAxis2.renderer.labels.template.fill = am4core2.color("#6771DC");
      valueAxis2.renderer.minWidth = 60;

      let series = chart.series.push(new am4charts.LineSeries());
      series.name = this.chartDataList[0].hostName;
      series.dataFields.dateX = "date1";
      series.dataFields.valueY = "count1";
      series.tooltipText = "{valueY.value}";
      series.fill = am4core2.color("#427691");
      series.stroke = am4core2.color("#427691");
      series.strokeWidth = 3;

      let series2 = chart.series.push(new am4charts.LineSeries());
      series2.name = this.chartDataList[1].hostName;
      series2.dataFields.dateX = "date2";
      series2.dataFields.valueY = "count2";
      // series2.yAxis = valueAxis2;
      // series2.xAxis = dateAxis2;
      series2.tooltipText = "{valueY.value}";
      series2.fill = am4core2.color("#6771DC");
      series2.stroke = am4core2.color("#6771DC");
      series2.strokeWidth = 3;

      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = dateAxis;

      chart.legend = new am4charts.Legend();
      chart.legend.parent = chart.plotContainer;
      chart.legend.zIndex = 100;

      valueAxis2.renderer.grid.template.strokeOpacity = 0.07;
      dateAxis2.renderer.grid.template.strokeOpacity = 0.07;
      dateAxis.renderer.grid.template.strokeOpacity = 0.07;
      valueAxis.renderer.grid.template.strokeOpacity = 0.07;
    },
    createChart2(){
      let chart = am4core2.create("chartdiv2", am4charts.XYChart);
      chart.data = this.chartDataList2;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.renderer.labels.template.fill = am4core2.color("#fff");



      // dateAxis.renderer.minGridDistance = 60;
      // dateAxis.startLocation = 0.5;
      // dateAxis.endLocation = 0.5;
      // dateAxis.baseInterval = {
      //   timeUnit: "year",
      //   count: 1
      // }

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      
      // for(var i=1; Object.keys(this.chartDataList2[0]).length; i++){
      //   let series = chart.series.push(new am4charts.LineSeries());
      //   series.dataFields.dateX = "date";
      //   series.name = Object.keys(this.chartDataList2[0])[i];
      //   series.dataFields.valueY = Object.keys(this.chartDataList2[0])[i];
      //   series.tooltipHTML = "<span style='font-size:14px; color:#000000;'><b>{valueY.value}</b></span>";
      //   series.tooltip.background.fill = am4core.color("#FFF");
      //   series.tooltip.getStrokeFromObject = true;
      //   series.tooltip.background.strokeWidth = 1;
      //   series.tooltip.getFillFromObject = false;
      //   series.fillOpacity = 0.6;
      //   series.strokeWidth = 2;
      //   series.stacked = true;
      // }

      let series;
      let series2;
      let series3;

      if(Object.keys(this.chartDataList2[0]).length>1){
        console.log("@@@@@ "+Object.keys(this.chartDataList2[0])[1]);
        series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.name = Object.keys(this.chartDataList2[0])[1];
        series.dataFields.valueY = Object.keys(this.chartDataList2[0])[1];
        series.tooltipHTML = "<span style='font-size:14px; color:#000000;'><b>{valueY.value}</b></span>";
        series.tooltip.background.fill = am4core2.color("#FFF");
        series.tooltip.getStrokeFromObject = true;
        series.tooltip.background.strokeWidth = 1;
        series.tooltip.getFillFromObject = false;
        series.fillOpacity = 0.6;
        series.strokeWidth = 2;
        series.stacked = true;
      }

      if(Object.keys(this.chartDataList2[0]).length>2){
        console.log("@@@@@ "+Object.keys(this.chartDataList2[0])[2]);
        series2 = chart.series.push(new am4charts.LineSeries());
        series2.name = Object.keys(this.chartDataList2[0])[2];
        series2.dataFields.dateX = "date";
        series2.dataFields.valueY = Object.keys(this.chartDataList2[0])[2];
        series2.tooltipHTML = "<span style='font-size:14px; color:#000000;'><b>{valueY.value}</b></span>";
        series2.tooltip.background.fill = am4core2.color("#FFF");
        series2.tooltip.getFillFromObject = false;
        series2.tooltip.getStrokeFromObject = true;
        series2.tooltip.background.strokeWidth = 1;
        series2.sequencedInterpolation = true;
        series2.fillOpacity = 0.6;
        series2.stacked = true;
        series2.strokeWidth = 2;
      }

      if(Object.keys(this.chartDataList2[0]).length>3){
        series3 = chart.series.push(new am4charts.LineSeries());
        series3.name = Object.keys(this.chartDataList2[0])[2];
        series3.dataFields.dateX = "date";
        series3.dataFields.valueY = Object.keys(this.chartDataList2[0])[3];
        series3.tooltipHTML = "<span style='font-size:14px; color:#000000;'><b>{valueY.value}</b></span>";
        series3.tooltip.background.fill = am4core2.color("#FFF");
        series3.tooltip.getFillFromObject = false;
        series3.tooltip.getStrokeFromObject = true;
        series3.tooltip.background.strokeWidth = 1;
        series3.sequencedInterpolation = true;
        series3.fillOpacity = 0.6;
        series3.defaultState.transitionDuration = 1000;
        series3.stacked = true;
        series3.strokeWidth = 2;
      }
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = dateAxis;

      // Add a legend
      chart.legend = new am4charts.Legend();
      chart.legend.position = "top";
    },
    addNewServer(){
       
      this.$modal.show(PopupAddServer,{
          hot_table : 'data',
          modal : this.$modal },{
          title: 'Server 추가',
          name: 'dynamic-modal',
          width : '300px',
          height : '335px',
          borderRadius : '8px',
          draggable: true,        
      });
    },
    AddOneServer(param){
      this.serverList.push(param);
    },
    delServer(param, hostName, index){
      if(confirm("삭제 하시겠습니까?")){
        // const baseURI = this.srvUrl;
        // this.$http.delete(`${baseURI}/api/v1/management/deleteserver?hostIp=`+param).then((result) => {
        //     console.log(result);
        //     this.serverList.splice(index,1);
        // });    
        const baseURI = this.srvUrl;
        this.$http.delete(`${baseURI}/api/v1/management/server`,{
            headers: {
                'Content-Type': 'application/json'
            },
            data : {
                hostIp : param,
                hostName : hostName
                
            }    
        }).then(function(result){
            console.log(result);
            //console.log(this.serverList);
            this.serverList.splice(index,1);
        }.bind(this));
      }      
    },
    todo(){      
        var test = setInterval(function (){ this.checkHealth() }.bind(this), 30000);
    },
    checkHealth(){
      this.$http.get(this.srvUrl+`/api/v1/management/servertime`)
      .then((result) => {
          // console.log(result);
          this.serverList = result.data;
          this.serverList = this.serverList.slice(0).sort((a, b) => a.lastTime < b.lastTime ? this.sorting : -this.sorting );
      });
    },
    setToken(token){
      const baseURI = this.srvUrl;
      this.$http.post(`${baseURI}/api/v1/logs/admin/token`,{
          token : token
      })
      .then((result) => {
          console.log(result);
      })
      .catch(function(err) {
            //   $.niftyNoty({
            //     type: 'danger',
            //     message : '토큰등록실패 ',
            //     container : 'floating',
            //     timer : 5000
            // });
            console.log(err);
        });    
        
    },
    goToLogViewer(hostName){
      console.log("goToLogViewer > "+hostName);
      this.$EventBus.$emit('buttonClickInMain', hostName);
    }
  },
  mounted(){
    const baseURI = this.srvUrl;
    // this.$http.get(`${baseURI}/api/v1/management/logcount`)
    this.$http.get(`${baseURI}/api/v1/management/servertime`)
    .then((result) => {
        console.log(result);
        this.serverList = result.data;
        this.serverList = this.serverList.slice(0).sort((a, b) => a.lastTime < b.lastTime ? this.sorting : -this.sorting );
        // askForPermissioToReceiveNotifications();
        this.$http.get(`${baseURI}/api/v1/management/datecount`)
        .then((result) => {
            this.chartDataList = result.data;
            this.chartDataList = this.chartDataList.slice(0).sort((a, b) => a.chartDatas[0].count < b.chartDatas[0].count ? -this.sorting : this.sorting );
            console.log(this.chartDataList);
            this.createChart1();

            this.$http.get(`${baseURI}/api/v1/management/keywordcount?hostName=`+this.serverList[0].hostName)
            .then((result) => {
                this.chartDataList2 = result.data;
                console.log(this.chartDataList2);
                this.createChart2();
            })
        });    
    });    

    this.setToken(iamToken);

    this.$EventBus.$on('closeAddModal', this.AddOneServer);

    this.todo();
  },
  create(){
    
  },
  computed : {
   
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
}

</script>

<style scoped>

select {
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  outline: 0;
  box-shadow: none;
  border: 0 !important;
  background: #2E343E;
  background-image: none;
}
/* Custom Select */
.select {
  position: relative;
  display: block;
  width: 100%;
  height: 3em;
  line-height: 3;
  background: #2c3e50;
  overflow: hidden;
  border-radius: .25em;
}
select {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0 0 0 .5em;
  color: #fff;
  cursor: pointer;
}
select::-ms-expand {
  display: none;
}
/* Arrow */
.select::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding: 0 1em;
  background: #34495e;
  pointer-events: none;
}
.select::after {
  -webkit-transition: .25s all ease;
  -o-transition: .25s all ease;
  transition: .25s all ease;
}

#btnGroup {
  width:1340px;
}

#chartGroup {
  width:450px;
  padding : 10px;
  background-color: #04080D;
  height: 820px;

}

div.row-line {
  display:inline-block;
}

div .ht-event-btns {

    display: -webkit-box;
    display: -ms-flexbox;
    /* display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center; */
    justify-content: left;
    display:inline-flex;

    flex-flow:row wrap;
    width: 1300px;
}

div .ht-event-btns .ht-event-btn {

    position: relative;
    width: 240px;
    height: 130px;
    margin: 10px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: height 0.2s ease-out;
    background-color: rgba(0, 0, 0, 0.5);
    background-image: linear-gradient(to bottom, rgba(45,0,140, 0.5), rgba(20,0,51,0.8));

    cursor: pointer;
}

div .ht-event-btns .ht-event-btn .flag {
    background-color: #333;
    width: 80px;
    height: 80px;
    position: absolute;
    top: 0;
    right: 0;
    font-size: 12px;
    border-top-right-radius: 7px;
    background: url(./img/normal_flag.png) no-repeat 0 0;
}

div .ht-event-btns .ht-event-btn .flag.dead {

    width: 80px;
    height: 80px;
    position: absolute;
    top: 0;
    right: 0;
    font-size: 12px;
    border-top-right-radius: 7px;
    background: url(./img/dead_flag.png) no-repeat 0 0;
}

div .ht-event-btns .ht-event-btn .flag span {
    position: absolute;
    top: 15px;
    left: 40px;
    color: #fff;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
}

#aliveText{
  font-size:16px;
  color:white;
}

div .ht-event-btns .ht-event-btn p {

    font-size: 20px;
    text-align: left;
    padding: 25px;
    padding-top: 10px;
    padding-bottom: 0px;
}

div .ht-event-btns .ht-event-btn.stl1 p {
    color: #f8e71c;
}

div .ht-event-btns .ht-event-btn.stl2 p {
    color: #7ed321;
}

div .ht-event-btns .ht-event-btn.stl3 p {
    color: #50E3C2;
}

div .ht-event-btns .ht-event-btn.stl4 p {
    color: #00D1FF;
}

div .ht-event-btns .ht-event-btn.stl5 p {
    color: #F8A1A4;
}

div .ht-event-btns .ht-event-btn.stl6 p {
    color: #BE91D3;
}

div .ht-event-btns .ht-event-btn.stl7 p {
    color: #f8e71c;
}

div .ht-event-btns .ht-event-btn.stl8 p {
    color: #CE9178;
}

div .ht-event-btns .ht-event-btn .subH p{
  font-size:15px;
  color:#ffffff;
  padding-top:0px;
  padding-bottom: 0px;
}

div .ht-event-btns .ht-event-btn .subH.dead p{
  font-size:15px;
  color:grey;
  padding-top:0px;
  padding-bottom: 0px;
}


.loader {
  -webkit-transition: height 1s;
  transition: height 1s;
  -webkit-animation: barberpole 3s linear infinite;
  animation: barberpole 10s linear infinite;
  opacity: 0;
  z-index: 9999;
  height: 5px;
  width: 100%;
  background: white;
  background-size: 100px 100px;
  /*background: linear-gradient(to right,#ff2d55, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55);*/
  background: linear-gradient(to right,#232B99, #AAAEEB, #232B99); /*4CD967*/
}
.loader.loading {
  opacity: 1;
}

.loader.loading.dead {
  opacity: 1;
  /* background: linear-gradient(to right,#D4A0AC, #ED2450, #D4A0AC); */
  background:grey;
}

@-webkit-keyframes barberpole {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 2000px 300px;
  }
}
@keyframes barberpole {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 2000px 300px;
  }
}

#chartdiv {
  width: 100%;
  height: 400px;
}
#chartdiv2 {
  width: 100%;
  height: 400px;
}
</style>
