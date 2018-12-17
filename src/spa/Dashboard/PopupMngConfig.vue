<template ref="popup">
<div style="" class="panel">
    <div class="panel-body" style="padding:15px">
        <div class="form-group">
            <label class="control-label">Path</label>
            <input v-model="inputPath" class="form-control"/>
        </div>

    </div>
    <div class="panel-footer text-right">
        <button class="btn btn-primary" @click="updatePath()">Save</button>
        <button style="margin-left:10px;" class="btn btn-primary" @click="$emit('close')">Cancel</button>
    </div>
</div>
</template>

<script>
export default {
  data:function(){
      return {
          inputPath:"",
          srvUrl : 'http://192.168.0.7:8080'
      }
  },
  props : {
  },
  methods : {
    updatePath(){
        var paramPath = this.inputPath.split('/').join('%2F');
        console.log(paramPath);

        const baseURI = this.srvUrl;
        this.$http.put(`${baseURI}/api/v1/management/filebeat/conf?path=`+paramPath
        ).then(function(data){
            console.log(data);

            $.niftyNoty({
                type: 'success',
                message : '<p style="font-size:20px;">Configration <strong>[ '+this.inputPath +' ]</strong> modify success!<p>',
                container : 'floating',
                timer : 5000
            });
            this.$emit('close');
        }.bind(this));       
    }
  },
  beforeDestroy(){
    // if(this.addEventFlag){
    //     var serverParam = {"host_name":this.hostName, "host_ip":this.hostIp, "lasttime":9999, "timestamp":"Exception"};
            
    //     this.$EventBus.$emit('closeAddModal',serverParam);
    // }
    
    // this.$emit('update:visibleModal', false);
  }
}
</script>