<template>
  <div>
    <el-table
      :data="problems"
      style="width: 100%">
      <el-table-column
        label="ID"
        width="180">
        <template slot-scope="scope" >
          <router-link tag='a' :to="'/app/problem/' + problems[scope.$index].id" >
            {{problems[scope.$index].problem_id}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        label="Title"
        width="180">
        <template slot-scope="scope" >
          <router-link tag='a' :to="'/app/problem/' + problems[scope.$index].id" >
            {{problems[scope.$index].title}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        label="AC Rate"
        width="180">
        <template slot-scope="scope">
          <el-progress :percentage="calculateACRate(scope.$index)"></el-progress>
        </template>
      </el-table-column>
      <el-table-column
        prop="submission_number"
        label="Submissions"
        width="180">
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
        name: "Problems",
        data(){
          return {
            problems: [],
            pageSize: 3,
            total: 1000,
          };
        },
      created(){
        this.getProblem();
      },
      methods: {
          getProblem() {
            getProblems().then((response)=> {
              let data = response.data;
              this.problems = data.results;
              this.total = data.count;
            }).catch(function (error) {
              console.log(error);
            });
          },
          currentChangeHandler(e){
            getProblems({
              "page":e
              }).then((response)=> {
              let data = response.data;
              this.problems = data.results;
              this.total = data.count;
            }).catch(function (error) {
              console.log(error);
            });
          },
          calculateACRate(index){
            if(this.problems[index].submission_number == 0)
              return 0;
            return parseInt(this.problems[index].accepted_number/this.problems[index].submission_number*100);
          },
      },
    }
</script>

<style scoped>
  a:link {
    text-decoration: none;
    color: blue;
  }
  a:visited {
    text-decoration: none;
    color: blue;
  }
</style>
