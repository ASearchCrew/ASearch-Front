<template>
    <div class="page-fixedbar-container">
        <div class="page-fixedbar-content">
            <div class="nano">
                <div class="nano-content">
                    <!--Server Menu-->
                    <p class="pad-all text-main text-sm text-uppercase text-bold">Server List</p>
                    <div class="list-group bg-trans">
                        <a href="#" class="list-group-item" v-for="server in serverList" :key="server.hostName">
                            <i class="fas fa-server icon-lg icon-fw"></i>{{ server.hostName }}
                        </a>
                    </div>

                    <hr>
                    
                    <!--WAS Menu-->
                    <p class="pad-all text-main text-sm text-uppercase text-bold">WAS List</p>
                    <div class="list-group bg-trans">
                        <a href="#" class="list-group-item"><i class="fab fa-chrome icon-lg icon-fw"></i> WAS 1</a>
                        <a href="#" class="list-group-item"><i class="fab fa-chrome icon-lg icon-fw"></i> WAS 2</a>
                        <a href="#" class="list-group-item"><i class="fab fa-chrome icon-lg icon-fw"></i> WAS 3</a>
                        <a href="#" class="list-group-item"><span class="label label-info pull-right">New</span><i class="fab fa-chrome icon-lg icon-fw"></i> WAS 4</a>
                    </div>

                    <hr>

                    <!--Server Menu-->
                    <p class="pad-all text-main text-sm text-uppercase text-bold">DB List</p>
                    <div class="list-group bg-trans">
                        <a href="#" class="list-group-item"><i class="fas fa-database icon-lg icon-fw"></i> Database 1</a>
                        <a href="#" class="list-group-item"><i class="fas fa-database icon-lg icon-fw"></i> Database 2</a>
                        <a href="#" class="list-group-item"><i class="fas fa-database icon-lg icon-fw"></i> Database 3</a>
                        <a href="#" class="list-group-item"><span class="label label-info pull-right">New</span><i class="fas fa-database icon-lg icon-fw"></i> Database 4</a>
                    </div>
                    
                    <!-- <ul class="list-group pad-btm bg-trans">
                        <li class="list-header">
                            <p class="text-main text-sm text-uppercase text-bold mar-no">Public Settings</p>
                        </li>
                        <li class="list-group-item">
                            <div class="pull-right">
                                <input class="toggle-switch" id="demo-switch-4" type="checkbox" checked>
                                <label for="demo-switch-4"></label>
                            </div>
                            Online status
                        </li>
                        <li class="list-group-item">
                            <div class="pull-right">
                                <input class="toggle-switch" id="demo-switch-5" type="checkbox" checked>
                                <label for="demo-switch-5"></label>
                            </div>
                            Show offline contact
                        </li>
                        <li class="list-group-item">
                            <div class="pull-right">
                                <input class="toggle-switch" id="demo-switch-6" type="checkbox" checked>
                                <label for="demo-switch-6"></label>
                            </div>
                            Show my device icon
                        </li>
                    </ul> -->

                    <hr>
                    
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'Fixedbar',
    date() {
        return {
            serverList: []
        }
    },
    methods: {
        requestServerList: async function() {
            await this.$http.get('/api/v1/management/server')
            .then((result) => {
                this.serverList = result
                console.log(this.serverList)
            });
        },
    },
    created() {
        this.requestServerList();
    }
}
</script>

<style scoped>

</style>
