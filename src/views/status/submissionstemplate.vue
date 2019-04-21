<template>
  <div>
    <div>
      <el-row :gutter="24">
        <el-col :span="4" :offset="2"><div>
          <el-select v-model="result" placeholder="Result">
            <el-option
              v-for="item in results"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div></el-col>
        <el-col :span="4"><div>
          <el-select v-model="language" placeholder="Language">
            <el-option
              v-for="item in Languages"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div></el-col>
        <el-col :span="4"><div>
          <el-input v-model="username" placeholder="Username"></el-input>
        </div></el-col>
        <el-col :span="4"><div>
          <el-input v-model="problemId" placeholder="Problem ID"></el-input>
        </div></el-col>
        <el-col :span="4"><div>
          <el-button type="primary" icon="el-icon-search" circle @click="searchHandle"></el-button>
        </div></el-col>
      </el-row>
    </div>
    <div>
      <el-table
        :data="submissions"
        style="width: 100%"
        :row-style="{height: '45px'}"
        :cell-style="{padding: '0'}"
      >
        <el-table-column
          prop="id"
          label="ID"
          width="75"
          align="center">
        </el-table-column>
        <el-table-column
          label="Problem ID"
          width="100"
          align="center">
          <template slot-scope="scope">
            <router-link tag='a' :to="'/app/problem/' + submissions[scope.$index].problem">
              {{submissions[scope.$index].problem}}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          label="Username"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <router-link tag='a' :to="'/app/user/' + submissions[scope.$index].user">
              {{submissions[scope.$index].username}}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="result"
          label="Result"
          width="180"
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
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="memory_cost"
          label="Memory"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="Language"
          width="180"
          align="center"
        >
          <template slot-scope="scope">
            <router-link tag='a' :to="'/app/submission/' + submissions[scope.$index].id" v-if="
              that.$store.state.userInfo['id']==submissions[scope.$index].user || that.$store.state.userInfo['isSuperUser']=='true'">
              {{languageCodeToStr[submissions[scope.$index].language]}}
            </router-link>
            <template v-else>{{languageCodeToStr[submissions[scope.$index].language]}}</template>
          </template>
        </el-table-column>
        <el-table-column
          prop="submit_time"
          label="Submit Time"
          width="180"
          align="center"
        >
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
    import {getSubmissions} from '../../api/api'
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
    let Languages={
      'gcc' : 0,
      'g++' : 1,
      'Python2' : 2,
      'Python3' : 3,
      'Java' : 4
    };
    let languageCodeToStr=[
      'gcc',
      'g++',
      'Python2',
      'Python3',
      'Java'
    ];
    export default {
      name: "submissionstemplate",
      props: ["contest_id"],
      data() {
        return {
          results: [{
            value: '',
            label: 'Result'
          }, {
            value: Status.PENDING,
            label: 'Pending'
          }, {
            value: Status.ACCEPTED,
            label: 'Accepted'
          }, {
            value: Status.PRESENTATION_ERROR,
            label: 'Presentation Error'
          }, {
            value: Status.WRONG_ANSWER,
            label: 'Wrong Answer'
          }, {
            value: Status.TIME_LIMIT_EXCEED,
            label: 'Time Limit Exceed'
          }, {
            value: Status.MEMORY_LIMIT_EXCEED,
            label: 'Memory Limit Exceed'
          }, {
            value: Status.OUTPUT_LIMIT_EXCEED,
            label: 'Output Limit Exceed'
          }, {
            value: Status.RUNTIME_ERROR,
            label: 'Runtime Error'
          }, {
            value: Status.COMPILE_ERROR,
            label: 'Compile Error'
          }, {
            value: Status.RESTRICTED_FUNCTION,
            label: 'Restricted Function'
          }, {
            value: Status.SYSTEM_ERROR,
            label: 'System Error'
          }],
          Languages: [{
            value: '',
            label: 'Language'
          }, {
            value: Languages.gcc,
            label: 'gcc'
          }, {
            value: Languages["g++"],
            label: 'g++'
          }, {
            value: Languages.Python2,
            label: 'Python2'
          }, {
            value: Languages.Python3,
            label: 'Python3'
          }, {
            value: Languages.Java,
            label: 'Java'
          }],
          result: '',
          language: '',
          username: '',
          problemId: '',
          submissions: [],
          pageSize: 5,
          total: 1000,
          Status: Status,
          languageCodeToStr: languageCodeToStr,
          that: this
        };
      },
      created() {
        this.getSubmission();
      },
      methods: {
        getSubmission() {
          getSubmissions({
            contest: this.contest_id,
          }).then((response) => {
            let data = response.data;
            this.submissions = data.results;
            this.total = data.count;
            this.updateStore(data.results);
          }).catch(function (error) {
            console.log(error);
          });
        },
        currentChangeHandler(e) {
          getSubmissions({
            page: e,
            problem: this.problemId,
            user__username: this.username,
            result: this.result,
            language: this.language,
            contest: this.contest_id,
          }).then((response) => {
            let data = response.data;
            this.submissions = data.results;
            this.total = data.count;
            this.updateStore(data.results);
          }).catch(function (error) {
            console.log(error);
          });
        },
        searchHandle() {
          let that = this;
          getSubmissions({
            problem: this.problemId,
            user__username: this.username,
            result: this.result,
            language: this.language,
            contest: this.contest_id,
          }).then((response) => {
            let data = response.data;
            this.submissions = data.results;
            this.total = data.count;
            this.updateStore(data.results);
          }).catch(function (error) {
            console.log(error);
            that.submissions = [];
            that.total = 0;
          });
        },
        updateStore(submissions) {
          let userInfo = this.$store.state.userInfo;
          if (userInfo['id'] != null && userInfo['name'] != null && userInfo['token'] != null) {
            for (let submission of submissions) {
              if (submission['user'] == userInfo['id']) {
                if (submission['result'] == this.Status.ACCEPTED) {
                  if (this.$store.state.userAcceptedProblems !== null && !this.$store.state.userAcceptedProblems.hasOwnProperty(submission.problem)) {
                    this.$store.state.userAcceptedProblems[submission['problem']] = submission['submit_time'];
                    localStorage.setItem('acceptedproblems', JSON.stringify(this.$store.state.userAcceptedProblems));
                    this.$store.dispatch('setAcceptedProblems');
                  }
                } else {
                  if (this.$store.state.userAcceptedProblems !== null && !this.$store.state.userAcceptedProblems.hasOwnProperty(submission.problem)) {
                    if (this.$store.state.userChallengingProblems !== null && !this.$store.state.userChallengingProblems.hasOwnProperty(submission.problem)) {
                      this.$store.state.userChallengingProblems[submission['problem']] = submission['submit_time'];
                      localStorage.setItem('challengingproblems', JSON.stringify(this.$store.state.userChallengingProblems));
                      this.$store.dispatch('setChallengingProblems');
                    }
                  }
                }
              }
            }
          }
        },
      }
    }
</script>

<style scoped>

</style>
