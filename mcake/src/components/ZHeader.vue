<template>
  <header>
    <nav>
      <div v-for="(item) in navList" :key="item.name" class="navItem">
        <router-link v-bind:to="'/'+item.link">
          <img v-bind:src="require('..//assets/imgs/'+item.img)">
          <img v-bind:src="require('..//assets/imgs/'+item.hoverImg)">
          <span>{{item.name}}</span>
        </router-link>
      </div>
    </nav>
    <div id="user">
      <div class="my">
        <router-link v-bind:to="'/my'">
          <i>
            <img v-bind:src="require('..//assets/imgs/login.png')">
            <span>我的</span>
          </i>
        </router-link>
      </div>
      <div class="cart">
        <router-link v-bind:to="'/cart'">
          <i>
            <img v-bind:src="require('..//assets/imgs/cart.png')">
            <span>购物车</span>
          </i>
        </router-link>
      </div>
    </div>

  </header>
</template>

<script>
  export default {
    name: 'ZHeader',
    data:()=>{
        return{
          navList:[
                {
                    'name':'首页',
                    'img':'home.png',
                    'hoverImg':'home-1.png',
                    'link':''
                },
                {
                    'name':'蛋糕',
                    'img':'1.png',
                    'hoverImg':'1-1.png',
                    'link':'goods/0'
                },
                {
                    'name':'小食',
                    'img':'2.png',
                    'hoverImg':'2-2.png',
                    'link':'goods/1'
                },
                {
                    'name':'最新消息',
                    'img':'3.png',
                    'hoverImg':'3-3.png',
                    'link':'news'
                },
            ],
          myBoxVisible:false,
        }
    },
    methods:{

    }
  }
</script>

<style scoped lang="less">
  header{
    height: 120px;
    width: 85%;
    min-width: 1280px;
    padding-left: 7.5%;
    padding-right: 7.5%;
    position: fixed;
    border-bottom: 1px solid #e8e8e8;
    top: 0;
    background-color: white;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    flex: 0 0 auto;
    span{
      cursor: pointer;
      display: block;
      text-align: center;
      font-size: 12px;
    }
    img{
      margin-bottom: 9px;
      vertical-align: middle
    }
    nav{
      display: flex;
      .navItem{
        width: 90px;
        height: 82px;
        padding-top: 35px;
        border-left: 1px solid #e8e8e8;
        border-top: 3px solid transparent;
        text-align: center;
        position: relative;
        a{
          display: inline-block;
          color: #8c8c8c;
          img:nth-child(2){
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
            display: none;
          }
        }
      }
      .navItem:last-child{
        border-right: 1px solid #e8e8e8;
      }
      .navItem:hover{
        border-top-color:#ffe32a;
        a{
          color: #000;
          img:nth-child(2){
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
            display: inline-block;
          }
        }
      }
    }
    #user{
      display: flex;
      div{
        width: 90px;
        height: 82px;
        padding-top: 38px;
        border-left: 1px solid #e8e8e8;
        text-align: center;
        a{
          display: inline-block;
          color: #8c8c8c;
        }
        i{
          display: inline-block;
          cursor: pointer;
        }
      }
      img{
        width: 18px;
        height: 20px;
      }

    }
  }
</style>
