<template>
    <!--Page content-->
    <!--===================================================-->
    <div id="page-content">
        <div class="msIpy">
            <div class="kJLsxp">
                <!-- <div class="nano has-scrollbar">
                    <div class="nano-content" tabindex="0" style="right: -17px;">

                    </div>
                    <div class="nano-pane">
                        <div class="nano-slider" style="height: 794px; transform: translate(0px, 0px);">
                        </div>
                    </div>
                </div> -->
                <div class="cSbckb" style="height: 820px; width: 100%;">
                    <transition-group
                        v-if="hasResult"
                        :css="false"
                        name="list"
                        tag="div"
                        @before-enter="beforeEnter"
                        @enter="enter"
                        @leave="leave">
                        <div v-for="result in results" style="height:auto" :key="result.id" @mouseover="mouseInCell" @mouseout="mouseOutCell">
                            <div class="timeline-time-custom" scale="medium">{{ result.timestamp }}</div>
                            <div class="timeline-icon-custom"><a href="#"></a></div>
                            <div class="timeline-body-custom" scale="medium">{{ result.message }}</div>
                        </div>

                    </transition-group>


                    
                    <transition-group v-else name="list" tag="ul" class="timeline-custom">
                        <li v-for="result in results" style="height:auto" :key="result.id" @mouseover="mouseInCell" @mouseout="mouseOutCell">
                            <!-- <div class="timeline-time-custom" scale="medium">{{ result.timestamp }}</div> -->
                            <div class="timeline-time-custom" scale="medium">{{ result.title }}</div>
                            <div class="timeline-icon-custom"><a href="#"></a></div>
                            <!-- <div class="timeline-body-custom" scale="medium">{{ result.message }}</div> -->
                            <div class="timeline-body-custom" scale="medium">{{ result.body }}</div>
                        </li>

                        <!-- <div v-for="(post) in posts" style="height:auto" :key="post.id" @mouseover="mouseInCell" @mouseout="mouseOutCell" class="eBjuvI">
                            <div class="iMKTAC" scale="medium">{{ post.title }}</div>
                            <div class="jyzsZJ" scale="medium">{{ post.body }}</div>
                        </div> -->
                    </transition-group>
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
      offset: 0,
      query: '',
      results: [],
      isClicked: false,
      interval: null,
      computedList:null
    }
  },
  computed: {
    // computedList: function() {
    //   var vm = this
    //   return vm.posts.filter(function(item) {
    //     console.log(item.body.toLowerCase().indexOf(vm.query.toLowerCase()));
    //     return item.body.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1 // body 부분 수정필요!!
    //   })
    // },
    hasResult: function() {
      return this.query.length > 0
    }
  },
  mounted() {
    // 초기 로그 요청
    this.searchTerm();
    this.startStream();
    // Stream 버튼 클릭 시 스트리밍 실행 / 정지
    this.$EventBus.$on('stream', function(isClicked) {
      this.isClicked = isClicked
      console.log(this.isClicked)
      this.isClicked ? this.startStream() : this.stopStream()
    }.bind(this));
    this.scrollToEnd();
    this.$EventBus.$on('searchKeyword', this.onReceive);
  },
  updated() {
    this.scrollToEnd();
  },
  beforeDestroy() {
    clearInterval(this.interval)
    this.interval = null
  },
  methods: {
    mouseInCell(event){
      console.log(event.currentTarget.childNodes)
      event.currentTarget.childNodes[0].style.fontWeight="bold";
      event.currentTarget.childNodes[2].style.fontWeight="bold";
      
      event.currentTarget.childNodes[1].childNodes[0].style.backgroundColor='#fffddb';
      event.currentTarget.childNodes[2].style.backgroundColor='#fffddb';
    },
    mouseOutCell(event){
      event.currentTarget.childNodes[0].style.fontWeight='';
      event.currentTarget.childNodes[2].style.fontWeight='';
      
      event.currentTarget.childNodes[1].childNodes[0].style.backgroundColor='';
      event.currentTarget.childNodes[2].style.backgroundColor='';
    },
    searchTerm: function() {
      // using JSONPlaceholder
      const baseURI = 'https://jsonplaceholder.typicode.com'
      this.$http.get(`${baseURI}/posts`)
      // const baseURI = 'http://52.79.220.131:8080';
      // this.$http.get(`${baseURI}/api/v1/log?offset=${this.offset}`)
        .then((result) => {
          console.log(result)
          this.results = result.data
          // this.offset = this.offset + 1
          // this.computedList = this.posts.filter((item) => {
          //   // console.log(item.body.toLowerCase().indexOf(vm.query.toLowerCase()));
          //   return item.body.toLowerCase().indexOf(this.query.toLowerCase()) !== -1 // body 부분 수정필요!!
          // })
          // this.posts.push(result.data)
          // count = count + 1
        })
    },
    startStream: function() {
      this.interval = setInterval(this.searchTerm, 3000)
    },
    stopStream: function() {
      clearInterval(this.interval)
    },
    onReceive(text) {
      this.query = text
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
    overflow-y: scroll;
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
    padding: 20px 0;
}

.timeline-custom .timeline-time-custom {
    position: absolute;
    left: 0;
    width: 18%;
    text-align: right;
    top: 30px;
}

.timeline-custom .timeline-icon-custom {
    left: 15%;
    position: absolute;
    width: 10%;
    text-align: center;
    top: 40px;
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
    border: 5px solid #2d353c;
    transition: border-color .2s linear;
}

.timeline-custom .timeline-body-custom {
    margin-left: 23%;
    margin-right: 3%;
    background: #fff;
    position: relative;
    padding: 20px 25px;
    border-radius: 6px;
}

.timeline-custom .timeline-body-custom:before {
    content: '';
    display: block;
    position: absolute;
    border: 10px solid transparent;
    border-right-color: #fff;
    left: -20px;
    top: 20px;
}



.timeline-custom:before {
  content: '';
  position: absolute;
  top: 5px;
  bottom: 5px;
  width: 5px;
  background: #2d353c;
  left: 20%;
  margin-left: -2.5px;
}

*, ::after, ::before {
    box-sizing: border-box;
}

</style>
