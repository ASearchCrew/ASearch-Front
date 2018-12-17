<template>
    <div id="content-container" style="background-color: #0b1521">
        <div class="panel" >
            <div class="panel-body" style="background-color: #0b1521; ">
                <div style="display:inline-flex">
                    <div v-for="(data,index) in datas" :key="data.hostName">
                        <table class="table" style="width:350px;">
                            <thead>
                                <tr>
                                    <th style="font-size:20px;">{{data.hostName}}</th>
                                    <th style="width:20px"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(keyword,index) in data.keywords" :key="index">
                                    <td>
                                        <template v-if="keyword.edit">
                                            <input ref="keyInput" class="form-control input-lg" v-model="userKeyword" @keyup.enter="addData(keyword, index,userKeyword, data.hostName)"  >
                                        </template>
                                        <template v-else>
                                            <span><h3 class="panel-title" style="padding-left:10px">{{keyword.keyword}}</h3></span>
                                        </template>
                                    </td>
                                    <td><button class="btn btn-default btn-circle" @click="delData(data.hostName, data.keywords, index)"><i class="fa fa-minus"></i></button><br></td>
                                </tr>
                            </tbody>
                        </table>
                        <div style="width:350px; padding-right:10px;">
                            <button class="btn btn-default btn-circle" style="float:right;" @click="addRow(index)"><i class="fa fa-plus"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data (){
        return{
            userKeyword:"",
            datas :
            [
                // {
                //     "hostIp":"server_1"
                //     , "keywords" : [
                //         {"keyword":"error"},{"keyword":"test"}
                //         ]
                // },
                // {
                //     "hostIp":"server_2"
                //     , "keywords" : [
                //         {"keyword":"error"},{"keyword":"test"},{"keyword":"toast"}
                //         ]
                // }
            ],
            srvUrl : 'http://192.168.0.11:8080' // 우영
        }
    },
    methods : {
        addRow(idx){
            var data = {"keyword":"", "edit":true};
            this.datas[idx].keywords.push(data);
            //this.$nextTick(() => this.$refs.keyInput.focus());
        },
        addData(keyword, index, userKeyword,hostName){
            console.log(keyword+" "+index+" "+userKeyword+" "+hostName);
            if(userKeyword != ""){
                const baseURI = this.srvUrl;
                this.$http.post(`${baseURI}/api/v1/alarm/keyword`,{
                    hostName : hostName,
                    keyword : userKeyword
                }).then(function(data){
                    console.log(data);
                    keyword.edit = false;
                    keyword.keyword = userKeyword;
                    $.niftyNoty({
                        type: 'success',
                        message : '<p style="font-size:20px;">keyword <strong>[ '+userKeyword+' ]</strong> save success!<p>',
                        container : 'floating',
                        timer : 5000
                    });
                    console.log(data);
                });
            }
        },
        delData(hostName, keywords, index){
            console.log("keyword : "+keywords[index].keyword);
            console.log("hostName : "+hostName);
            console.log(typeof keywords[index].keyword);
            console.log(typeof hostName);

            const baseURI = this.srvUrl;
            this.$http.delete(`${baseURI}/api/v1/alarm/keyword`,{
                headers: {
                    'Content-Type': 'application/json'
                },
                data : {
                    hostName : hostName,
                    keyword : keywords[index].keyword
                }    
            }).then(function(result){
                console.log(result);
                $.niftyNoty({
                    type: 'success',
                    message : '<p style="font-size:20px;">keyword <strong>[ '+keywords[index].keyword+' ]</strong> delete success!</p>',
                    container : 'floating',
                    timer : 5000
                });
                keywords.splice(index,1);
            });
        }
    },
    created(){
        const baseURI = this.srvUrl;
        this.$http.get(`${baseURI}/api/v1/alarm/keyword/list`)
        .then((result) => {
            console.log(result);
            this.datas = result.data;
        });
    }
}
</script>

<style scoped>

</style>
