<template>
  <div>
    <el-table
      :data="contests"
      style="width: 100%">
      <el-table-column
        label="ID"
        width="180">
        <template slot-scope="scope" >
          <router-link tag='a' :to="'/app/contests/' + contests[scope.$index].id" >
            {{contests[scope.$index].id}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        label="Title"
        width="180">
        <template slot-scope="scope" >
          <router-link tag='a' :to="'/app/contests/' + contests[scope.$index].id" >
            {{contests[scope.$index].title}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="start_time"
        label="Start Time"
        width="180">
      </el-table-column>
      <el-table-column
        prop="end_time"
        label="End Time"
        width="180">
      </el-table-column>
      <el-table-column
        label="State"
        width="180">
        <template slot-scope="scope" >
            {{contests[scope.$index].state}}
        </template>
      </el-table-column>
      <el-table-column
        label="Creator"
        width="180">
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
</template>

<script>
  import {getContests} from "../../api/api";

  export default {
        name: "Contests",
        data() {
          return {
            contests: [],
            pageSize: 3,
            total: 10000,
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
              page: e
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
