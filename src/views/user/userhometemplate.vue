<template>
  <div>
    <div style="text-align: center">
      1
    </div>
    <div>
      ACCount{{acceptedList.length}}
      SubCount{{submissionCount}}
      ChallengeCount{{challengingList.length}}
    </div>
    <div>
      List of accepted problems
      <el-button type="success" v-for="problem in acceptedList" :key="problem.problem">{{problem.problem}}</el-button>
    </div>
    <div>
      List of challenging problems
      <el-button type="success" v-for="problem in challengingList" :key="problem.problem">{{problem.problem}}</el-button>
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
