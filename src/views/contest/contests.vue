<template>
  <div>
    <div>
      <el-row :gutter="20">
        <el-col :span="4" :offset="2"><div>
          <el-select v-model="state" placeholder="State">
            <el-option
              v-for="item in states"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div></el-col>
        <el-col :span="4"><div>
          <el-input v-model="contestId" placeholder="Contest ID" style="width: 200px"></el-input>
        </div></el-col>
        <el-col :span="4"><div>
          <el-input v-model="title" placeholder="Title" style="width: 200px"></el-input>
        </div></el-col>
        <el-col :span="4"><div>
          <el-button type="primary" icon="el-icon-search" circle @click="searchHandle"></el-button>
        </div></el-col>
      </el-row>
    </div>
    <div>
      <el-table
        :data="contests"
        style="width: 100%"
        :row-style="{height: '55px'}"
        :cell-style="{padding: '0'}"
       >
        <el-table-column
          label="ID"
          width="75"
          align="center">
          <template slot-scope="scope" >
            <router-link tag='a' :to="'/app/contest/' + contests[scope.$index].id" >
              {{contests[scope.$index].id}}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          label="Title"
          width="450"
          align="center">
          <template slot-scope="scope" >
            <router-link tag='a' :to="'/app/contest/' + contests[scope.$index].id" >
              {{contests[scope.$index].title}}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="start_time"
          label="Start Time"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          prop="end_time"
          label="End Time"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          label="State"
          width="150"
          align="center">
          <template slot-scope="scope" >
            <el-button type="primary" round size="small" v-if="contests[scope.$index].state===Status.PENDING" style="background-color: #428bca;border-color: #FFFFFF">Pending</el-button>
            <el-button type="primary" round size="small" v-else-if="contests[scope.$index].state===Status.RUNNING" style="background-color: #5cb85c;border-color: #FFFFFF">Running</el-button>
            <el-button type="primary" round size="small" v-else-if="contests[scope.$index].state===Status.ENDED" style="background-color: #d9534f;border-color: #FFFFFF">Ended</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="Creator"
          width="150"
          align="center">
          <template slot-scope="scope" >
            {{contests[scope.$index].creator}}
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next"
                     @current-change="currentChangeHandler"
                     @prev-click="currentChangeHandler"
                     @next-click="currentChangeHandler"
                     :total="total"
                     :page-size="pageSize">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {getContests} from "../../api/api";
  let Status={
    PENDING : 0,
    RUNNING : 1,
    ENDED : 2,
  };
  export default {
        name: "Contests",
        data() {
          return {
            contests: [],
            pageSize: 5,
            total: 10000,
            states: [{
              value: '',
              label: 'State'
            }, {
              value: Status.PENDING,
              label: 'Pending'
            }, {
              value: Status.RUNNING,
              label: 'Running'
            }, {
              value: Status.ENDED,
              label: 'Ended'
            }],
            state: '',
            contestId: '',
            title: '',
            Status: Status,
          };
        },
        created(){
            this.getContest();
        },
        methods: {
          getContest() {
            getContests().then((response)=> {
              let data = response.data;
              this.contests = data.results;
              this.total = data.count;
            }).catch(function (error) {
              console.log(error);
            });
          },
          currentChangeHandler(e){
            getContests({
              contest_id: this.contestId,
              title: this.title,
              state_filter: this.state,
              page: e
            }).then((response)=> {
              let data = response.data;
              this.contests = data.results;
              this.total = data.count;
            }).catch(function (error) {
              console.log(error);
            });
          },
          searchHandle(){
            getContests({
              contest_id: this.contestId,
              title: this.title,
              state_filter: this.state,
            }).then((response)=> {
              let data = response.data;
              this.contests = data.results;
              this.total = data.count;
            }).catch(function (error) {
              console.log(error);
            });
          },
        },
  }
</script>

<style scoped>

</style>
