<template>
  <div id="container" class="effect aside-float aside-bright mainnav-sm page-fixedbar">
    <my-header></my-header>
    <div class="boxed">
      <div id="content-container">
        <log-view-head></log-view-head>
        <fixedbar></fixedbar>
        <log-view-content></log-view-content>
      </div>
      <main-nav></main-nav>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyHeader from './components/Header.vue'
import LogViewHead from './components/LogViewHead.vue'
import Fixedbar from './components/Fixedbar.vue'
import LogViewContent from './components/LogViewContent.vue'
import MainNav from './components/MainNav.vue'
import MyFooter from './components/Footer.vue'

export default {
  name: 'app',
  components: {
    MyHeader,
    LogViewHead,
    Fixedbar,
    LogViewContent,
    MainNav,
    MyFooter
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
