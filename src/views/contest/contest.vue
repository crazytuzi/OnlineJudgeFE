<template>
  <div>
    Title:{{contest.title}}
    Start Time:{{contest.start_time}}
    End Time:{{contest.end_time}}
    <el-menu :default-active="defaultIndex" class="el-menu-vertical-demo" mode="vertical" @select="verselectHandler">
      <el-menu-item v-for = "(menu,index) in vermenuList" :index="menu.index" :key="index"><i :class="menu.icon"></i>{{menu.name}}</el-menu-item>
    </el-menu>
    <component :is="activeComponent"></component>
  </div>
</template>

<script>
  import {getContestDetail} from "../../api/api"
  import cookie from '../../static/js/cookie'
  import contestproblems from "@/views/contest/contestproblems"
  import contestsubmissions from "@/views/contest/contestsubmissions"
  import contestrank from "@/views/contest/contestrank"
  import conteststatistics from "@/views/contest/conteststatistics"
  export default {
    name: "Contest",
    data(){
      return {
        contest_id: '',
        contest: {},
        vermenuList: [
          {
            name: "problems",
            index: "1",
            icon: "el-icon-menu",
            component: contestproblems,
          },
          {
            name: "submissions",
            index: "2",
            icon: "el-icon-location",
            component: contestsubmissions,
          },
          {
            name: "rank",
            index: "3",
            icon: "el-icon-location",
            component: contestrank,
          },
          {
            name: "statistics",
            index: "4",
            icon: "el-icon-location",
            component: conteststatistics,
          },
        ],
        defaultIndex: '1',
        activeComponent : contestproblems,
      };
    },
    components:
      {
        contestproblems,
        contestsubmissions,
        contestrank,
        conteststatistics,
      },
    created(){
      this.contest_id = this.$route.params.contest_id;
      this.getContest();
    },
    methods: {
      getContest(){
        getContestDetail(
          this.contest_id
        ).then((response)=>{
          this.contest = response.data;
        }).catch((function (error) {
          console.log(error);
        }));
      },
      verselectHandler(key, keyPath) {
        this.activeComponent = this.vermenuList[key-1].component;
      }
    },
  }
</script>

<style scoped>

</style>
