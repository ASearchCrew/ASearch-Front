<template>
    <div id="page-head">
        <div class="sub-navbar">
            <div class="euiFlexGroup euiFlexGroup--alignItemsCenter euiFlexGroup--justifyContentSpaceBetween euiFlexGroup--directionRow euiFlexGroup--responsive">
                <div class="euiFlexItem " >
                    <input type="text" id="query" class="form-control" placeholder="Search for..." @keyup.enter="sendQuery">
                </div>
                <div class="euiFlexItem euiFlexItem--flexGrowZero">
                    <div class="btn-group">
                        <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Customize <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu">
                            <h5 class="dropdown-subtitle">Text Size</h5>
                            <div class="funkyradio">
                                <div class="funkyradio-success">
                                    <input type="radio" name="radio" id="radio3" value="small" />
                                    <label for="radio3">Small</label>
                                </div>
                                <div class="funkyradio-warning">
                                    <input type="radio" name="radio" id="radio5" value="medium" checked/>
                                    <label for="radio5">Medium</label>
                                </div>
                                <div class="funkyradio-danger">
                                    <input type="radio" name="radio" id="radio4" value="large" />
                                    <label for="radio4">Large</label>
                                </div>
                            </div>

                            <div class="funkyradio">
                                <h5 class="dropdown-subtitle">Line Wrapping</h5>
                                <div class="funkyradio-primary">
                                    <input type="checkbox" name="checkbox" id="checkbox2" checked/>
                                    <label for="checkbox2">Wrap Long Lines</label>
                                </div>
                            </div>
                        </ul>
                    </div>
                </div>
                <div class="euiFlexItem euiFlexItem--flexGrowZero">
                    <input v-if="isClicked" id='datetimepicker' type='text' class="form-control" onkeydown="return false" placeholder="Streaming..." disabled/>
                    <input v-else id='datetimepicker' type='text' class="form-control" onkeydown="return false" placeholder="DateTime" />
                </div>
                <div class="euiFlexItem euiFlexItem--flexGrowZero">
                    <button v-if="isClicked" id="reset-date" type="button" class="btn btn-warning" disabled="disabled">X</button>
                    <button v-else id="reset-date" type="button" class="btn btn-warning">X</button>
                </div>
                <div class="euiFlexItem euiFlexItem--flexGrowZero">
                    <button v-if="isClicked" type="button" class="btn btn-danger stop-btn" @click="streamBtnClick">Stop Stream</button>
                    <button v-else type="button" class="btn btn-success play-btn" @click="streamBtnClick">Stream Live</button>
                </div>
            </div>
        </div>
    </div>
    <!-- <div class="euiFlexItem euiFlexItem--flexGrowZero">
        <el-dropdown trigger="click">
            <el-button plain>
            Customize<i class="el-icon-caret-bottom el-icon--right"/>
            </el-button>
            <el-dropdown-menu slot="dropdown" class="no-border">
                <el-radio-group v-model="radioOption" style="padding: 5px 15px;">
                    <el-radio v-for="item in radioOptions" :label="item.key" :key="item.key">
                        {{ item.name }}
                    </el-radio>
                </el-radio-group>
            </el-dropdown-menu>
        </el-dropdown>
    </div> -->
</template>

<script>
export default {
    data() {
        return {
            query: '',
            isClicked: false,
            time: '',
        }
    },
    mounted() {
        var vm = this;

        $('#datetimepicker').datetimepicker({
            language: 'ko',
            weekStart: 1,
            todayBtn:  1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            forceParse: 0,
            showMeridian: 1,
            maxDate: new Date(),
            endDate: new Date()
        }).on('change', function(e){
            this.time = e.target.value
            this.sendTime(this.time)
        }.bind(this));
        
        $("#reset-date").click(function(){
            $('#datetimepicker').val("").datetimepicker("update");
            this.initRequest();
        }.bind(this));

        $('input[type=radio][name=radio]').change(function() {
            vm.textSizeChangeReq(this.value);
        });

        $("#checkbox2").change(function(){
            if($("#checkbox2").is(":checked")){
                vm.wrapLongLines(true);
            }else{
                vm.wrapLongLines(false);
            }
        });

        this.$EventBus.$on('chartTimeClicked', function(clickedTime) {
            $('#datetimepicker').val(clickedTime).datetimepicker("update");
            this.time = clickedTime
            this.sendTime(this.time)
        }.bind(this));
    },
    methods: {
        streamBtnClick: function() {
            this.isClicked = !this.isClicked
            this.$EventBus.$emit('stream', this.isClicked)
        },
        sendQuery: function() {
            //  alert();
            // console.log(event.key)
            console.log(document.getElementById('query').value)
            this.$EventBus.$emit('sendQuery', document.getElementById('query').value)
        },
        sendTime: function(newTime) {
            this.$EventBus.$emit('sendTime', newTime)
        },
        initRequest: function() {
            this.$EventBus.$emit('initRequest')
        },
        textSizeChangeReq: function(size) {
            this.$EventBus.$emit('textSizeChangeReq', size)
        },
        wrapLongLines: function(isChecked) {
            this.$EventBus.$emit('wrapLongLines', isChecked)
        }
    }
}
</script>

<style scoped>
.my-navbar {
    margin: 0;
    border: none;
}

.container-fluid {
    padding-top: 10px;
    padding-bottom: 10px;
}

.nav-el {
    padding-right: 5px;
    display: inline;
}

/* test */
.euiFlexGroup {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    padding-top: 7px;
}

.euiFlexGroup--justifyContentSpaceBetween {
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
}

.euiFlexGroup--alignItemsCenter {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}

.euiFlexGroup--directionRow {
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
}

.euiFlexItem {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    padding-left: 10px;
}

.euiFlexGroup .euiFlexItem {
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    -ms-flex-preferred-size: 0%;
    flex-basis: 0%;
}

.euiFlexItem.euiFlexItem--flexGrowZero {
    -webkit-box-flex: 0;
    -ms-flex-positive: 0;
    flex-grow: 0;
    -ms-flex-preferred-size: auto;
    flex-basis: auto;
}

.sub-navbar {
    height: 50px;
    line-height: 50px;
    position: relative;
    width: 100%;
    text-align: right;
    padding-right: 20px;
    -webkit-transition: 600ms ease position;
    transition: 600ms ease position;
    /* background: -webkit-gradient(linear, left top, right top, from(#20b6f9), color-stop(0%, #20b6f9), color-stop(100%, #2178f1), to(#2178f1));
    background: linear-gradient(90deg, rgb(64, 81, 87) 0%, rgb(64, 81, 87) 0%, #344146 100%, #344146 100%); */
}

.radio label {
    padding-left: 40px;
}

.radio label input {
    position: relative;
}


#picker {
    color: black;
}


.play-btn {
    box-shadow: 0px 0px 25px 3px rgba(146, 199, 85, 0.8);

}
.stop-btn {
  /* width: 100px;
  height: 100px; */
/*   background: radial-gradient( rgba(255, 0, 128, 0.8) 60%, rgba(255, 255, 255, 1) 62%); */
/*   border-radius: 50%; */
  position: relative;
  display: block;
  /* margin: 100px auto; */
  box-shadow: 0px 0px 25px 3px rgba(245, 81, 69, 0.8);
}

/* pulse wave */
.stop-btn:before {
  content: "";
  position: absolute;
  width: 160%;
  height: 150%;
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
  -webkit-animation: pulsate1 2s;
  animation: pulsate1 2s;
  -webkit-animation-direction: forwards;
  animation-direction: forwards;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-timing-function: steps;
  animation-timing-function: steps;
  opacity: 1;
/*   border-radius: 50%; */
  border: 5px solid rgba(255, 255, 255, .75);
  top: -30%;
  left: -30%;
  background: rgba(198, 16, 0, 0);
}

@-webkit-keyframes pulsate1 {
  0% {
    -webkit-transform: scale(0.6);
    transform: scale(0.6);
    opacity: 1;
    box-shadow: inset 0px 0px 25px 3px rgba(255, 255, 255, 0.75), 0px 0px 25px 10px rgba(255, 255, 255, 0.75);
  }
  100% {
    -webkit-transform: scale(0.8);
    transform: scale(0.8);
    opacity: 0;
    box-shadow: none;

  }
}

@keyframes pulsate1 {
  0% {
    -webkit-transform: scale(0.6);
    transform: scale(0.6);
    opacity: 1;
    box-shadow: inset 0px 0px 25px 3px rgba(255, 255, 255, 0.75), 0px 0px 25px 10px rgba(255, 255, 255, 0.75);
  }
  100% {
    -webkit-transform: scale(1, 1);
    transform: scale(0.8);
    opacity: 0;
    box-shadow: none;

  }
}





.funkyradio div {
  clear: both;
  overflow: hidden;
  line-height: 0;
}

.funkyradio label {
  width: 100%;
  border-radius: 3px;
  /* border: 1px solid #D1D3D4; */
  font-weight: normal;
}

.funkyradio input[type="radio"]:empty,
.funkyradio input[type="checkbox"]:empty {
  display: none;
}

.funkyradio input[type="radio"]:empty ~ label,
.funkyradio input[type="checkbox"]:empty ~ label {
  position: relative;
  line-height: 2.5em;
  text-indent: 3.25em;
  margin-top: 1em;
  margin: 0;
  cursor: pointer;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
}

.funkyradio input[type="radio"]:empty ~ label:before,
.funkyradio input[type="checkbox"]:empty ~ label:before {
  position: absolute;
  display: block;
  top: 0;
  bottom: 0;
  left: 0;
  content: '';
  width: 2.5em;
  background: #D1D3D4;
  /* border-radius: 3px 0 0 3px; */
}

.funkyradio input[type="radio"]:hover:not(:checked) ~ label,
.funkyradio input[type="checkbox"]:hover:not(:checked) ~ label {
  color: rgb(255, 255, 255);
}

.funkyradio input[type="radio"]:hover:not(:checked) ~ label:before,
.funkyradio input[type="checkbox"]:hover:not(:checked) ~ label:before {
  content: '\2714';
  text-indent: .9em;
  color: #C2C2C2;
}

.funkyradio input[type="radio"]:checked ~ label,
.funkyradio input[type="checkbox"]:checked ~ label {
  color: rgb(255, 255, 255);
}

.funkyradio input[type="radio"]:checked ~ label:before,
.funkyradio input[type="checkbox"]:checked ~ label:before {
  content: '\2714';
  text-indent: .9em;
  color: #333;
  background-color: #ccc;
}

.funkyradio input[type="radio"]:focus ~ label:before,
.funkyradio input[type="checkbox"]:focus ~ label:before {
  box-shadow: 0 0 0 3px #999;
}

.funkyradio-default input[type="radio"]:checked ~ label:before,
.funkyradio-default input[type="checkbox"]:checked ~ label:before {
  color: #333;
  background-color: #ccc;
}

.funkyradio-primary input[type="radio"]:checked ~ label:before,
.funkyradio-primary input[type="checkbox"]:checked ~ label:before {
  color: #fff;
  background-color: #337ab7;
}

.funkyradio-success input[type="radio"]:checked ~ label:before,
.funkyradio-success input[type="checkbox"]:checked ~ label:before {
  color: #fff;
  background-color: #5cb85c;
}

.funkyradio-danger input[type="radio"]:checked ~ label:before,
.funkyradio-danger input[type="checkbox"]:checked ~ label:before {
  color: #fff;
  background-color: #d9534f;
}

.funkyradio-warning input[type="radio"]:checked ~ label:before,
.funkyradio-warning input[type="checkbox"]:checked ~ label:before {
  color: #fff;
  background-color: #f0ad4e;
}

.funkyradio-info input[type="radio"]:checked ~ label:before,
.funkyradio-info input[type="checkbox"]:checked ~ label:before {
  color: #fff;
  background-color: #5bc0de;
}

.dropdown-subtitle{
    text-align: center;
}
</style>
