<template>
  <div>
    <div style="text-align: center">
      1
    </div>
    <div>
      <el-row :gutter="24">
        <el-col :span="4" :offset="4">
          <div style="text-align: center">
            Accepted
          </div>
          <div style="text-align: center">
            {{acceptedList.length}}
          </div>
        </el-col>
        <el-col :span="4" :offset="1">
          <div style="text-align: center">
            Challenging
          </div>
          <div style="text-align: center">
            {{challengingList.length}}
          </div>
        </el-col>
        <el-col :span="4" :offset="1">
          <div style="text-align: center">
            Submissions
          </div>
          <div style="text-align: center">
            {{submissionCount}}
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-row :gutter="24">
        <el-col :span="8" :offset="7">
          <div style="text-align: center">
            List of accepted problems
          </div>
          <div style="text-align: center">
            <el-button type="primary" style="background-color: #5cb85c;border-color: #FFFFFF;" v-for="problem in acceptedList" :key="problem.problem" @click="clickHandler(problem.problem)">{{problem.problem}}</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="8" :offset="7">
          <div style="text-align: center">
            List of challenging problems
          </div>
          <div style="text-align: center">
            <el-button type="primary" style="background-color: #d9534f;border-color: #FFFFFF" v-for="problem in challengingList" :key="problem.problem" @click="clickHandler(problem.problem)">{{problem.problem}}</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {getAcceptedProblems, getChallengingProblems, getSubmissions} from '../../api/api'

  export default {
        name: "userhometemplate",
      data() {
        return {
          user_id: '',
          username: '',
          acceptedList: [],
          challengingList: [],
          submissionCount: 0,
        };
      },
      methods:{
        getSubmission() {
          getSubmissions({
            user: this.user_id,
            iscontest: 2,
          }).then((response)=> {
            let data = response.data;
            this.submissionCount = data.count;
          }).catch(function (error) {
            console.log(error);
          });
        },
        getAcceptedProblem() {
          getAcceptedProblems({
            user: this.user_id,
            iscontest: 2,
          }).then((response)=> {
            this.acceptedList = response.data;
          }).catch(function (error) {
            console.log(error);
          });
        },
        getChallengingProblem() {
          getChallengingProblems({
            user: this.user_id,
            iscontest: 2,
          }).then((response)=> {
            this.challengingList = response.data;
          }).catch(function (error) {
            console.log(error);
          });
        },
        clickHandler(problem){
          this.$router.push('/app/problem/' + problem);
        },
      },
      created() {
        if (this.$route.params.user_id !== undefined){
          this.user_id = this.$route.params.user_id;
        } else{
          if (this.$store.state.userInfo !== null){
            this.user_id = this.$store.state.userInfo['id'];
          }
        }
        this.getSubmission();
        this.getAcceptedProblem();
        this.getChallengingProblem();
      }
    }
</script>

<style scoped>

</style>
