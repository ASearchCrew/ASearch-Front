<template>
    <!--Page content-->
    <!--===================================================-->
    <div id="page-content">
        <div class="msIpy">
            <div class="kJLsxp">
                <div class="cSbckb" style="height: 540px; width: 100%;" @mousewheel="moveWheel">
                  <div class="nano">
                    <div class="nano-content">
                    <!-- <transition-group name="list" tag="ul" class="timeline-custom">
                        <li v-for="result in results" style="height:auto" :key="result.id" @mouseover="mouseInCell" @mouseout="mouseOutCell">
                            <div class="timeline-time-custom" scale="medium">{{ result.timeStamp }}</div>
                            <div class="timeline-icon-custom"><a href="#"></a></div>
                            <div class="timeline-body-custom" scale="medium" v-on:click="showDetail(result.id)>{{ result.message }}</div>
                        </li>
                    </transition-group> -->
                      <ul class="timeline-custom">
                          <li v-for="result in results" style="height:auto" :key="result.id" @mouseover="mouseInCell" @mouseout="mouseOutCell">
                              <div class="timeline-time-custom" scale="medium">{{ result.timeStamp }}</div>
                              <div class="timeline-icon-custom"><a href="#"></a></div>
                              <div class="timeline-body-custom" scale="medium" v-on:click="showDetail(result.id)">{{ result.message }}</div>
                          </li>
                      </ul>
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
export default {
  data() {
    return {
      query: '',
      time: null,
      results: [],
      isClicked: false,
      interval: null,
      tmp: [],
      dateReceived: true,
      count: 0,
      offset: 0
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
  },
  beforeDestroy() {
    clearInterval(this.interval)
    this.interval = null
  },
  methods: {
    async moveWheel(event){
      var container = document.querySelector(".cSbckb");
      var entScrollHeight = container.scrollHeight;
      var curScrollHeight = container.scrollTop;
      var offset = container.offsetHeight;
      
      //scroll Up
      if(curScrollHeight === 0 && event.wheelDelta > 0 && this.dateReceived){
        console.log('over Wheel Up');
        var t = new Date(this.results[0].timeStamp)
        var myDate = t.getTime();
        console.log(this.query);
        this.offset++;
        let config = this.query.length > 0 ? {
          params: {
            direction: 'up',
            time: myDate,
            isStream: false,
            search: this.query,
            initialCount: this.count,
            upScrollOffset: this.offset,
            hostName: 'filebeat'
          }
        }:{
          params: {
            direction: 'up',
            isStream: false,
            time: myDate,
            initialCount: this.count,
            upScrollOffset: this.offset,
            hostName: 'filebeat'
          }
        }
        this.dateReceived = false
        await this.$http.get('/api/v1/log', config)
        .then((result) => {
          console.log(result)
          this.tmp = result.data.logs;
          this.count = result.data.sumCount;
          for(var i = 0; i < this.tmp.length; i++){
            this.results.unshift(this.tmp[i]);
          }
          console.log(this.tmp)
          this.dateReceived = !this.dateReceived
        })
      }
      //scroll Down
      if(offset + curScrollHeight === entScrollHeight && event.wheelDelta < 0 && this.dateReceived){
        console.log('over Wheel Down');
        var t = new Date(this.results[this.results.length-1].timeStamp)
        var myDate = t.getTime();
        console.log(this.query);
        this.offset--;  
        let config = this.query.length > 0 ? {
          params: {
            direction: 'down',
            time: myDate,
            isStream: false,
            search: this.query,
            initialCount: this.count,
            offset: this.offset
          }
        }:{
          params: {
            direction: 'down',
            isStream: false,
            time: myDate,
            initialCount: this.count,
            offset: this.offset
          }
        }
        this.dateReceived = false
        await this.$http.get('/api/v1/log', config)
        .then((result) => {
          this.tmp = result.data.logs;
          this.count = result.data.sumCount;
          for(var i = 0; i < this.tmp.length; i++){
            this.results.push(this.tmp[i]);
          }
          console.log(this.tmp)
          this.dateReceived = !this.dateReceived
        })
      }
    },
    showDetail(id){
      this.$http.get(`/api/v1/log/${id}`)
      .then((result) => {
        console.log(result);
      })
    },
    mouseInCell(event){
      // console.log(event.currentTarget.childNodes[2].style);
      event.currentTarget.childNodes[0].style.fontWeight="bold";
      event.currentTarget.childNodes[2].style.fontWeight="bold";
      
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
          hostName: 'filebeat'
        }
      }:{
        params: {
          direction: 'center',
          time: myDate,
          isStream: false,
          initialCount: 0,
          upScrollOffset: 0,
          hostName: 'filebeat'
        }
      }
      await this.$http.get('/api/v1/log', config)
      .then((result) => {
        console.log(result);
        this.results = result.data.logs;
        this.count = result.data.sumCount;
      })
      this.scrollToEnd();
    },
    requestStream: async function() {
        var t = new Date(this.results[this.results.length-1].timeStamp)
        var myDate = t.getTime();
      await this.$http.get('/api/v1/log', {
        params: {
          direction: 'down',
          isStream: true,
          time: myDate
        }
      })
      .then((result) => {
        console.log(result);
        this.tmp = result.data.logs;
        this.count = result.data.sumCount;
        for(var i = 0; i < this.tmp.length; i++){
          this.results.push(this.tmp[i]);
        }
        console.log(this.tmp)
      })
      if(this.isClicked)
        this.scrollToEnd();
    },
    startStream: function() {
      this.interval = setInterval(this.requestStream, 3000)
    },
    stopStream: function() {
      clearInterval(this.interval)
    },
    async setQuery(query) {
      this.query = query;
      var t = new Date(this.results[this.results.length-1].timeStamp)
      var myDate = t.getTime();
      let config = this.query.length > 0 ? {
        params: {
          direction: 'center',
          time: myDate,
          isStream: false,
          search: this.query,
          initialCount: this.count,
          upScrollOffset: 0
        }
      }:{
        params: {
          direction: 'center',
          isStream: false,
          time: myDate,
          initialCount: this.count,
          upScrollOffset: 0
        }
      }
      await this.$http.get('/api/v1/log', config)
      .then((result) => {
        console.log(result);
        this.results = result.data.logs;
        this.count = result.data.sumCount;
        console.log('sumcount : ' + this.count)
      })
      this.scrollToEnd();
    },
    setTime(time) {
      this.time = time;
    },
    scrollToEnd() {
      var container = document.querySelector(".cSbckb");
      var scrollHeight = container.scrollHeight;
      container.scrollTop = scrollHeight;
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
</style>