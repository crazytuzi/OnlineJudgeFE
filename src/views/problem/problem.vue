<template>
    <div>
      <div>
        {{problem.title}}
      </div>
      <div>
        Time Limit:{{problem.time_limit}}
      </div>
      <div>
        Memory Limit:{{problem.memory_limit}}
      </div>
      <div>
        Description:{{problem.description}}
      </div>
      <div>
        Input:{{problem.input_description}}
      </div>
      <div>
        Output:{{problem.output_description}}
      </div>
      <div>
        Sample Input:{{problem.sample_input}}
      </div>
      <div>
        Sample Output:{{problem.sample_output}}
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
      <div v-if="problem.parent_problem===null&&this.$store.state.userInfo['id']!==null
        &&this.$store.state.userInfo['name']!==null&&this.$store.state.userInfo['token']!==null">
        <el-button type="primary" v-if="isCollect"
                   @click="collectHandle">取消收藏
        </el-button>
        <el-button type="primary" v-else
                   @click="collectHandle">收藏题目
        </el-button>
      </div>
    </div>
</template>

<script>
    import 'codemirror/theme/solarized.css'
    import 'codemirror/mode/clike/clike.js'
    import {getProblemDetail, addSubmission, addCollection, getCollections, delCollection} from "../../api/api"
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
              theme: 'solarized light'
            }
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

</style>
