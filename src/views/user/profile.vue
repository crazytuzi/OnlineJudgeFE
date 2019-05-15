<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="4">
        <el-menu :default-active="defaultIndex" class="el-menu-vertical-demo" mode="vertical" @select="verselectHandler">
          <el-menu-item v-for = "(menu,index) in vermenuList" :index="menu.index" :key="index"><i :class="menu.icon"></i>{{menu.name}}</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <component :is="activeComponent"></component>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import userhome from "@/views/user/userhome"
    import usersubmissions from "@/views/user/usersubmissions"
    import usercollections from "@/views/user/usercollections"
    import usersetting from "@/views/user/usersetting"
    export default {
        name: "profile",
        data() {
          return {
            vermenuList: [
              {
                name: "home",
                index: "1",
                icon: "el-icon-oj-zhuye",
                component: userhome,
              },
              {
                name: "submissions",
                index: "2",
                icon: "el-icon-oj-kaoshi",
                component: usersubmissions,
              },
              {
                name: "collections",
                index: "3",
                icon: "el-icon-oj-shoucang1",
                component: usercollections,
              },
              {
                name: "setting",
                index: "4",
                icon: "el-icon-oj-shezhi1",
                component: usersetting,
              },
            ],
            defaultIndex: '1',
            activeComponent : userhome,
          };
        },
      components:
        {
          userhome,
          usersubmissions,
          usercollections,
          usersetting,
        },
      methods: {
        verselectHandler(key, keyPath) {
          this.activeComponent = this.vermenuList[key-1].component;
        }
      },
    }
</script>

<style scoped>

</style>
