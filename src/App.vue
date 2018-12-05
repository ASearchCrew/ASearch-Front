<template>
  <div id="container" class="effect aside-float aside-bright mainnav-sm page-fixedbar">
    <my-header></my-header>
    <div class="boxed">

      <router-view></router-view>

      <main-nav></main-nav>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyHeader from './shared-components/Header.vue'
import MainNav from './shared-components/MainNav.vue'
import MyFooter from './shared-components/Footer.vue'

export default {
  name: 'app',
  components: {
    MyHeader,
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
