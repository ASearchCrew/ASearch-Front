<template>
    <div class="mychartdiv" id="chartdiv">
    </div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";

am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_kelly);
export default {
    name: 'countChart',
    data() {
      return {
        data: [],
        isClicked: false
      }
    },
    mounted : async function() {
      //streaming 여부 체크
      this.$EventBus.$on('stream', function(isClicked) {
        this.isClicked = isClicked
      }.bind(this));

      var vm = this;
      await vm.$http.get('/api/v1/management/logcount/hour/minute')
      .then((result) => {
        console.log(result);
        var tmp = result.data.charDatas;
        for(let i = 0; i < tmp.length ; i++){
          var curTime = new Date(tmp[i].endTime.toString());
          var curHour = curTime.getHours();
          var curMin = curTime.getMinutes();
          var tmpTime = curHour + ':' + (curMin<10?'0' + curMin:curMin);
          // if(curHour == 0){
            var dateTime = new Date(tmp[i].endTime);
            var date = dateTime.getFullYear() + '-' + (dateTime.getMonth() + 1) + '-' + dateTime.getDate();
            this.data.unshift({ time: (date + ' ' + tmpTime), count: tmp[i].logCount});
          // }else{
          //   this.data.unshift({ time: tmpTime, count: tmp[i].logCount});
          // }
        }
      })

      // Create chart instance
      var chart = am4core.create("chartdiv", am4charts.XYChart);

      // Add data
      chart.data = this.data;
      console.log(chart.data)

      // Create axes
      var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "time";
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();

      if(dd<10) {
          dd='0'+dd
      } 

      if(mm<10) {
          mm='0'+mm
      } 

      today = mm+'/'+dd+'/'+yyyy;
      categoryAxis.title.text = "Date & Time";

      // First value axis
      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = "Count (LOG)";

      // First series
      var series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "count";
      series.dataFields.categoryX = "time";
      series.name = "Count";
      series.tooltipText = "{name}: [bold]{valueY}[/]";
      series.columns.template.events.on("hit", function(ev) {
        console.log("clicked on ", ev.target.dataItem);
        console.log(ev.target.dataItem.categoryX)

        if(!vm.isClicked){
          vm.$EventBus.$emit('chartTimeClicked', ev.target.dataItem.categoryX)
        }
      }, this);

/* -------------------------------------------------------------------------------- */
      document.addEventListener("visibilitychange", function() {
          if (document.hidden) {
              if (interval) {
                  clearInterval(interval);
              }
          }
          else {
              startInterval();
          }
      }, false);

      // add data
      var interval;
      function startInterval() {
          interval = setInterval(async function() {
              await vm.$http.get('/api/v1/management/logcount/hour/minute')
              .then((result) => {
                // console.log(result);
                var tmp = result.data.charDatas;
                for(let i = tmp.length - 1; i >= 0; i--){
                  var curTime = new Date(tmp[i].endTime.toString());
                  var curHour = curTime.getHours();
                  var curMin = curTime.getMinutes();
                  var tmpTime = curHour + ':' + (curMin<10?'0' + curMin:curMin);
                  // if(curHour == 0){
                    var dateTime = new Date(tmp[i].endTime);
                    var date = dateTime.getFullYear() + '-' + (dateTime.getMonth() + 1) + '-' + dateTime.getDate();
                    chart.addData({ time: (date + ' ' + tmpTime), count: tmp[i].logCount}, 1);
                  // }else{
                  //   chart.addData({ time: tmpTime, count: tmp[i].logCount}, 1);
                  // }
                }
              })
          }, 3000);
      }

      startInterval();
/* -------------------------------------------------------------------------------- */
      // Second series
      var series2 = chart.series.push(new am4charts.LineSeries());
      series2.dataFields.valueY = "count";
      series2.dataFields.categoryX = "time";
      series2.name = "Count";
      series2.tooltipText = "{name}: [bold]{valueY}[/]";
      series2.strokeWidth = 3;
      series2.yAxis = valueAxis;

      // Add legend
      // chart.legend = new am4charts.Legend();

      // Add cursor
      chart.cursor = new am4charts.XYCursor();
    },

    beforeDestroy() {
      if (this.chart) {
        this.chart.dispose();
      }
    }
}
</script>

<style scoped>
    .mychartdiv {
        height:280px;
        margin-left: 240px;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
      font-size: 9pt;
    }

</style>
