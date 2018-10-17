<template>
  <div>
    <el-menu :default-active="defaultIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item v-for = "tab in menuList" :index="tab.index"><i :class="tab.icon"></i>{{tab.name}}</el-menu-item>
    </el-menu>
    <component :is="activeComponent"></component>
  </div>
</template>
<script>
  import Home from "@/views/home/home"
  import Problems from "@/views/problem/problems"
  import Status from "@/views/status/status"
  import Contests from "@/views/contest/contests"
  import Rank from "@/views/rank/rank"

  export default {
    data() {
      return {
        menuList: [
          {
            name: "Home",
            index: "1",
            icon: "el-icon-menu",
            component: Home,
          },
          {
            name: "Problems",
            index: "2",
            icon: "el-icon-location",
            component: Problems,
          },
          {
            name: "Status",
            index: "3",
            icon: "el-icon-location",
            component: Status,
          },
          {
            name: "Contests",
            index: "4",
            icon: "el-icon-location",
            component: Contests,
          },
          {
            name: "Rank",
            index: "5",
            icon: "el-icon-location",
            component: Rank,
          }
        ],
        defaultIndex: '1',
        activeComponent : Home,
      };
    },
    comments:
      {
        Home,
        Problems,
        Status,
      },
    methods: {
      handleSelect(key, keyPath) {
        this.activeComponent = this.menuList[key-1].component;
      }
    }
  }
</script>
