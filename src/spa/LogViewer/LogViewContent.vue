<template>
    <!--Page content-->
    <!--===================================================-->
    <div id="page-content">
        <div class="msIpy">
            <div class="kJLsxp">
                <div class="cSbckb" style="height: 540px; width: 100%;" >
                  <div class="nano">
                    <div id="log-contents" class="nano-content" @mousewheel="moveWheel">
                    <!-- <transition-group name="list" tag="ul" class="timeline-custom">
                        <li v-for="result in results" style="height:auto" :key="result.id" @mouseover="mouseInCell" @mouseout="mouseOutCell">
                            <div class="timeline-time-custom" scale="medium">{{ result.timeStamp }}</div>
                            <div class="timeline-icon-custom"><a href="#"></a></div>
                            <div class="timeline-body-custom" scale="medium" v-on:click="showDetail(result.id)>{{ result.message }}</div>
                        </li>
                    </transition-group> -->
                      <div v-if="!isBeforeData" id="noDataOnTop">No additional entries found, Wheel up again!</div>
                      <ul v-if="!noData" id="log" class="timeline-custom">
                        <li v-for="result in results" style="height:auto" :key="result.id" @mouseover="mouseInCell" @mouseout="mouseOutCell">
                            <div class="timeline-time-custom" scale="medium">
                              {{ new Date(result.timeStamp).toLocaleString() + '.' + new Date(result.timeStamp).getMilliseconds()}}
                            </div>
                            <div class="timeline-icon-custom"><a href="#"></a></div>
                            <div class="timeline-body-custom" v-bind:class="{ 'noWrapping': !isChecked }" scale="medium" v-on:click="showDetail(result.id, result.timeStamp)">{{ result.message }}</div>
                        </li>
                      </ul>
                      <div v-if="!isAfterData" id="noDataOnBottom">No additional entries found, Wheel down again!</div>
                      
                      <!-- <div v-else> -->
                      <div v-if="noData" class="cls-container">
                        <div  class="cls-content">
                            <h1 class="error-code text-info">404</h1>
                            <p class="h4 text-uppercase text-bold">There is no data!</p>
                            <div class="pad-btm">
                                Sorry, but the page you are looking for has not been found on our server.
                            </div>
                            <!-- <div class="row mar-ver">
                                <form class="col-xs-12 col-sm-10 col-sm-offset-1" method="post" action="pages-search-results.html">
                                    <input type="text" placeholder="Search.." class="form-control error-search">
                                </form>
                            </div> -->
                            <hr class="new-section-sm bord-no">
                            <div class="pad-top"><a class="btn btn-primary" href="index.html">Return Home</a></div>
                        </div>
                      </div>
                      <!-- </div> -->
                      <log-detail-view />
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
    <!--===================================================-->
    <!--End page content-->
</template>
<script>
import LogDetailView from './LogDetailView.vue'

export default {
  components: {
    LogDetailView
  },
  data() {
    return {
      query: '',
      hostName: 'filebeat',
      calendarEndTime: null,
      time: null,
      results: [],
      isClicked: false,
      isChecked: true,
      interval: null,
      tmp: [],
      dateReceived: true,
      count: 0,
      offset: 0,
      isBeforeData: true,
      isAfterData: true,
      noData: false,
    }
  },
  created() {
    // 초기 로그 요청
    this.initRequest();
  },
  mounted() {
    // Stream 버튼 클릭 시 스트리밍 실행 / 정지
    this.$EventBus.$on('stream', function(isClicked) {
      this.isClicked = isClicked
      console.log(this.isClicked)
      this.isClicked ? this.startStream() : this.stopStream()
    }.bind(this));
    
    // 사용자가 Search Keywork 입력 시, query setting
    this.$EventBus.$on('sendQuery', this.setQuery);
    // 사용자가 날짜&시간 선택 시, time setting
    this.$EventBus.$on('sendTime', this.setTime);
    // 사용자가 날짜&시간 초기화 시, 다시 initRequest
    this.$EventBus.$on('initRequest', this.initRequest);


    // text size 변경
    this.$EventBus.$on('textSizeChangeReq', this.textSizeChanged);
    // Wrap Long Lines check
    this.$EventBus.$on('wrapLongLines', this.wrapLongLines);

    // ServerList 버튼 클릭(hostName 셋팅)
    this.$EventBus.$on('serverButtonClicked', function(hostName) {
      console.log(hostName)
      this.hostName = hostName;
      
      console.log(this.hostName)
      
      this.initRequest();
    }.bind(this));
  },
  beforeDestroy() {
    clearInterval(this.interval)
    this.interval = null
  },
  methods: {
    wrapLongLines(isChecked){
      this.isChecked = isChecked;
    },
    textSizeChanged(size) {
      if(size == 'small'){
        document.getElementById('log').classList.add('font-small');
        document.getElementById('log').classList.remove('font-medium');
        document.getElementById('log').classList.remove('font-large');
      }else if(size == 'medium'){
        document.getElementById('log').classList.remove('font-small');
        document.getElementById('log').classList.add('font-medium');
        document.getElementById('log').classList.remove('font-large');
      }else if(size == 'large'){
        document.getElementById('log').classList.remove('font-small');
        document.getElementById('log').classList.remove('font-medium');
        document.getElementById('log').classList.add('font-large');
      }
    },
    show () {
      this.$modal.show('hello-world');
    },
    hide () {
      this.$modal.hide('hello-world');
    },
    async moveWheel(event){
      if(this.results.length <= 0)
        return;

      var container = document.querySelector(".timeline-custom");
      var entScrollHeight = container.scrollHeight;
      var curScrollHeight = $("#log-contents").scrollTop();
      var offset = $("#log-contents").outerHeight();
      var beforeHeight;
      
      console.log('entScrollHeight = ' + entScrollHeight)
      console.log('curScrollHeight = ' + curScrollHeight)
      console.log('offset = ' + offset)
      //scroll Up
      if(curScrollHeight === 0 && event.wheelDelta > 0 && this.dateReceived && !this.isClicked){
        console.log('over Wheel Up');
        beforeHeight = entScrollHeight;

        var t = new Date(this.results[0].timeStamp)
        var myDate = t.getTime();
        var id = this.results[0].id;
        this.offset++;
        let config = this.query.length > 0 ? {
          params: {
            direction: 'up',
            time: myDate,
            isStream: false,
            search: this.query,
            initialCount: this.count,
            upScrollOffset: this.offset,
            hostName: this.hostName,
            id: id
          }
        }:{
          params: {
            direction: 'up',
            isStream: false,
            time: myDate,
            initialCount: this.count,
            upScrollOffset: this.offset,
            hostName: this.hostName,
            id: id
          }
        }
        this.dateReceived = false
        await this.$http.get('/api/v1/logs', config)
        .then((result) => {
          this.tmp = result.data.logs;
          if(this.tmp.length > 0){
            this.isBeforeData = true;
          }else{
            this.isBeforeData = false;
            this.dateReceived = true;
            return;
          }
          this.count = result.data.sumCount;
          for(var i = 0; i < this.tmp.length; i++){
            this.results.unshift(this.tmp[i]);
          }
          console.log(this.tmp)
          this.dateReceived = true;
        })
        
        $("#log-contents").scrollTop(container.scrollHeight - beforeHeight);
      }
      
      //scroll Down
      if(offset + curScrollHeight >= entScrollHeight && event.wheelDelta < 0 && this.dateReceived && !this.isClicked){
        console.log('over Wheel Down');
        var t = new Date(this.results[this.results.length-1].timeStamp)
        var myDate = t.getTime();
        var id = this.results[this.results.length-1].id;
        this.offset--;  
        let config = this.query.length > 0 ? {
          params: {
            direction: 'down',
            time: myDate,
            isStream: false,
            search: this.query,
            initialCount: this.count,
            upScrollOffset: this.offset,
            hostName: this.hostName,
            id: id
          }
        }:{
          params: {
            direction: 'down',
            isStream: false,
            time: myDate,
            initialCount: this.count,
            upScrollOffset: this.offset,
            hostName: this.hostName,
            id: id
          }
        }
        this.dateReceived = false
        await this.$http.get('/api/v1/logs', config)
        .then((result) => {
          this.tmp = result.data.logs;
          this.count = result.data.sumCount;
          if(this.tmp.length > 0){
            this.isAfterData = true;
          }else{
            this.isAfterData = false;
            this.dateReceived = true;
            return;
          }
          for(var i = 0; i < this.tmp.length; i++){
            this.results.push(this.tmp[i]);
          }
          console.log(this.tmp)
          this.dateReceived = true;
        })
      }
    },
    showDetail(id, timeStamp){
      this.$http.get(`/api/v1/logs/${id}`)
      .then((result) => {
        console.log(result);
        this.$modal.show('log-detail-view', { 'logInfo': result, 'timeStamp': timeStamp})
      })
    },
    mouseInCell(event){
      // console.log(event.currentTarget.childNodes[2].style);
      event.currentTarget.childNodes[0].style.fontWeight="bold";
      event.currentTarget.childNodes[2].style.fontWeight="bold";
      event.currentTarget.childNodes[2].style.cursor="pointer";
      
      event.currentTarget.childNodes[1].childNodes[0].style.backgroundColor='#fffddb';
      event.currentTarget.childNodes[2].style.backgroundColor='#fffddb';
      event.currentTarget.childNodes[2].style.overflow='auto';
      event.currentTarget.childNodes[2].style.textOverflow='clip';
      event.currentTarget.childNodes[2].style.whiteSpace='normal';
    },
    mouseOutCell(event){
      event.currentTarget.childNodes[0].style.fontWeight='';
      event.currentTarget.childNodes[2].style.fontWeight='';
      
      event.currentTarget.childNodes[1].childNodes[0].style.backgroundColor='';
      event.currentTarget.childNodes[2].style.backgroundColor='';
      event.currentTarget.childNodes[2].style.overflow='';
      event.currentTarget.childNodes[2].style.textOverflow='';
      event.currentTarget.childNodes[2].style.whiteSpace='';
    },
    initRequest: async function() {
      var t = new Date();
      var myDate = t.getTime();
      let config = this.query.length > 0 ? {
        params: {
          direction: 'center',
          time: myDate,
          isStream: false,
          search: this.query,
          initialCount: 0,
          upScrollOffset: 0,
          hostName: this.hostName
        }
      }:{
        params: {
          direction: 'center',
          time: myDate,
          isStream: false,
          initialCount: 0,
          upScrollOffset: 0,
          hostName: this.hostName
        }
      }
      await this.$http.get('/api/v1/logs', config)
      .then((result) => {
        console.log(result);
        this.tmp = result.data.logs;
        if(this.tmp.length > 0){
          this.noData = false;
        }else{
          this.noData = true;
          return;
        }
        this.results = [];
        for(var i = 0; i < this.tmp.length; i++){
          this.results.unshift(this.tmp[i]);
        }
        console.log(this.results)
        this.count = result.data.sumCount;
      })
      this.scrollToEnd();
    },
    requestStream: async function() {
      var t = new Date(this.results[this.results.length-1].timeStamp)
      var myDate = t.getTime();
      var id = this.results[this.results.length-1].id;
      await this.$http.get('/api/v1/logs', {
        params: {
          direction: 'stream',
          isStream: true,
          time: myDate,
          initialCount: 0,
          upScrollOffset: 0,
          hostName: this.hostName,
          id: id
        }
      })
      .then((result) => {
        this.tmp = result.data.logs;
        this.count = result.data.sumCount;
        console.log(this.tmp)
        if(this.tmp.length < 100){
          for(var i = 0; i < this.tmp.length; i++){
            this.results.push(this.tmp[i]);
          }
        }else{
          this.results = this.tmp;
        }
        
      })
      if(this.isClicked)
        this.scrollToEnd();
    },
    startStream: async function() {
      var t = new Date();
      var myDate = t.getTime();
      let config = this.query.length > 0 ? {
        params: {
          direction: 'center',
          time: myDate,
          isStream: true,
          search: this.query,
          initialCount: 0,
          upScrollOffset: 0,
          hostName: this.hostName
        }
      }:{
        params: {
          direction: 'center',
          time: myDate,
          isStream: true,
          initialCount: 0,
          upScrollOffset: 0,
          hostName: this.hostName
        }
      }
      await this.$http.get('/api/v1/logs', config)
      .then((result) => {
        this.tmp = result.data.logs;
        this.results = [];
        if(this.tmp.length > 0){
          this.noData = false;
        }else{
          this.noData = true;
          return;
        }
        for(var i = 0; i < this.tmp.length; i++){
          this.results.unshift(this.tmp[i]);
        }
        console.log(this.results)
        this.count = result.data.sumCount;
        this.scrollToEnd();
      })
      
      this.interval = setInterval(this.requestStream, 3000)
    },
    stopStream: function() {
      clearInterval(this.interval)
    },
    async setQuery(query) {
      this.query = query;
      // var t = new Date(this.results[this.results.length-1].timeStamp)
      var myDate = (new Date()).getTime();
      let config = this.query.length > 0 ? {
        params: {
          direction: 'center',
          time: myDate,
          isStream: false,
          search: this.query,
          initialCount: this.count,
          upScrollOffset: 0,
          hostName: this.hostName
        }
      }:{
        params: {
          direction: 'center',
          isStream: false,
          time: myDate,
          initialCount: this.count,
          upScrollOffset: 0,
          hostName: this.hostName
        }
      }
      await this.$http.get('/api/v1/logs', config)
      .then((result) => {
        console.log(result);
        this.tmp = result.data.logs;
        if(this.tmp.length > 0){
          this.noData = false;
        }else{
          this.noData = true;
          return;
        }
        this.results = [];
        for(var i = 0; i < this.tmp.length; i++){
          this.results.unshift(this.tmp[i])
        }
        this.count = result.data.sumCount;
      })
      if(!this.noData)
        this.scrollToEnd();
    },
    async setTime(time) {
      this.time = time;
      var today = new Date(this.time);
      this.calendarEndTime = new Date(today.getFullYear(), (today.getMonth()), today.getDate()).getTime();
      this.query = query;
      console.log(this.time)
      var myDate = (new Date(this.time)).getTime();
      let config = this.query.length > 0 ? {
        params: {
          direction: 'center',
          time: myDate,
          calendarEndTime : this.calendarEndTime,
          isStream: false,
          initialCount: this.count,
          upScrollOffset: 0,
          hostName: this.hostName,
          search: this.query
        }
      }:{
        params: {
          direction: 'center',
          time: myDate,
          calendarEndTime : this.calendarEndTime,
          isStream: false,
          initialCount: this.count,
          upScrollOffset: 0,
          hostName: this.hostName
        }
      }
      await this.$http.get('/api/v1/logs', config)
      .then((result) => {
        console.log(result);
        this.tmp = result.data.logs;
        if(this.tmp.length > 0){
          this.noData = false;
        }else{
          this.noData = true;
          return;
        }
        this.results = [];
        for(var i = 0; i < this.tmp.length; i++){
          this.results.unshift(this.tmp[i])
        }
        this.count = result.data.sumCount;
      })
      if(!this.noData)
        this.scrollToEnd();
    },
    scrollToEnd() {
      var container = document.querySelector(".timeline-custom");
      var entScrollHeight = container.scrollHeight;
      $("#log-contents").scrollTop(entScrollHeight);
    },
    beforeEnter: function(el) {
      el.style.opacity = 0
      el.style.height = 0
    },
    enter: function(el, done) {
      var delay = el.dataset.index * 150
      setTimeout(function() {
        Velocity(
          el,
          { opacity: 1, height: '1.6em' },
          { complete: done }
        )
      }, delay)
    },
    leave: function(el, done) {
      var delay = el.dataset.index * 150
      setTimeout(function() {
        Velocity(
          el,
          { opacity: 0, height: 0 },
          { complete: done }
        )
      }, delay)
    }
  }
}
</script>
<style scoped>
/* .jyzsZJ {
  background-color: #ff0000;
} */
.msIpy {
    display: flex;
    flex-direction: row;
    /* background-color: rgb(255, 255, 255); */
    flex: 1 0 0%;
}
.kJLsxp {
    display: flex;
    flex-direction: column;
    flex: 1 0 0%;
    overflow: hidden;
}
.cSbckb {
    overflow-x: hidden;
    overflow-y: hidden;
    position: relative;
    /* padding-right: 20px; */
}
.cSbckb * {
    overflow-anchor: none;
}
.eBjuvI {
    display: grid;
    grid-template-columns: 1fr 4fr;
    font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
    color: rgb(45, 45, 45);
    /* display: flex; */
    flex-direction: row;
    flex-wrap: nowrap;
    -webkit-box-pack: start;
    justify-content: flex-start;
    -webkit-box-align: stretch;
    align-items: stretch;
    overflow: hidden;
    cursor:pointer;
}
.iMKTAC {
    font-size: 14px;
    line-height: 1.5;
    background-color: rgb(245, 245, 245);
    color: rgb(102, 102, 102);
    /* white-space: pre; */
    padding: 2px 16px;
    border-right: 2px solid rgb(217, 217, 217);
}
.jyzsZJ {
    font-size: 14px;
    line-height: 1.5;
    -webkit-box-flex: 1;
    flex-grow: 1;
    text-overflow: ellipsis;
    background-color: rgb(255, 255, 255);
    white-space: pre-wrap;
    padding: 2px 16px;
    overflow: visible;
}
.list-item {
  display: inline-block;
  margin-right: 0;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
#page-content {
    padding: 0;
}
/* ----------------------------------------------- */
.timeline-custom {
    list-style-type: none;
    margin: 0;
    padding: 0;
    position: relative;
}
.timeline-custom>li {
    position: relative;
    min-height: 50px;
    padding: 5px 0;
}
.timeline-custom .timeline-time-custom {
    position: absolute;
    left: 0;
    width: 13%;
    text-align: right;
    top: 20px;
    color: white;
    overflow: hidden; 
    text-overflow: ellipsis;
    white-space: nowrap; 
}
.timeline-custom .timeline-icon-custom {
    left: 10%;
    position: absolute;
    width: 10%;
    text-align: center;
    top: 20px;
}
.timeline-custom .timeline-icon-custom a {
    text-decoration: none;
    width: 20px;
    height: 20px;
    display: inline-block;
    border-radius: 20px;
    background: #d9e0e7;
    line-height: 10px;
    color: #fff;
    font-size: 14px;
    border: 5px solid black;
    transition: border-color .2s linear;
}
.timeline-custom .timeline-body-custom {
    margin-left: 17%;
    margin-right: 1%;
    background: #fff;
    position: relative;
    padding: 20px 25px;
    border-radius: 6px;
    /* border: 1px solid gray; */
    color: black;
    overflow: hidden; 
    text-overflow: ellipsis;
    white-space: nowrap; 
}
.timeline-custom:before {
  content: '';
  position: absolute;
  top: 5px;
  bottom: 5px;
  width: 5px;
  background: black;
  left: 15%;
  margin-left: -2.5px;
}
*, ::after, ::before {
    box-sizing: border-box;
}

#noDataOnTop {
  padding: 5px;
  font-size: 14px;
  text-align: center;
}

#noDataOnBottom {
  padding: 5px;
  font-size: 14px;
  text-align: center;
}




.font-small {
  font-size: 0.7em;
}
.font-medium {
  font-size: 1em;
}
.font-large {
  font-size: 1.3em;
}
.timeline-custom .noWrapping {
  overflow: auto; 
  text-overflow: clip;
  white-space: 	normal; 
}
</style>