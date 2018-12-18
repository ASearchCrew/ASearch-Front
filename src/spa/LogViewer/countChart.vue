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
      }
    },
    mounted : async function() {
      await this.$http.get('/api/v1/management/logcount/hour/minute')
      .then((result) => {
        // console.log(result);
        var tmp = result.data.charDatas;
        var startTime = new Date(tmp[tmp.length - 1].endTime);
        var start = startTime.getFullYear() + '-' + startTime.getMonth() + '-' + startTime.getDate();
        console.log(start)
        this.data.unshift({ time: start, count: tmp[0].logCount});
        for(let i = 0; i < tmp.length - 1; i++){
          this.data.unshift({ time: tmp[i].endTime, count: tmp[i].logCount});
        }
        // console.log(this.data)
      })

      // Create chart instance
      var chart = am4core.create("chartdiv", am4charts.XYChart);

      // Add data
      chart.data = this.data;
      console.log(chart.data)

      // Create axes
      var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "time";
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
        console.log("clicked on ", ev.target);
        console.log(ev.target.dataItem.categoryX)
      }, this);
      // series.columns.template.events.on("propertychanged", function(ev) {
      //   if(ev.property.indexOf("x") > 0){
      //     console.log(ev.property)
      //   }
      // }, this);

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
