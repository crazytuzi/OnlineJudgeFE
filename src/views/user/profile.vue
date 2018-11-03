<template>
  <div>
    <el-menu :default-active="defaultIndex" class="el-menu-vertical-demo" mode="vertical" @select="verselectHandler">
      <el-menu-item v-for = "(menu,index) in vermenuList" :index="menu.index" :key="index"><i :class="menu.icon"></i>{{menu.name}}</el-menu-item>
    </el-menu>
    <component :is="activeComponent"></component>
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
                icon: "el-icon-menu",
                component: userhome,
              },
              {
                name: "submissions",
                index: "2",
                icon: "el-icon-location",
                component: usersubmissions,
              },
              {
                name: "collections",
                index: "3",
                icon: "el-icon-location",
                component: usercollections,
              },
              {
                name: "setting",
                index: "4",
                icon: "el-icon-location",
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
