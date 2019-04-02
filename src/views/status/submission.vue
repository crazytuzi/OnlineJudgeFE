<template>
  <div>
    <el-table
      :data="submissions"
      style="width: 100%">
      <el-table-column
        label="Problem ID"
        width="200"
        align="center">
        <template slot-scope="scope">
          <router-link tag='a' :to="'/app/problem/' + submissions[scope.$index].problem">
            {{submissions[scope.$index].problem}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="username"
        label="Username"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="result"
        label="Result"
        width="200"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="primary" round size="small" v-if="submissions[scope.$index].result===Status.PENDING" style="background-color: #999;border-color: #FFFFFF">Pending</el-button>
          <el-button type="primary" round size="small" v-else-if="submissions[scope.$index].result===Status.ACCEPTED" style="background-color: #5cb85c;border-color: #FFFFFF">Accepted</el-button>
          <el-button type="primary" round size="small" v-else-if="submissions[scope.$index].result===Status.PRESENTATION_ERROR" style="background-color: #428bca;border-color: #FFFFFF">Presentation Error</el-button>
          <el-button type="primary" round size="small" v-else-if="submissions[scope.$index].result===Status.WRONG_ANSWER" style="background-color: #d9534f;border-color: #FFFFFF">Wrong Answer</el-button>
          <el-button type="primary" round size="small" v-else-if="submissions[scope.$index].result===Status.TIME_LIMIT_EXCEED" style="background-color: #f0ad4e;border-color: #FFFFFF">Time Limit Exceed</el-button>
          <el-button type="primary" round size="small" v-else-if="submissions[scope.$index].result===Status.MEMORY_LIMIT_EXCEED" style="background-color: #f0ad4e;border-color: #FFFFFF">Memory Limit Exceed</el-button>
          <el-button type="primary" round size="small" v-else-if="submissions[scope.$index].result===Status.OUTPUT_LIMIT_EXCEED" style="background-color: #FFFFFF;border-color: #FFFFFF">Output Limit Exceed</el-button>
          <el-button type="primary" round size="small" v-else-if="submissions[scope.$index].result===Status.RUNTIME_ERROR" style="background-color: #d9534f;border-color: #FFFFFF">Runtime Error</el-button>
          <el-button type="primary" round size="small" v-else-if="submissions[scope.$index].result===Status.COMPILE_ERROR" style="background-color: #d9534f;border-color: #FFFFFF">Compile Error</el-button>
          <el-button type="primary" round size="small" v-else-if="submissions[scope.$index].result===Status.RESTRICTED_FUNCTION" style="background-color: #428bca;border-color: #FFFFFF">Restricted Function</el-button>
          <el-button type="primary" round size="small" v-else-if="submissions[scope.$index].result===Status.SYSTEM_ERROR" style="background-color: #428bca;border-color: #FFFFFF">System Error</el-button>
          <el-button type="primary" round size="small" v-else style="background-color: #428bca;border-color: #FFFFFF">Other</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="time_cost"
        label="Time"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="memory_cost"
        label="Memory"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="Language"
        width="200"
        align="center"
      >
        <template slot-scope="scope">
          {{languageCodeToStr[submissions[scope.$index].language]}}
        </template>
      </el-table-column>
    </el-table>
    <div class="codemirror">
      <!-- codemirror -->
      <codemirror v-model="code" :options="cmOption"></codemirror>
    </div>
  </div>
</template>

<script>
    import {getSubmissionDetail} from '../../api/api'
    let Status={
      PENDING : 0,
      ACCEPTED : 1,
      PRESENTATION_ERROR : 2,
      WRONG_ANSWER : 3,
      TIME_LIMIT_EXCEED : 4,
      MEMORY_LIMIT_EXCEED : 5,
      OUTPUT_LIMIT_EXCEED : 6,
      RUNTIME_ERROR : 7,
      COMPILE_ERROR : 8,
      RESTRICTED_FUNCTION : 9,
      SYSTEM_ERROR : 10,
      COMPILE_SPECIAL_JUDGE_ERROR : 11,
      RUN_SPECIAL_JUDGE_ERROR : 12,
      JUDGER_ERROR : 13,
      PARTLY_CORRECT : 14,
      NO_ANSWERS : 15,
      RUN_SUCCESSFULLY : 16
    };
    let languageCodeToStr=[
      'gcc',
      'g++',
      'Python',
      'Java'
    ];
    export default {
        name: "Submission",
        data(){
          return{
            submissions:[],
            code: '',
            cmOption: {
              width: '50%',
              tabSize: 4,
              styleActiveLine: true,
              lineNumbers: true,
              line: true,
              mode: 'text/x-csrc',
              theme: 'solarized light',
            },
            languageCodeToStr: languageCodeToStr,
            Status:Status
          }
        },
      created(){
        this.submission_id = this.$route.params.submission_id;
        this.getSubmission();
      },
      methods: {
        getSubmission() {
          getSubmissionDetail(
            this.submission_id
          ).then((response)=> {
            let data = response.data;
              this.submissions = [];
              this.submissions.push(data);
              if (this.$store.state.userInfo['id']!=data.user && this.$store.state.userInfo['isSuperUser']!='true') {
                console.log("你没有权限查看");
                this.code = '';
              }else{
                this.code = data.code;
              }
          }).catch(function (error) {
            console.log(error);
          });
        },
      }
    }
</script>

<style scoped>

</style>
