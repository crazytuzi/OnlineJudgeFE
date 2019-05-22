<template>
  <div>
    <div style="text-align: center">
        <img :src="userprofile.avatar" width="100" height="100"/>
        <div style="color: #08c">{{userprofile['username']}}</div>
    </div>
    <hr style="width: 85%">
    <div>
      <el-row :gutter="20">
        <el-col :span="4" :offset="2" class="field">
          Real Name
        </el-col>
        <el-col :span="5">
          <div class="info">
            {{userprofile['real_name']}}
          </div>
        </el-col>
        <el-col :span="4" :offset="2" class="field">
          Student ID
        </el-col>
        <el-col :span="5">
          <div class="info">
            {{userprofile['student_no']}}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4" :offset="2" class="field">
          QQ
        </el-col>
        <el-col :span="5">
          <div class="info">
            {{userprofile['QQ']}}
          </div>
        </el-col>
        <el-col :span="4" :offset="2" class="field">
          blog
        </el-col>
        <el-col :span="5">
          <div class="info">
            {{userprofile['blog']}}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4" :offset="2" class="field">
          mood
        </el-col>
        <el-col :span="16">
          <div class="info">
            {{userprofile['mood']}}
          </div>
        </el-col>
      </el-row>
    </div>
    <hr style="width: 85%">
    <div>
      <el-row :gutter="24">
        <el-col :span="4" :offset="4">
          <div style="text-align: center" class="field">
            Accepted
          </div>
          <div style="text-align: center">
            {{acceptedList.length}}
          </div>
        </el-col>
        <div style="float:left;width: 1px;height: 40px; background: #9f9f9f;"></div>
        <el-col :span="4" :offset="1">
          <div style="text-align: center" class="field">
            Challenging
          </div>
          <div style="text-align: center">
            {{challengingList.length}}
          </div>
        </el-col>
        <div style="float:left;width: 1px;height: 40px; background: #9f9f9f;"></div>
        <el-col :span="4" :offset="1">
          <div style="text-align: center" class="field">
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
          <div style="text-align: center" class="field">
            List of accepted problems
          </div>
          <div style="text-align: center">
            <el-button type="primary" style="background-color: #5cb85c;border-color: #FFFFFF;" v-for="problem in acceptedList" :key="problem.problem" @click="clickHandler(problem.problem)">{{problem.problem}}</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="8" :offset="7">
          <div style="text-align: center" class="field">
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
  import {getAcceptedProblems, getChallengingProblems, getSubmissions,getRanks} from '../../api/api'

  export default {
        name: "userhometemplate",
      data() {
        return {
          user_id: '',
          username: '',
          acceptedList: [],
          challengingList: [],
          submissionCount: 0,
          userprofile: {},
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
        getUserProfile(){
          getRanks({
            user: this.user_id
          }).then((response)=> {
            let data = response.data;
            if (data.results.length>0){
              this.userprofile = data.results[0];
            }
          }).catch(function (error)
          {
            console.log(error);
          })
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
        this.getUserProfile();
      }
    }
</script>

<style scoped>
  .info{
    color: #58992a;
  }
  .field{
    color: #9f9f9f;
  }
</style>
