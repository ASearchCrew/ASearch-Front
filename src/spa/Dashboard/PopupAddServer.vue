<template ref="popup">
<div style="" class="panel">
    <div class="panel-body" style="padding:15px">
        <div><h4 style="margin-top:0px">Add Server</h4></div>
        <div class="progress progress-xs" style="background-color:#D4D4D4; margin-top:2px;"></div>
        <div class="form-group">
            <label class="control-label">Host Name</label>
            <input v-model="hostName" class="form-control"/>
        </div>
        <div class="form-group">
            <label class="control-label">Host Ip</label>
            <input v-model="hostIp" class="form-control"/>
        </div>
        <div class="form-group">
            <label class="control-label">Interval (min)</label>
            <input type="number" v-model="interval" class="form-control"/>
        </div>



    </div>
    <div class="panel-footer text-right">
        <button class="btn btn-primary" @click="addServer()">Save</button>
        <button style="margin-left:10px;" class="btn btn-primary" @click="$emit('close')">Cancel</button>
    </div>
</div>
</template>

<script>
export default {
  data:function(){
      return {
          hostName:"",
          hostIp:"",
          interval:"",
          addEventFlag: false
      }
  },
  props : {
  },
  methods : {
    addServer(){
        const baseURI = 'http://192.168.0.11:8080';
        this.$http.post(`${baseURI}/api/v1/management/server`,{
            hostName : this.hostName,
            hostIp : this.hostIp,
            interval : this.interval*60000

        }).then(function(data){
            $.niftyNoty({
                type: 'success',
                message : '<p style="font-size:20px;">Server <strong>[ '+this.hostName +' ]</strong> save success!<p>',
                container : 'floating',
                timer : 5000
            });
            this.addEventFlag =true;
            this.$emit('close');
            
        }.bind(this));       
    }
  },
  beforeDestroy(){
    if(this.addEventFlag){
        var serverParam = {"hostName":this.hostName, "hostIp":this.hostIp, "interval":this.interval, "lastTime":9999, "timeStamp":"Exception"};
            
        this.$EventBus.$emit('closeAddModal',serverParam);
    }
    
    // this.$emit('update:visibleModal', false);
  },
  mounted(){
  }
}
</script>