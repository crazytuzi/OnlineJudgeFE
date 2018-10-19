<template>
    <div>
      <div>
        Title:{{problem.title}}
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
              getProblemDetail({
                "problem_id":this.problem_id
              }).then((response)=>{
                let data = response.data;
                this.problem = data.results[0];
              }).catch((function (error) {
                console.log(error);
              }));
            },
        },
    }
</script>

<style scoped>

</style>
