<template>
  <div>
    <el-table
      :data="submissions"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        label="Problem ID"
        width="180">
        <template slot-scope="scope" >
          <router-link tag='a' :to="'/app/problem/' + submissions[scope.$index].problem" >
            {{submissions[scope.$index].problem}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="result"
        label="Result"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="time_cost"
        label="Time"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="memory_cost"
        label="Memory"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="submit_time"
        label="Submit Time"
        width="180"
      >
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
    import {getSubmissions} from "../../api/api";
    export default {
      data(){
        return {
          submissions: [],
          pageSize: 10,
          total: 1000,
        };
      },
      created() {
        this.getSubmission();
      },
      methods: {
        getSubmission() {
          getSubmissions({
            user: this.$store.state.userInfo['id'],
            iscontest: 2
          }).then((response)=> {
            let data = response.data;
            this.submissions = data.results;
            this.total = data.count;
          }).catch(function (error) {
            console.log(error);
          });
        },
        currentChangeHandler(e){
          getSubmissions({
            user: this.$store.state.userInfo['id'],
            iscontest: 2,
            page: e
          }).then((response)=> {
            let data = response.data;
            this.submissions = data.results;
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
