<template>
  <div>
    <el-menu :default-active="defaultIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item v-for = "menu in menuList" :index="menu.index"><i :class="menu.icon"></i>{{menu.name}}</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        menuList: [
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
      handleSelect(key, keyPath) {
        console.log(key,keyPath);
        this.$router.push(this.menuList[key-1].link);
      }
    }
  }
</script>
