<template>
  <div>
    <div>
      <el-row :gutter="20">
        <el-col :span="4" :offset="2"><div>
          <el-input v-model="username" placeholder="Username" style="width: 200px"></el-input>
        </div></el-col>
        <el-col :span="4"><div>
          <el-button type="primary" icon="el-icon-search" circle @click="searchHandle"></el-button>
        </div></el-col>
      </el-row>
    </div>
    <div>
      <el-table
        :data="ranks"
        style="width: 100%"
        :row-style="{height: '55px'}"
        :cell-style="{padding: '0'}"
        >
        <el-table-column
          prop="ranking"
          label="Rank"
          width="200"
          align="center">
        </el-table-column>
        <el-table-column
          label="Avatar"
          width="200"
          align="center">
          <template slot-scope="scope">
            <img :src="ranks[scope.$index].avatar" width="45" height="45"/>
          </template>
        </el-table-column>
        <el-table-column
          label="Username"
          width="200"
          align="center">
          <template slot-scope="scope">
            <router-link tag='a' :to="'/app/user/' + ranks[scope.$index].user">
              {{ranks[scope.$index].username}}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="accepted_num"
          label="AC"
          width="200"
          align="center">
        </el-table-column>
        <el-table-column
          prop="submission_num"
          label="Total"
          width="200"
          align="center">
        </el-table-column>
        <el-table-column
          label="AC Rate"
          width="200"
          align="center">
          <template slot-scope="scope">
            <el-progress :percentage="calculateACRate(scope.$index)"></el-progress>
          </template>
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
  import {getRanks} from "../../api/api";
  export default {
        name: "Rank",
        data(){
          return {
            ranks: [],
            pageSize: 5,
            total: 1000,
            curPage: 1,
            username: '',
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
          calculateACRate(index){
            if(this.ranks[index].submission_num === 0)
              return 0;
            return parseInt(this.ranks[index].accepted_num/this.ranks[index].submission_num*100);
          },
          searchHandle(){
            getRanks({
              user__username: this.username
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
