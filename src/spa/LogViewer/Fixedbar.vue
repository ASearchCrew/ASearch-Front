<template>
<div id="myFixedBar">
    <div class="page-fixedbar-container">
        <div class="page-fixedbar-content">
            <div class="nano">
                <div class="nano-content">
                    <!--Server Menu-->
                    <p class="pad-all text-main text-sm text-uppercase text-bold"><i class="fas fa-server icon-lg icon-fw"></i> Server List</p>
                    <div class="list-group bg-trans">
                       <div v-for="server in serverList" :key="server.hostName" class="list-group-item">
                           <a href="#" class="rainbow-button" v-bind:alt="server.hostName"></a>
                       </div>
                    </div>

                    <hr>
                    
                    <!--WAS Menu-->
                    <p class="pad-all text-main text-sm text-uppercase text-bold"><i class="fab fa-chrome icon-lg icon-fw"></i> WAS List</p>
                    <div class="list-group bg-trans">
                       <div class="list-group-item">
                            <a href="#" class="rainbow-button" alt="WAS 1"></a>
                       </div>
                       <div class="list-group-item">
                            <a href="#" class="rainbow-button" alt="WAS 2"></a>
                       </div>
                       <div class="list-group-item">
                            <a href="#" class="rainbow-button" alt="WAS 3"></a>
                       </div>
                       <div class="list-group-item">
                            <a href="#" class="rainbow-button" alt="WAS 4"></a>
                       </div>
                    </div>
                    
                    <hr>

                    <!--Server Menu-->
                    <p class="pad-all text-main text-sm text-uppercase text-bold"><i class="fas fa-database icon-lg icon-fw"></i> DB List</p>
                    <div class="list-group bg-trans">
                       <div class="list-group-item">
                           <a href="#" class="rainbow-button" alt="Database 1"></a>
                       </div>
                        <div class="list-group-item">
                           <a href="#" class="rainbow-button" alt="Database 2"></a>
                       </div>
                       <div class="list-group-item">
                           <a href="#" class="rainbow-button" alt="Database 3"></a>
                       </div>
                       <div class="list-group-item">
                           <a href="#" class="rainbow-button" alt="Database 4"></a>
                       </div>
                    </div>
                    
                    <hr>
                    
                </div>
            </div>
        </div>
    </div>
</div>
</template>


<script>
export default {
    data () {
        return {
            serverList: []
        }
    },
    created () {
        this.requestServerList();
    },
    methods: {
        requestServerList: function() {
            this.$http.get('/api/v1/management/server')
            .then((result) => {
                this.serverList = result.data
            });
        },
    }
}
</script>

<style scoped>
.list-group-item {
  padding: 4px;
}
a {
  text-decoration:none;
  color:#FFF;
  margin-bottom: 1px;
}
.rainbow-button {
/*
  width:calc(18vw + 2px);
  height:calc(4vw + 2px);
*/
  height: 40px;
  background-image: linear-gradient(90deg, #00C0FF 0%, #FFCF00 49%, #FC4F4F 80%, #00C0FF 100%);
  border-radius:5px;
  display:flex;
  align-items:center;
  justify-content:center;
  text-transform:uppercase;
  font-size:15px;
  font-weight:bold;
  padding: 2px;
  border: none;
  animation:slidebg 2s linear infinite;
}
.rainbow-button:after {
  content:attr(alt);
/*
  width:18vw;
  height:4vw;
*/
  width: 100%;
  height: 36px;
  background-color:#3d4553;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius:5px;
}

.rainbow-button:hover:after {
  background-color:#2674fca2;
}


@keyframes slidebg {
  to {
    background-position:15vw;
  }
}

</style>