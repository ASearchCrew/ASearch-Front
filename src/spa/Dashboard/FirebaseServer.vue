<template>
<div id="content-container">
    <div style="padding:60px; background-color:balck">
        <button @click="signUp">signUp</button>
    </div>
    
</div>

</template>

<script>
import {askForPermissioToReceiveNotifications} from '../../../public/js/push-notification';

export default {
  data:function(){
      return {
      }
  },
  props : {
  },
  methods : {
    signUp(){
        askForPermissioToReceiveNotifications();
    }
  },
  mounted() {
  },
}
</script>