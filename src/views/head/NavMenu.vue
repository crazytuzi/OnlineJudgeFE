<template>
  <div>
    hhhhh
    <el-menu :default-active="defaultIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item v-for = "menu in menuList" :index="menu.index"><i :class="menu.icon"></i>{{menu.name}}</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
  console.log("进入了");
  export default {
    data() {
      return {
        menuList: [
          {
            name: "Home",
            index: "1",
            icon: "el-icon-menu",
          },
          {
            name: "Problems",
            index: "2",
            icon: "el-icon-location",
          },
          {
            name: "Status",
            index: "3",
            icon: "el-icon-location",
          },
          {
            name: "Contests",
            index: "4",
            icon: "el-icon-location",
          },
          {
            name: "Rank",
            index: "5",
            icon: "el-icon-location",
          }
        ],
        defaultIndex: '1',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key,keyPath);
      }
    }
  }
</script>
