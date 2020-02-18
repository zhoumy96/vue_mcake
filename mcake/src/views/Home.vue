<template>
  <div class="home">
    <swiper :options="swiperOption" ref="mySwiper" >
      <swiper-slide>
        <img v-bind:src="require('..//assets/imgs/banner1.jpg')">
      </swiper-slide>
      <swiper-slide>
        <img v-bind:src="require('..//assets/imgs/banner2.jpg')">
      </swiper-slide>
      <swiper-slide>
        <img v-bind:src="require('..//assets/imgs/banner3.jpg')">
      </swiper-slide>
    </swiper>

  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    name: 'home',
    components: {
      swiper,
      swiperSlide
    },
    data:()=>{
        return {
          goodsList:[],
          swiperOption: {
            autoplay:true,
            loop : true,
          }
        }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted() {
      this.swiper.slideTo(3, 1000, false)
    },
  }
</script>

<style scoped lang="less">
  .home{
    /*padding: 160px 7.5% 80px;*/
    /*background: #f8f8f8;*/
    /*border-top: 1px solid #e8e8e8;*/
  }
  .swiper-slide{
    img{
      width:100%;
      height:auto;
    }
  }
</style>
