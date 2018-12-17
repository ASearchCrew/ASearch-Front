<template>
<modal name="log-detail-view" transition="pop-out" height="auto"  @before-open="beforeOpen">
    <div class="modal-dialog">
        <div class="modal-content">

            <!--Modal header-->
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" @click="closeByName"><i class="pci-cross pci-circle"></i></button>
                <h4 class="modal-title">LOG DETAIL VIEW</h4>
            </div>

            <!--Modal body-->
            <div class="modal-body">
                <p class="text-semibold text-main">Time</p>
                <p>{{time}}</p>
                <br>
                <p class="text-semibold text-main">Source</p>
                <p>{{logInfo.source}}</p>
                <br>
                <p class="text-semibold text-main">Log Message</p>
                <p>{{logInfo.message}}}</p>
                <br>
            </div>

            <!--Modal footer-->
            <div class="modal-footer">
                <button data-dismiss="modal" class="btn btn-default" type="button" @click="closeByName">Close</button>
            </div>
        </div>
    </div>
</modal>
</template>
<script>
// const MODAL_WIDTH = 656
const MODAL_WIDTH = 800
export default {
  name: 'LogDetailView',
  data () {
    return {
      modalWidth: MODAL_WIDTH,
      logInfo: '',
      time: ''
    }
  },
  created () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? MODAL_WIDTH / 2
      : MODAL_WIDTH
  },
  methods: {
    beforeOpen (event) {
        this.logInfo = event.params.logInfo.data
        this.time = event.params.timeStamp
        console.log(this.logInfo)
    },
    closeByName() {
        this.$modal.hide('log-detail-view'); 
    },
  }
}
</script>
<style scoped>
.modal-title{
    color: black;
}
.modal-content{
 padding: 0 10px;
 background-color: white;
 color: black;
}
.pop-out-enter-active,
.pop-out-leave-active {
  transition: all 0.5s;
}
.pop-out-enter,
.pop-out-leave-active {
  opacity: 0;
  transform: translateY(24px);
} 
</style>
