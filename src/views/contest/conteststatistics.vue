<template>
  <div>
    <el-table
      :data="problems"
      style="width: 100%"
      :row-style="{height: '40px'}"
      :cell-style="{padding: '0'}">
      <el-table-column
        label="ID"
        width="100"
        align="center">
        <template slot-scope="scope" >
          <router-link tag='a' :to="'/app/problem/' + problems[scope.$index].id" >
            {{problems[scope.$index].parent_problem}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        label="Title"
        width="150"
        align="center">
        <template slot-scope="scope" >
          <router-link tag='a' :to="'/app/problem/' + problems[scope.$index].id" >
            {{problems[scope.$index].title}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="submission_number"
        label="Total"
        width="150"
        align="center">
      </el-table-column>
      <el-table-column
        prop="accepted_number"
        label="AC"
        width="150"
        align="center">
      </el-table-column>
      <el-table-column
        prop="wrong_answer_number"
        label="WA"
        width="150"
        align="center">
      </el-table-column>
      <el-table-column
        prop="time_limit_number"
        label="TLE"
        width="150"
        align="center">
      </el-table-column>
      <el-table-column
        prop="memory_limit_number"
        label="MLE"
        width="150"
        align="center">
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
    import {getProblems} from '../../api/api'
    export default {
        name: "conteststatistics",
        data() {
          return {
            contest: 1,
            problems: [],
            pageSize: 3,
            total: 1000,
          };
        },
        created(){
          this.contest_id = this.$route.params.contest_id;
          this.getProblem();
        },
        methods: {
          getProblem() {
            getProblems({
              contest: this.contest_id
            }).then((response)=> {
              let data = response.data;
              this.problems = data.results;
              this.total = data.count;
            }).catch(function (error) {
              console.log(error);
            });
          },
          currentChangeHandler(e){
            getProblems({
              contest: this.contest_id,
              page: e
            }).then((response)=> {
              let data = response.data;
              this.problems = data.results;
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
