<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="6" :offset="1">
        <div>
          <img src="../../static/images/img.png" style="width: 70px;height: 70px;margin-top: -10px;display:inline">
          <div style="font-size: 30px;display:inline;top: -15px;position: relative;left: 10px">Online Judge</div>
        </div>
      </el-col>
      <el-col :span="12">
        <el-menu :default-active="defaultIndex" class="el-menu-demo" mode="horizontal" @select="selectItems">
          <el-menu-item v-for = "(menu,index) in hormenuList" :index="menu.index" :key="index"><i :class="menu.icon"></i>{{menu.name}}</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="4">
        <BtnMenu></BtnMenu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import BtnMenu from './btn-menu'
  export default {
    components: {BtnMenu},
    data() {
      return {
        hormenuList: [
          {
            name: "Home",
            index: "1",
            icon: "el-icon-oj-home-g",
            link: "/app/home",
          },
          {
            name: "Problems",
            index: "2",
            icon: "el-icon-oj-wentiliebiao",
            link: "/app/problems",
          },
          {
            name: "Status",
            index: "3",
            icon: "el-icon-oj-Stats",
            link: "/app/status",
          },
          {
            name: "Contests",
            index: "4",
            icon: "el-icon-oj-lishibisai",
            link: "/app/contests",
          },
          {
            name: "Rank",
            index: "5",
            icon: "el-icon-oj-rankings",
            link: "/app/rank",
          }
        ],
        defaultIndex: '1',
      };
    },
    methods: {
      getNavType(){
        this.defaultIndex=this.$store.state.topnavigation;
      },
      selectItems(index){
        this.$store.state.topnavigation=index;
        this.$router.push(this.hormenuList[index-1].link);
      }
    },
    watch: {
        '$store.state.topnavigation': 'getNavType'
    }
  }
</script>
