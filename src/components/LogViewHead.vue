<template>
    <div id="page-head">
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
    </div>
</template>

<script>
export default {
    data() {
        return {
            query: '',
            isClicked: false,
            time: '',
            url: '',
            radioOption: '4',
            radioOptions: [
                { key: '1', name: '1 Year' },
                { key: '2', name: '1 Month' },
                { key: '3', name: '1 Week' },
                { key: '4', name: '1 Day' },
                { key: '5', name: '1 Hour' },
                { key: '6', name: '1 Minute' }
            ],
            pickerOptions: {
                disabledDate(time) {
                return time.getTime() > Date.now()
                }
            },
        }
    },
    methods: {
        streamBtnClick: function() {
            this.isClicked = !this.isClicked
            this.$EventBus.$emit('stream', this.isClicked)
        },
        sendQuery: function(event) {
            //  alert();
            // console.log(event.key)
            console.log(document.getElementById('search').value)
            this.$EventBus.$emit('searchKeyword', document.getElementById('search').value)
        }
    }
}
</script>

<style scoped>
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
    background: -webkit-gradient(linear, left top, right top, from(#20b6f9), color-stop(0%, #20b6f9), color-stop(100%, #2178f1), to(#2178f1));
    background: linear-gradient(90deg, #20b6f9 0%, #20b6f9 0%, #2178f1 100%, #2178f1 100%);
}

</style>
