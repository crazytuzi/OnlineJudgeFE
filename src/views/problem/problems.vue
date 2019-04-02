<template>
  <div>
    <div>
      <el-row :gutter="20">
        <el-col :span="4"><div>
          <el-input v-model="problemId" placeholder="Problem ID" style="width: 200px"></el-input>
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
        :data="problems"
        style="width: 100%">
        <el-table-column
          label="AC"
          width="150"
          align="center">
          <template slot-scope="scope">
            <div v-if="that.$store.state.userInfo['id']!==null && that.$store.state.userInfo['name']!==null && that.$store.state.userInfo['token']!==null">
              <i class="el-icon-check" v-if="that.$store.state.userAcceptedProblems!==null&&that.$store.state.userAcceptedProblems.hasOwnProperty(problems[scope.$index].id)"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="ID"
          width="150"
          align="center">
          <template slot-scope="scope">
            <router-link tag='a' :to="'/app/problem/' + problems[scope.$index].id" >
              {{problems[scope.$index].problem_id}}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          label="Title"
          width="500"
          align="center">>
          <template slot-scope="scope" >
            <router-link tag='a' :to="'/app/problem/' + problems[scope.$index].id" >
              {{problems[scope.$index].title}}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          label="AC Rate"
          width="200"
          align="center">>
          <template slot-scope="scope">
            <el-progress :percentage="calculateACRate(scope.$index)"></el-progress>
          </template>
        </el-table-column>
        <el-table-column
          prop="submission_number"
          label="Submissions"
          width="200"
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
            title: '',
            problemId: '',
            that: this
          };
        },
      created(){
        this.getProblem();
      },
      methods: {
          getProblem() {
            getProblems({
              iscontest: 2,
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
              iscontest: 2,
              title: this.title,
              problem_id: this.problemId,
              page: e,
              }).then((response)=> {
              let data = response.data;
              this.problems = data.results;
              this.total = data.count;
            }).catch(function (error) {
              console.log(error);
            });
          },
          calculateACRate(index){
            if(this.problems[index].submission_number === 0)
              return 0;
            return parseInt(this.problems[index].accepted_number/this.problems[index].submission_number*100);
          },
        searchHandle(){
          let that = this;
          getProblems({
            iscontest: 2,
            title: this.title,
            problem_id: this.problemId,
          }).then((response)=> {
            let data = response.data;
            this.problems = data.results;
            this.total = data.count;
          }).catch(function (error) {
            console.log(error);
            that.problems = [];
            that.total = 0;
          });
        },
      },
    }
</script>

<style scoped>
</style>
