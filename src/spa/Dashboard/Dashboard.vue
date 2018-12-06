<template>
  <!--Page content-->
  <!--===================================================-->

    <div class="panelCustom" style="padding:70px;">
          <div class="fixed-fluid">
              <div class="fluid faq-accordion">

                  <!-- GENERAL -->
                  <!--===================================================-->
                <div class="panel-collapse collapse in" @click="clickItemBtn0" href="#toggleDiv-0" data-toggle="collapse">
                  <p class="panel-title">
                    <p v-if="click0" class="panel-title"><i class="fa fa-minus-square"></i> Root</p>
                    <p v-else="click0" class="panel-title"><i class="fa fa-plus-square"></i> Root</p>
                  </p>
                </div>
                  <div id="toggleDiv-0">
                      <div class="panelCustom">
                          <div class="panel-heading" @click="clickItemBtn1" href="#toggleDiv-1" data-toggle="collapse">
                              <p class="panel-title">
                                <p v-if="click1" class="panel-title"><i class="fa fa-minus-square"></i> WEB</p>
                                <p v-else="click1" class="panel-title"><i class="fa fa-plus-square"></i> WEB</p>
                              </p>
                          </div>
                          <div class="panel-collapse collapse in" id="toggleDiv-1" style="padding-left:40px; padding-bottom:0px;">

                                  <div class="ht-event-btns">

                                      <div class="ht-event-btn stl1">
                                        <router-link to="/logViewer">
                                        <div class="logo">
                                            <span>Server 1</span>
                                        </div>
                                        <p>File beat</p>
                                        <div class="subH">
                                          <p>file live flow sdfsli sdf</p>
                                        </div>
                                        <div class="loader loading"></div>
                                      </router-link>

                                      </div>

                                    <div class="ht-event-btn stl2">
                                      <div class="logo">
                                          <span>Server 2</span>
                                      </div>
                                      <p>Elastic search</p>
                                      <div class="subH">
                                        <p>file live flow sdfsli sdf</p>
                                      </div>
                                      <div class="loader loading"></div>
                                    </div>

                                    <div class="ht-event-btn stl3" >
                                      <div class="logo">
                                          <span>Server 3</span>
                                      </div>
                                      <p>Logstash</p>
                                      <div class="subH">
                                        <p>file live flow sdfsli sdf</p>
                                      </div>
                                      <div class="loader loading"></div>
                                    </div>

                                    <div class="ht-event-btn stl4">
                                      <div class="logo">
                                          <span>Server 4</span>
                                      </div>
                                      <p>Kibana</p>
                                      <div class="subH">
                                        <p>file live flow sdfsli sdf</p>
                                      </div>
                                      <div class="loader loading"></div>
                                    </div>

                                    <div class="ht-event-btn stl5">
                                      <div class="logo">
                                          <span>Server 5</span>
                                      </div>
                                      <p>Kafka</p>
                                      <div class="subH">
                                        <p>file live flow sdfsli sdf</p>
                                      </div>
                                      <div class="loader loading"></div>
                                    </div>

                                  </div> <!--ht-event-btns end-->

                                  <div class="ht-event-btns">
                                    <div class="ht-event-btn stl5">
                                      <div class="logo">
                                          <span>Server 5</span>
                                      </div>
                                      <p>File beat</p>
                                      <div class="subH">
                                        <p>file live flow sdfsli sdf</p>
                                      </div>
                                      <div class="loader loading"></div>
                                    </div>

                                    <div class="ht-event-btn">
                                      <div class="logo">
                                          <span>Server 6</span>
                                      </div>
                                      <p>Elastic search</p>
                                      <div class="subH dead">
                                        <p>file live flow sdfsli sdf</p>
                                      </div>
                                      <div class="loader loading dead"></div>
                                    </div>

                                    <div class="ht-event-btn stl7" >
                                      <div class="logo">
                                          <span>Server 7</span>
                                      </div>
                                      <p>Logstash</p>
                                      <div class="subH">
                                        <p>file live flow sdfsli sdf</p>
                                      </div>
                                      <div class="loader loading"></div>
                                    </div>

                                    <div class="ht-event-btn">
                                      <div class="logo">
                                          <span>Server 8</span>
                                      </div>
                                      <p>Kibana</p>
                                      <div class="subH dead">
                                        <p>file live flow sdfsli sdf</p>
                                      </div>
                                      <div class="loader loading dead"></div>
                                    </div>

                                    <div class="ht-event-btn">
                                      <div class="logo">
                                          <span>Server 8</span>
                                      </div>
                                      <p>Kibana</p>
                                      <div class="subH dead">
                                        <p>file live flow sdfsli sdf</p>
                                      </div>
                                      <div class="loader loading dead"></div>
                                    </div>


                                  </div> <!--ht-event-btns end-->


                          </div>
                      </div>
                      <div class="panelCustom">
                          <div class="panel-heading">
                              <p class="panel-title">
                                  <a href="#toggleDiv-2" data-toggle="collapse" >
                                    <i class="fa fa-minus-square"></i> WAS
                                   </a>
                              </p>
                          </div>
                          <div class="panel-collapse collapse in" id="toggleDiv-2" style="padding-left:40px; padding-bottom:0px;">

                                  <div class="ht-event-btns">
                                    <div class="ht-event-btn stl1">
                                      <div class="logo">
                                          <span>Server 1</span>
                                      </div>
                                      <p>File beat</p>
                                      <div class="subH">
                                        <p>file live flow sdfsli sdf</p>
                                      </div>
                                      <div class="loader loading"></div>
                                    </div>

                                    <div class="ht-event-btn stl2">
                                      <div class="logo">
                                          <span>Server 2</span>
                                      </div>
                                      <p>Elastic search</p>
                                      <div class="subH">
                                        <p>file live flow sdfsli sdf</p>
                                      </div>
                                      <div class="loader loading"></div>
                                    </div>

                                    <div class="ht-event-btn stl3" >
                                      <div class="logo">
                                          <span>Server 3</span>
                                      </div>
                                      <p>Logstash</p>
                                      <div class="subH">
                                        <p>file live flow sdfsli sdf</p>
                                      </div>
                                      <div class="loader loading"></div>
                                    </div>

                                    <div class="ht-event-btn stl4">
                                      <div class="logo">
                                          <span>Server 4</span>
                                      </div>
                                      <p>Kibana</p>
                                      <div class="subH">
                                        <p>file live flow sdfsli sdf</p>
                                      </div>
                                      <div class="loader loading"></div>
                                    </div>

                                  </div> <!--ht-event-btns end-->

                                  <div class="ht-event-btns">
                                    <div class="ht-event-btn stl5">
                                      <div class="logo">
                                          <span>Server 5</span>
                                      </div>
                                      <p>File beat</p>
                                      <div class="subH">
                                        <p>file live flow sdfsli sdf</p>
                                      </div>
                                      <div class="loader loading"></div>
                                    </div>

                                    <div class="ht-event-btn">
                                      <div class="logo">
                                          <span>Server 6</span>
                                      </div>
                                      <p>Elastic search</p>
                                      <div class="subH dead">
                                        <p>file live flow sdfsli sdf</p>
                                      </div>
                                      <div class="loader loading dead"></div>
                                    </div>

                                    <div class="ht-event-btn stl7" >
                                      <div class="logo">
                                          <span>Server 7</span>
                                      </div>
                                      <p>Logstash</p>
                                      <div class="subH">
                                        <p>file live flow sdfsli sdf</p>
                                      </div>
                                      <div class="loader loading"></div>
                                    </div>

                                    <div class="ht-event-btn">
                                      <div class="logo">
                                          <span>Server 8</span>
                                      </div>
                                      <p>Kibana</p>
                                      <div class="subH dead">
                                        <p>file live flow sdfsli sdf</p>
                                      </div>
                                      <div class="loader loading dead"></div>
                                    </div>

                                  </div> <!--ht-event-btns end-->


                          </div>
                      </div>
                      <div class="panelCustom">
                          <div class="panel-heading">
                              <p class="panel-title">
                                  <a href="#toggleDiv-3" data-toggle="collapse" >
                                    <i class="fa fa-plus-square"></i> DB
                                   </a>
                              </p>
                          </div>
                          <div class="panel-collapse collapse" id="toggleDiv-3" style="padding-left:40px; padding-bottom:0px;">

                                  <div class="ht-event-btns">
                                    <div class="ht-event-btn stl1">
                                      <div class="logo">
                                          <span>Server 1</span>
                                      </div>
                                      <p>File beat</p>
                                      <div class="subH">
                                        <p>file live flow sdfsli sdf</p>
                                      </div>
                                      <div class="loader loading"></div>
                                    </div>

                                    <div class="ht-event-btn stl2">
                                      <div class="logo">
                                          <span>Server 2</span>
                                      </div>
                                      <p>Elastic search</p>
                                      <div class="subH">
                                        <p>file live flow sdfsli sdf</p>
                                      </div>
                                      <div class="loader loading"></div>
                                    </div>

                                    <div class="ht-event-btn stl3" >
                                      <div class="logo">
                                          <span>Server 3</span>
                                      </div>
                                      <p>Logstash</p>
                                      <div class="subH">
                                        <p>file live flow sdfsli sdf</p>
                                      </div>
                                      <div class="loader loading"></div>
                                    </div>

                                    <div class="ht-event-btn stl4">
                                      <div class="logo">
                                          <span>Server 4</span>
                                      </div>
                                      <p>Kibana</p>
                                      <div class="subH">
                                        <p>file live flow sdfsli sdf</p>
                                      </div>
                                      <div class="loader loading"></div>
                                    </div>

                                  </div> <!--ht-event-btns end-->

                                  <div class="ht-event-btns">
                                    <div class="ht-event-btn stl5">
                                      <div class="logo">
                                          <span>Server 5</span>
                                      </div>
                                      <p>File beat</p>
                                      <div class="subH">
                                        <p>file live flow sdfsli sdf</p>
                                      </div>
                                      <div class="loader loading"></div>
                                    </div>

                                    <div class="ht-event-btn">
                                      <div class="logo">
                                          <span>Server 6</span>
                                      </div>
                                      <p>Elastic search</p>
                                      <div class="subH dead">
                                        <p>file live flow sdfsli sdf</p>
                                      </div>
                                      <div class="loader loading dead"></div>
                                    </div>

                                    <div class="ht-event-btn stl7" >
                                      <div class="logo">
                                          <span>Server 7</span>
                                      </div>
                                      <p>Logstash</p>
                                      <div class="subH">
                                        <p>file live flow sdfsli sdf</p>
                                      </div>
                                      <div class="loader loading"></div>
                                    </div>

                                    <div class="ht-event-btn">
                                      <div class="logo">
                                          <span>Server 8</span>
                                      </div>
                                      <p>Kibana</p>
                                      <div class="subH dead">
                                        <p>file live flow sdfsli sdf</p>
                                      </div>
                                      <div class="loader loading dead"></div>
                                    </div>

                                  </div> <!--ht-event-btns end-->
                          </div>
                      </div>
                  </div>
              </div>
          </div>
    </div>

  <!--===================================================-->
  <!--End page content-->
</template>

<!--jQuery [ REQUIRED ]-->
<script src="js/jquery.min.js"></script>
<!--BootstrapJS [ RECOMMENDED ]-->
<script src="js/bootstrap.min.js"></script>
<!--NiftyJS [ RECOMMENDED ]-->
<script src="js/nifty.min.js"></script>
<!-- Vue JS -->
<script src="js/app.js"></script>
<!--Demo script [ DEMONSTRATION ]-->
<script src="js/demo/nifty-demo.min.js"></script>
<!--Flot Chart [ OPTIONAL ]-->
<script src="plugins/flot-charts/jquery.flot.min.js"></script>
<script src="plugins/flot-charts/jquery.flot.categories.min.js"></script>
<script src="plugins/flot-charts/jquery.flot.orderBars.min.js"></script>
<script src="plugins/flot-charts/jquery.flot.tooltip.min.js"></script>
<script src="plugins/flot-charts/jquery.flot.resize.min.js"></script>
<!--Specify page [ SAMPLE ]-->
<script src="js/demo/dashboard-2.js"></script>


<script>
export default {
  data (){
    return {
      click0:true,
      click1:true
    }
  },
  methods:{
    clickItemBtn0(){
      this.click0=!this.click0;
    },
    clickItemBtn1(){
      this.click1=!this.click1;
    }
  }
}
</script>

<style scoped>

.panelCustom {
  border-radius: 3px;
  border: 0;
  box-shadow: none !important;
  margin-bottom: 20px;
  background-color: #0b1521;
}

div .ht-event-btns {

    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: left;
    /*
    display: -webkit-flex;
    display: flex;
    -webkit-flex: 1;
    -ms-flex: 1;  */

    width: 1200px;
    height: 140px;
}

div .ht-event-btns .ht-event-btn {

    position: relative;
    width: 230px;
    height: 130px;
    padding:0;
    margin-right: 20px;
    text-align: center;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: height 0.2s ease-out;
    background-color: rgba(0, 0, 0, 0.5);
    background-image: linear-gradient(to bottom, rgba(45,0,140, 0.5), rgba(20,0,51,0.8));

    cursor: pointer;
}

div .ht-event-btns .ht-event-btn .logo {
    background-color: #333;
    width: 80px;
    height: 80px;
    position: absolute;
    top: 0;
    right: 0;
    font-size: 13px;
    border-top-right-radius: 7px;
    background: url(./img/evt_logo.png) no-repeat 0 0;
}

div .ht-event-btns .ht-event-btn .logo span {
    position: absolute;
    top: 19px;
    left: 26px;
    color: #fff;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
}

div .ht-event-btns .ht-event-btn p {

    font-size: 20px;
    text-align: left;
    padding: 27px;
    padding-bottom: 0px;
}

div .ht-event-btns .ht-event-btn.stl1 p {
    color: #f8e71c;
}

div .ht-event-btns .ht-event-btn.stl2 p {
    color: #7ed321;
}

div .ht-event-btns .ht-event-btn.stl3 p {
    color: #50E3C2;
}

div .ht-event-btns .ht-event-btn.stl4 p {
    color: #00D1FF;
}

div .ht-event-btns .ht-event-btn.stl5 p {
    color: #F8A1A4;
}

div .ht-event-btns .ht-event-btn.stl7 p {
    color: #f8e71c;
}

div .ht-event-btns .ht-event-btn .subH p{
  font-size:15px;
  color:#ffffff;
  padding-top:0px;
  padding-bottom: 10px;
}

div .ht-event-btns .ht-event-btn .subH.dead p{
  font-size:15px;
  color:#7A878E;
  padding-top:0px;
  padding-bottom: 10px;
}


.loader {
  -webkit-transition: height 1s;
  transition: height 1s;
  -webkit-animation: barberpole 3s linear infinite;
  animation: barberpole 10s linear infinite;
  opacity: 0;
  z-index: 9999;
  height: 5px;
  width: 100%;
  background: white;
  background-size: 100px 100px;
  /*background: linear-gradient(to right,#ff2d55, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55);*/
  background: linear-gradient(to right,#232B99, #AAAEEB, #232B99); /*4CD967*/
}
.loader.loading {
  opacity: 1;
}

.loader.loading.dead {
  opacity: 1;
  background: linear-gradient(to right,#808080, #404040, #808080);
}

@-webkit-keyframes barberpole {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 2000px 300px;
  }
}
@keyframes barberpole {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 2000px 300px;
  }
}

#chartdiv {
  width: 100%;
  height: 500px;
}

</style>
