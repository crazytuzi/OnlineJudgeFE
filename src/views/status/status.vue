<template>
    <div>
        <div>
          <el-row :gutter="20">
            <el-col :span="4"><div>
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
                  v-for="item in languages"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div></el-col>
            <el-col :span="4"><div>
              <el-input v-model="username" placeholder="Username" style="width: 200px"></el-input>
            </div></el-col>
            <el-col :span="4"><div>
              <el-input v-model="problemId" placeholder="Problem ID" style="width: 200px"></el-input>
            </div></el-col>
            <el-col :span="4"><div>
              <el-button type="primary" icon="el-icon-search" circle @click="searchHandle"></el-button>
            </div></el-col>
          </el-row>
        </div>
      <div>
        <el-table
          :data="submissions"
          style="width: 100%">
          <el-table-column
            prop="id"
            label="ID"
            width="180">
          </el-table-column>
          <el-table-column
            label="Problem ID"
            width="180">
            <template slot-scope="scope" >
              <router-link tag='a' :to="'/app/problem/' + submissions[scope.$index].problem" >
                {{submissions[scope.$index].problem}}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="username"
            label="Username"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="result"
            label="Result"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="time_cost"
            label="Time"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="memory_cost"
            label="Memory"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="submit_time"
            label="Submit Time"
            width="180"
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
    export default {
        name: "Status",
        data(){
          return {
            results: [{
              value: '',
              label: 'Result'
            }, {
              value: '0',
              label: 'Pending'
            }, {
              value: '1',
              label: 'Accepted'
            }, {
              value: '2',
              label: 'Presentation Error'
            }, {
              value: '3',
              label: 'Wrong Answer'
            }, {
              value: '4',
              label: 'Time Limit Exceed'
            }, {
              value: '5',
              label: 'Memory Limit Exceed'
            }, {
              value: '6',
              label: 'Output Limit Exceed'
            }, {
              value: '7',
              label: 'Runtime Error'
            }, {
              value: '8',
              label: 'Compile Error'
            }, {
              value: '10',
              label: 'System Error'
            }],
            languages: [{
              value: 'C',
              label: 'C'
            }, {
              value: 'C++',
              label: 'C++'
            }, {
              value: 'Java',
              label: 'Java'
            }, {
              value: 'Python',
              label: 'Python'
            }],
            result: '',
            language: 'C++',
            username: '',
            problemId: '',
            submissions: [],
            pageSize: 5,
            total: 1000,
          };
        },
        created(){
          this.getSubmission();
        },
        methods:{
          getSubmission() {
            getSubmissions().then((response)=> {
              let data = response.data;
              this.submissions = data.results;
              this.total = data.count;
            }).catch(function (error) {
              console.log(error);
            });
          },
          currentChangeHandler(e){
            getSubmissions({
              page: e,
              problem: this.problemId,
              user__username: this.username,
              result: this.result
            }).then((response)=> {
              let data = response.data;
              this.submissions = data.results;
              this.total = data.count;
            }).catch(function (error) {
              console.log(error);
            });
          },
          searchHandle(){
            let that = this;
            getSubmissions({
              problem: this.problemId,
              user__username: this.username,
              result: this.result
            }).then((response)=> {
              let data = response.data;
              this.submissions = data.results;
              this.total = data.count;
            }).catch(function (error) {
              console.log(error);
              that.submissions = [];
              that.total = 0;
            });
          },
        },
    }
</script>

<style>
</style>
