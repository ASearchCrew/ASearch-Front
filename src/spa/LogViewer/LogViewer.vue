<template>
  <div id="content-container">
    <log-view-head></log-view-head>
    <fixed-bar></fixed-bar>
    <log-view-content></log-view-content>
  </div>
</template>

<script>
import LogViewHead from './LogViewHead.vue'
import Fixedbar from './Fixedbar.vue'
import LogViewContent from './LogViewContent.vue'

export default{
   components:{
     'log-view-head' : LogViewHead,
     'fixed-bar' : Fixedbar,
     'log-view-content' : LogViewContent
   }
}
</script>
