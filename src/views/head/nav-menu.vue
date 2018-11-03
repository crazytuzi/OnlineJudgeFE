<template>
  <div>
    <el-menu :default-active="defaultIndex" class="el-menu-demo" mode="horizontal" @select="horselectHandler">
      <el-menu-item v-for = "(menu,index) in hormenuList" :index="menu.index" :key="index"><i :class="menu.icon"></i>{{menu.name}}</el-menu-item>
      <BtnMenu></BtnMenu>
    </el-menu>
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
            icon: "el-icon-menu",
            link: "/app/home",
          },
          {
            name: "Problems",
            index: "2",
            icon: "el-icon-location",
            link: "/app/problems",
          },
          {
            name: "Status",
            index: "3",
            icon: "el-icon-location",
            link: "/app/status",
          },
          {
            name: "Contests",
            index: "4",
            icon: "el-icon-location",
            link: "/app/contests",
          },
          {
            name: "Rank",
            index: "5",
            icon: "el-icon-location",
            link: "/app/rank",
          }
        ],
        defaultIndex: '1',
      };
    },
    methods: {
      horselectHandler(key, keyPath) {
        this.$router.push(this.hormenuList[key-1].link);
      }
    }
  }
</script>
