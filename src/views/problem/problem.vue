<template>
    <div style="min-height: 1000px">
      <el-row :gutter="24">
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
              Language:
            </div>
            <div style="display:inline">
              <el-select v-model="language" placeholder="gcc" @change="onlanguagechangeHandler">
                <el-option
                  v-for="item in Languages"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div style="display:inline">
              Theme:
            </div>
            <div style="display:inline">
              <el-select v-model="theme" placeholder="gcc" @change="onthemechangeHandler">
                <el-option
                  v-for="item in Themes"
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
                       @click="submitHandle">submit
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
              <el-row>
                <el-col :span="15">
                  <div>
                    ID:
                  </div>
                </el-col>
                <el-col :span="4" :offset="2">
                  <div style="text-align: right">
                  {{problem_id}}
                  </div>
                </el-col>
              </el-row>
              </div>
              <div>
              <el-row>
                <el-col :span="15">
                  <div>
                    Time Limit:
                  </div>
                </el-col>
                <el-col :span="4" :offset="1">
                  <div style="text-align: right">
                    {{problem.time_limit}}
                  </div>
                </el-col>
              </el-row>
            </div>
              <div>
                <el-row>
                  <el-col :span="15">
                    <div>
                      Memory Limit
                    </div>
                  </el-col>
                  <el-col :span="4" :offset="2">
                    <div style="text-align: right">
                      {{problem.memory_limit}}
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div>
                <el-row>
                  <el-col :span="15">
                    <div>
                      Accepted:
                    </div>
                  </el-col>
                  <el-col :span="4" :offset="2">
                    <div style="text-align: right">
                      {{problem.accepted_number}}
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div>
                <el-row>
                  <el-col :span="15">
                    <div>
                      Submission:
                    </div>
                  </el-col>
                  <el-col :span="4" :offset="2">
                    <div style="text-align: right">
                      {{problem.submission_number}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div>

              <div>
                <el-row>
                  <el-col :span="11">
                    <div>
                      <i class="el-icon-info"> Statistic</i>
                    </div>
                  </el-col>
                  <el-col :span="4" :offset="1">
                    <el-button type="primary" size="mini" @click="dialogTableVisible = true">Details</el-button>
                  </el-col>
                </el-row>
              </div>
              <div id="chart"  :style="{width: '175px', height: '175px'}"></div>
              <el-dialog :visible.sync="dialogTableVisible">
                <completechart v-bind:completepie_option="completepie_option"></completechart>
              </el-dialog>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    import completechart from './completechart'
    import 'codemirror/theme/solarized.css'
    import 'codemirror/theme/material.css'
    import 'codemirror/mode/clike/clike.js'
    import 'codemirror/mode/python/python.js'
    import {getProblemDetail, addSubmission, addCollection, getCollections, delCollection} from "../../api/api"
    let echarts = require('echarts/lib/echarts');
    require('echarts/lib/chart/pie');
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/toolbox');
    require('echarts/lib/component/legend');
    let Languages={
      'gcc' : 0,
      'g++' : 1,
      'Python' : 2,
      'Java' : 3
    };
    let Themes= {
      'solarized light': 0,
      'solarized dark': 1,
      'material': 2,
    };
    let numToStr = [
      'solarized light',
      'solarized dark',
      'material',
    ];
    let Modes = [
      'text/x-csrc',
      'text/x-c++src',
      'text/x-python',
      'text/x-java',
    ];
    export default {
        components: {completechart},
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
            Themes: [{
              value: Themes["solarized light"],
              label: 'Solarized light'
            }, {
              value: Themes["solarized dark"],
              label: 'Solarized dark'
            }, {
              value: Themes.material,
              label: 'Material'
            }],
            theme: Themes["solarized light"],
            dialogTableVisible: false,
            pie_option: {
              tooltip : {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"
              },
              legend:{
                bottom: 0,
                left: 'center',
                data:['AC','WA']
              },
              series : [
                {
                  type:'pie',
                  radius : '75%',
                  center: ['45%', '45%'],
                  data:[
                    {value:0, name:'AC'},
                    {value:0, name:'WA'},
                  ],
                  itemStyle: {
                    normal: {
                      shadowBlur: 5,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  },
                  label: {
                    normal: {
                      show: true,
                      position:'inner',
                      formatter:'{d}%',
                      textStyle: {
                        color: '#123456'
                      },
                    },
                    emphasis: {
                      show: true
                    }
                  },
                  labelLine: {
                    normal: {
                      show: false
                    },
                    emphasis: {
                      show: true
                    }
                  },
                  color:['#5cb85c', '#d9534f']
                }
              ]
            },
            completepie_option: {
              tooltip : {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"
              },
              legend:{
                bottom: 50,
                left: 'center',
                data:['AC','WA','TLE','MLE','CE','RE']
              },
              series : [
                {
                  type:'pie',
                  radius : ['10%','80%'],
                  roseType: 'area',
                  center: ['60%', '50%'],
                  data:[
                    {value:0, name:'AC'},
                    {value:0, name:'WA'},
                    {value:0, name:'TLE'},
                    {value:0, name:'MLE'},
                    {value:0, name:'CE'},
                    {value:0, name:'RE'},
                  ],
                  itemStyle: {
                    normal: {
                      shadowBlur: 5,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  },
                  label: {
                    normal: {
                      show: true,
                      position:'inner',
                      formatter:'{d}%',
                      textStyle: {
                        color: '#123456'
                      },
                    },
                    emphasis: {
                      show: true
                    }
                  },
                  color:['#5cb85c', '#d9534f','#f0ad4e','#e2f04e',
                    '#ff0000', '#ff4500']
                }
              ]
            },
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
                this.pie_option.series[0].data = [
                  {value:this.problem.accepted_number, name:'AC'},
                  {value:this.problem.submission_number-this.problem.accepted_number, name:'WA'},
                ];
                this.completepie_option.series[0].data = [
                  {value:this.problem.accepted_number, name:'AC'},
                  {value:this.problem.wrong_answer_number, name:'WA'},
                  {value:this.problem.time_limit_number, name:'TLE'},
                  {value:this.problem.memory_limit_number, name:'MLE'},
                  {value:this.problem.compile_error_number, name:'CE'},
                  {value:this.problem.runtime_error_number, name:'RE'},
                ];
                this.drawPie();
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
                  if (data.length>0){
                    let collectionId = data[0]['id'];
                    delCollection(
                      collectionId
                    ).then((response)=>{
                      if (response.status === 200){
                        delete this.$store.state.userCollections[this.problem_id];
                        localStorage.setItem('collections',JSON.stringify(this.$store.state.userCollections));
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
                  localStorage.setItem('collections',JSON.stringify(this.$store.state.userCollections));
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
          onthemechangeHandler(e){
              this.cmOption['theme'] = numToStr[e];
          },
          onlanguagechangeHandler(e){
              this.cmOption['mode'] = Modes[e];
          },
          drawPie() {
            let chart = echarts.init(document.getElementById('chart'));
            chart.setOption(this.pie_option);
          },
        },
    }
</script>

<style scoped>
</style>
