<template>
    <div style="min-height: 1000px">
      <el-row :gutter="20">
        <el-col :span="16" :offset="1">
          <div>
            <div style="font-size: 25px">
              {{problem.title}}
            </div>
          </div>
          <div>
            <div class="font">
              Description
            </div>
            {{problem.description}}
          </div>
          <div>
            <div class="font">
              Input
            </div>
            {{problem.input_description}}
          </div>
          <div>
            <div class="font">
              Output
            </div>
            {{problem.output_description}}
          </div>
          <div>
            <div class="font">
              Sample Input
            </div>
            {{problem.sample_input}}
          </div>
          <div>
            <div class="font">
              Sample Output
            </div>
            {{problem.sample_output}}
          </div>
          <div>
            <div style="display:inline">
              Languages:
            </div>
            <div style="display:inline">
              <el-select v-model="language" placeholder="gcc">
                <el-option
                  v-for="item in Languages"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="codemirror" style="width: 500px;">
            <!-- codemirror -->
            <codemirror v-model="code" :options="cmOption"></codemirror>
          </div>
          <div>
            <el-button type="primary"
                       @click="submitHandle">提交代码
            </el-button>
          </div>
        </el-col>
        <el-col :span="4">
          <div>
            <el-progress type="circle" :percentage="100" status="success" :width="43" v-if="that.$store.state.userAcceptedProblems!==null&&that.$store.state.userAcceptedProblems.hasOwnProperty(problem_id)"></el-progress>
            <el-progress type="circle" :percentage="50" status="exception" :width="43" v-else-if="that.$store.state.userChallengingProblems!==null&&that.$store.state.userChallengingProblems.hasOwnProperty(problem_id)"></el-progress>
            <el-progress type="circle" :percentage="0" :width="43" :show-text="false" v-else></el-progress>
          </div>
          <div>
            <div v-if="problem.parent_problem===null&&this.$store.state.userInfo['id']!==null
        &&this.$store.state.userInfo['name']!==null&&this.$store.state.userInfo['token']!==null">
              <el-button type="primary" icon="el-icon-oj-aixin_shixin" circle v-if="isCollect" @click="collectHandle"></el-button>
              <el-button type="primary" icon="el-icon-oj-aixin" circle v-else @click="collectHandle"></el-button>
            </div>
          </div>
          <div>
            <div>
              <i class="el-icon-info"> Information</i>
            </div>
            <div>
              <div>
                ID:{{problem_id}}
              </div>
              <div>
                Time Limit:{{problem.time_limit}}
              </div>
              <div>
                Memory Limit:{{problem.memory_limit}}
              </div>
              <div>
                Accepted:{{problem.accepted_number}}
              </div>
              <div>
                Submission:{{problem.submission_number}}
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <div>
    </div>
    </div>
</template>

<script>
    import 'codemirror/theme/solarized.css'
    import 'codemirror/mode/clike/clike.js'
    import {getProblemDetail, addSubmission, addCollection, getCollections, delCollection} from "../../api/api"
    let Languages={
      'gcc' : 0,
      'g++' : 1,
      'Python' : 2,
      'Java' : 3
    };
    export default {
        name: "Problem",
        data(){
          const code = `#include <stdio.h>
int main()
{
    int a,b;
    scanf("%d%d",&a,&b);
    printf("%d",a+b);
    return 0;
}`;
          return {
            code,
            problem_id: '',
            problem: {},
            isCollect: false,
            cmOption: {
              width: '50%',
              tabSize: 4,
              styleActiveLine: true,
              lineNumbers: true,
              line: true,
              mode: 'text/x-csrc',
              theme: 'solarized light',
            },
            Languages: [{
              value: Languages.gcc,
              label: 'gcc'
            }, {
              value: Languages["g++"],
              label: 'g++'
            }, {
              value: Languages.Python,
              label: 'Python'
            }, {
              value: Languages.Java,
              label: 'Java'
            }],
            language: Languages.gcc,
            that: this,
          };
        },
        created(){
          this.problem_id = this.$route.params.problem_id;
          this.getProblem();
        },
        methods: {
            getProblem(){
              getProblemDetail(
                this.problem_id
              ).then((response)=>{
                this.problem = response.data;
                let userInfo = this.$store.state.userInfo;
                if (userInfo['id'] != null && userInfo['name'] != null
                  && userInfo['token'] != null&&this.$store.state.userCollections!=null)
                {
                  this.isCollect = this.$store.state.userCollections.hasOwnProperty(this.problem_id);
                }
              }).catch((function (error) {
                console.log(error);
              }));
            },
            submitHandle(){
            let userInfo = this.$store.state.userInfo;
            if (userInfo['id'] != null && userInfo['name'] != null
              && userInfo['token'] != null)
            {
              addSubmission({
                user: userInfo['id'],
                problem:this.problem_id,
                language:this.language,
                code: this.code,
              }).then((response)=> {
                this.$store.state.topnavigation='3';
                this.$router.push("/app/status");
              }).catch(function (error) {
                console.log(error);
              });
            }
            else
            {
              console.log("你没有登陆");
            }
          },
          collectHandle(){
            let userInfo = this.$store.state.userInfo;
            if (userInfo['id'] != null && userInfo['name'] != null
              && userInfo['token'] != null)
            {
              if (this.isCollect){
                getCollections({
                  user: this.$store.state.userInfo['id'],
                  problem: this.problem.id
                }).then((response)=> {
                  let data = response.data;
                  if (data.count>0){
                    let collectionId = data.results[0]['id'];
                    delCollection(
                      collectionId
                    ).then((response)=>{
                      if (response.status === 200){
                        delete this.$store.state.userCollections[this.problem_id];
                        this.$store.dispatch('setCollections');
                        this.isCollect = false;
                      }
                    }).catch(function (error) {
                      console.log(error);
                    });
                  }
                }).catch(function (error) {
                  console.log(error);
                });
              } else{
                addCollection({
                  user: userInfo['id'],
                  problem:this.problem_id,
                }).then((response)=> {
                  let data = response.data;
                  if (this.$store.state.userCollections==null){
                    this.$store.state.userCollections={};
                  }
                  this.$store.state.userCollections[this.problem.id] = data['create_time'];
                  this.$store.dispatch('setCollections');
                  this.isCollect = true;
                }).catch(function (error) {
                  console.log(error);
                });
              }
            }
            else
            {
              console.log("你没有登陆");
            }
          },
        },
    }
</script>

<style scoped>
.font{
  font-size: 20px;
  color: #3091f2;
}
</style>
