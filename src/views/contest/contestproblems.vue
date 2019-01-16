<template>
  <div>
    <el-table
      :data="problems"
      style="width: 100%">
      <el-table-column
        label="AC?"
        width="180">
        <template slot-scope="scope" >
            {{isAc(scope.$index)}}
        </template>
      </el-table-column>
      <el-table-column
        label="Problem"
        width="180">
        <template slot-scope="scope" >
            {{problems[scope.$index].parent_problem}}
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
  import {getProblems,getAcceptedProblems} from "../../api/api";

  export default {
        name: "contestproblems",
        data() {
          return {
            contest_id: 0,
            problems: [],
            acceptList: [],
            pageSize: 3,
            total: 1000,
          };
        },
        created(){
          this.contest_id = this.$route.params.contest_id;
          this.getProblem();
          this.getAcceptedProblem();
        },
        methods: {
          getProblem() {
            getProblems({
              contest: this.contest_id,
            }).then((response)=> {
              let data = response.data;
              this.problems = data.results;
              this.total = data.count;
            }).catch(function (error) {
              console.log(error);
            });
          },
          getAcceptedProblem() {
            getAcceptedProblems({
              user: this.$store.state.userInfo['id'],
              problem__contest: this.contest_id
            }).then((response)=> {
              let data = response.data;
              this.acceptList = data;
            }).catch(function (error) {
              console.log(error);
            });
          },
          currentChangeHandler(e){
            getProblems({
              contest: this.contest_id,
              page: e,
            }).then((response)=> {
              let data = response.data;
              this.problems = data.results;
              this.total = data.count;
            }).catch(function (error) {
              console.log(error);
            });
          },
          isAc(index){
            for(let i=0;i<this.acceptList.length;++i){
              if (this.problems[index].id === this.acceptList[i].problem) {
                  return "AC";
              }
            }
            return "NOT AC";
          },
        },
  }
</script>

<style scoped>

</style>
