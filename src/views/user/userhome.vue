<template>
    <div>
      <div>
        ACCount{{acceptCount}}
        SubCount{{submitCount}}
        ChallengeCount{{challengeCount}}
      </div>
      <div>
        List of accepted problems
        <el-button type="success" v-for="problem in acceptList" :key="problem.problem">{{problem.problem}}</el-button>
      </div>
      <div>
        List of challenging problems
        <el-button type="success" v-for="problem in challengeList" :key="problem.problem">{{problem.problem}}</el-button>
      </div>
    </div>
</template>

<script>
  import {getSubmissions} from '../../api/api'
  export default {
      data() {
        return {
          username: this.$store.state.userInfo['name'],
          acceptCount: this.$store.state.userAcceptedProblems.length,
          acceptList: this.$store.state.userAcceptedProblems,
          submitCount: 0,
          challengeCount: this.$store.state.userChallengingProblems.length,
          challengeList: this.$store.state.userChallengingProblems,
        };
      },
      methods:{
        getSubmission() {
          getSubmissions({
            user: this.$store.state.userInfo['id'],
            iscontest: 2,
          }).then((response)=> {
            let data = response.data;
            this.submitCount = data.count;
          }).catch(function (error) {
            console.log(error);
          });
        },
      },
      created() {
          this.getSubmission();
      }
  }
</script>

<style scoped>

</style>
