<template>
  <div>
    <el-table
      :data="ranks"
      style="width: 100%">
      <el-table-column
        label="Rank"
        width="180">
        <template slot-scope="scope" >
          {{(curPage-1)*pageSize+scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column
        prop="avatar"
        label="Avatar"
        width="180">
      </el-table-column>
      <el-table-column
        prop="username"
        label="Username"
        width="180">
      </el-table-column>
      <el-table-column
        prop="accepted_num"
        label="AC"
        width="180">
      </el-table-column>
      <el-table-column
        prop="submission_num"
        label="Total"
        width="180">
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
</template>

<script>
  import {getRanks} from "../../api/api";
  export default {
        name: "Rank",
        data(){
          return {
            ranks: [],
            pageSize: 10,
            total: 1000,
            curPage: 1
          };
        },
        created() {
          this.getRank();
        },
        methods: {
          getRank() {
            getRanks().then((response)=> {
              let data = response.data;
              this.ranks = data.results;
              this.total = data.count;
            }).catch(function (error) {
              console.log(error);
            });
          },
          currentChangeHandler(e){
            this.curPage = e;
            getRanks({
              page: e
            }).then((response)=> {
              let data = response.data;
              this.ranks = data.results;
              this.total = data.count;
            }).catch(function (error) {
              console.log(error);
            });
          },
        },
  }
</script>

<style scoped>

</style>
