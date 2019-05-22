<template>
  <div>
    <div>
      <div style="font-size: 25px;text-align: center">
        {{contest.title}}
      </div>
    </div>
    <div>
      <el-row :gutter="24">
        <el-col :span="20" :offset="1">
          <div>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="0" v-if="this.contest.state === Status.PENDING"></el-progress>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="100" status="success" v-else-if="this.contest.state === Status.ENDED"></el-progress>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="this.percentage" v-else></el-progress>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="3" :offset="2">
          <div class="font"  style="padding-top: 5px">
            Start Time:
          </div>
        </el-col>
        <el-col :span="3">
          <div>
            <el-date-picker
              v-model="start_time"
              type="datetime"
              :readonly="true"
              align="center"
              style="width: 195px;">
            </el-date-picker>
          </div>
        </el-col>
        <el-col :span="3" :offset="4">
          <div class="font" style="padding-top: 5px">
           End Time:
          </div>
        </el-col>
        <el-col :span="3">
          <div>
            <el-date-picker
              v-model="end_time"
              type="datetime"
              :readonly="true"
              align="center"
              style="width: 195px;">
            </el-date-picker>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-row :gutter="24">
      <el-col :span="4">
        <el-menu :default-active="defaultIndex" class="el-menu-vertical-demo" mode="vertical" @select="verselectHandler">
          <el-menu-item v-for = "(menu,index) in vermenuList" :index="menu.index" :key="index"><i :class="menu.icon"></i>{{menu.name}}</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <component :is="activeComponent" v-bind:end_time="end_time"></component>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {getContestDetail} from "../../api/api"
  import contestproblems from "@/views/contest/contestproblems"
  import contestsubmissions from "@/views/contest/contestsubmissions"
  import contestrank from "@/views/contest/contestrank"
  import conteststatistics from "@/views/contest/conteststatistics"
  let Status={
    PENDING : 0,
    RUNNING : 1,
    ENDED : 2,
  };
  export default {
    name: "Contest",
    data(){
      return {
        contest_id: '',
        contest: {},
        percentage: 0,
        start_time: '',
        end_time: '',
        Status: Status,
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
          this.start_time = new Date(response.data.start_time);
          this.end_time = new Date(response.data.end_time);
          if (this.contest.state === this.Status.RUNNING){
            let now = new Date();
            this.percentage = Math.ceil((now-this.start_time)/(this.end_time-this.start_time)*100);
          }
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
