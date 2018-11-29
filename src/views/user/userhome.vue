<template>
    <div>
      <div>
        ACCount{{acceptCount}}
        SubCount{{submitCount}}
        ChallengeCount{{challengeCount}}
      </div>
    </div>
</template>

<script>
  import cookie from '../../static/js/cookie'
  import {getSubmissions,getAcceptedProblems,getChallengingProblems} from '../../api/api'
    export default {
      data() {
        return {
          username: cookie.getCookie("name"),
          acceptCount: 0,
          submitCount: 0,
          challengeCount: 0,
        };
      },
      created(){
          this.getSubmission();
          this.getAcceptedProblem();
          this.getChallengingProblem();
      },
      methods: {
        getAcceptedProblem() {
          getAcceptedProblems({
            user: cookie.getCookie('id'),
            iscontest: 2,
          }).then((response)=> {
            let data = response.data;
            this.acceptCount = data.count;
          }).catch(function (error) {
            console.log(error);
          });
        },
        getSubmission() {
          getSubmissions({
            user: cookie.getCookie('id'),
            iscontest: 2,
          }).then((response)=> {
            let data = response.data;
            this.submitCount = data.count;
          }).catch(function (error) {
            console.log(error);
          });
        },
        getChallengingProblem() {
          getChallengingProblems({
            user: cookie.getCookie('id'),
          }).then((response)=> {
            let data = response.data;
            this.challengeCount = data.count;
          }).catch(function (error) {
            console.log(error);
          });
        },
      },
    }
</script>

<style scoped>

</style>
