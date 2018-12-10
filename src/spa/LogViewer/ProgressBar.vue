<template>
    <!-- <div id="porgress-bar"> -->
        <div v-if="isClicked" class="loader loading"></div>
        <div v-else class="loader loading dead"></div>
    <!-- </div> -->
</template>

<script>
export default {
    data() {
        return {
            isClicked: false
        }
    },
    mounted() {
        this.$EventBus.$on('stream', function(isClicked) {
            this.isClicked = isClicked
        }.bind(this));
    },
}
</script>

<style scoped>
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
  background: linear-gradient(to right,#ff2d55, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55);
  /* background: linear-gradient(to right,#232B99, #AAAEEB, #232B99); */
}
.loader.loading {
  opacity: 1;
}

.loader.loading.dead {
  opacity: 1;
  background: #343b47;
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
</style>
