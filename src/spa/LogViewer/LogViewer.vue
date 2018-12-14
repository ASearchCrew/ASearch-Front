<template>
  <div id="content-container">
    <log-view-head></log-view-head>
    <fixed-bar></fixed-bar>
    <progress-bar></progress-bar>
    <count-chart></count-chart>
    <log-view-content></log-view-content>
  </div>
</template>

<script>
import LogViewHead from './LogViewHead.vue'
import Fixedbar from './Fixedbar.vue'
import LogViewContent from './LogViewContent.vue'
import ProgressBar from './ProgressBar.vue'
import CountChart from './countChart.vue'

export default{
   components:{
     'log-view-head' : LogViewHead,
     'fixed-bar' : Fixedbar,
     'log-view-content' : LogViewContent,
     'progress-bar' : ProgressBar,
     'count-chart' : CountChart
   }
}
</script>
