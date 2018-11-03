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
        Description:{{problem.description}}}
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
    </div>
</template>

<script>
    import 'codemirror/theme/solarized.css'
    import 'codemirror/mode/clike/clike.js'
    import {getProblemDetail} from "../../api/api";
    export default {
        name: "Problem",
        data(){
          const code = `#include <stdio.h>
int main()
{
    int a.b;
    scanf("%d %d",&a,&b);
    printf("%d\\r\\n",a+b);
    return 0;
}`;
          return {
            code,
            problem_id: '',
            problem: {},
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
              }).catch((function (error) {
                console.log(error);
              }));
            },
        },
    }
</script>

<style scoped>

</style>
