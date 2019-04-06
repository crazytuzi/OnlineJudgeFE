<template>
  <div>
    <el-table
      :data="problems"
      style="width: 100%"
      :row-style="{height: '45px'}"
      :cell-style="{padding: '0'}">
      <el-table-column
        label="AC"
        width="250"
        align="center">
        <template slot-scope="scope">
          <div v-if="that.$store.state.userInfo['id']!==null && that.$store.state.userInfo['name']!==null && that.$store.state.userInfo['token']!==null">
            <i class="el-icon-check" v-if="that.$store.state.userAcceptedProblems!==null&&that.$store.state.userAcceptedProblems.hasOwnProperty(problems[scope.$index].id)"></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Problem"
        width="250"
        align="center">
        <template slot-scope="scope" >
          <router-link tag='a' :to="'/app/problem/' + problems[scope.$index].id" >
            {{problems[scope.$index].parent_problem}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        label="Title"
        width="250"
        align="center">
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
  import {getProblems} from "../../api/api";
  export default {
        name: "contestproblems",
        data() {
          return {
            contest_id: 0,
            problems: [],
            pageSize: 5,
            total: 1000,
            that: this
          };
        },
        created(){
          this.contest_id = this.$route.params.contest_id;
          this.getProblem();
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
        },
  }
</script>

<style scoped>

</style>
