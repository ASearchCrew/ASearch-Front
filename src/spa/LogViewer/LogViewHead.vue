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
                            <form>
                                <div class="radio">
                                    <label><input type="radio" name="optradio" checked>Option 1</label>
                                </div>
                                <div class="radio">
                                    <label><input type="radio" name="optradio">Option 2</label>
                                </div>
                                <div class="radio">
                                    <label><input type="radio" name="optradio">Option 3</label>
                                </div>
                            </form>
                            <!-- <li><a href="#">Action</a></li>
                            <li><a href="#">Another action</a></li>
                            <li><a href="#">Something else here</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a href="#">Separated link</a></li> -->
                        </ul>
                    </div>
                </div>
                <div class="euiFlexItem euiFlexItem--flexGrowZero">
                    <!-- <div id="picker"> </div>
                    <input type="hidden" id="time" value=""> -->
                    <div class='input-group date' id='datetimepicker'>
                        <input type='text' class="form-control" />
                        <span class="input-group-addon">
                            <span class="glyphicon glyphicon-calendar"></span>
                        </span>
                    </div>
                </div>
                <div class="euiFlexItem euiFlexItem--flexGrowZero">
                    <button v-if="isClicked" type="button" class="btn btn-danger" @click="streamBtnClick">Stop Stream</button>
                    <button v-else type="button" class="btn btn-success" @click="streamBtnClick">Stream Live</button>
                </div>
            </div>
        </div>
    </div>
    <!-- <div id="page-head">
        <div class="sub-navbar">
            <div class="euiFlexGroup euiFlexGroup--alignItemsCenter euiFlexGroup--justifyContentSpaceBetween euiFlexGroup--directionRow euiFlexGroup--responsive">
                <div class="euiFlexItem" >
                    <el-input
                        id="search"
                        placeholder="Search..."
                        prefix-icon="el-icon-search"
                        @keyup.native="sendQuery"
                    />
                </div>
                <div class="euiFlexItem euiFlexItem--flexGrowZero">
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
                </div>
                <div class="euiFlexItem euiFlexItem--flexGrowZero">
                    <div class="time-container">
                        <el-date-picker v-model="time" :picker-options="pickerOptions" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="Release time"/>
                    </div>
                </div>
                <div class="euiFlexItem euiFlexItem--flexGrowZero">
                    <el-button v-if="isClicked" type="danger" @click="streamBtnClick">Stop Stream</el-button>
                    <el-button v-else type="success" plain @click="streamBtnClick">Stream Live</el-button>
                </div>
        </div>
      </div>
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
        $('#datetimepicker').datetimepicker({
            language: 'ko',
            weekStart: 1,
            todayBtn:  1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            forceParse: 0,
            showMeridian: 1
        }).on('change', function(e){
            this.time = e.target.value
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
            console.log(newTime)
            this.$EventBus.$emit('sendTime', newTime)
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
</style>
