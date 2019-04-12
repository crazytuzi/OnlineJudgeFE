<template>
  <div>
    <el-table
      :data="contestranklist"
      style="width: 100%"
      :row-style="{height: '45px'}"
      :cell-style="{padding: '0'}">
      <el-table-column
        label="Rank"
        width="250"
        align="center">
        <template slot-scope="scope" >
          {{(curPage-1)*pageSize+scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column
        label="username"
        width="250"
        align="center">
        <template slot-scope="scope">
          <router-link tag='a' :to="'/app/user/' + contestranklist[scope.$index].user">
            {{contestranklist[scope.$index].username}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="accepted"
        label="Accepted"
        width="250"
        align="center">
      </el-table-column>
      <el-table-column
        label="Time Used"
        width="250"
        align="center">
          <template slot-scope="scope" >
            {{secondFormat(contestranklist[scope.$index].timeused)}}
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
</template>

<script>
    import {getContestRankList} from "../../api/api";
    export default {
        name: "contestrank",
        data() {
          return {
            contest_id: 0,
            contestranklist: [],
            pageSize: 5,
            total: 1000,
            curPage: 1,
            that: this
          };
        },
        created(){
          this.contest_id = this.$route.params.contest_id;
          this.getRankList();
        },
        methods: {
          getRankList() {
            getContestRankList({
              contest: this.contest_id,
            }).then((response)=> {
              let data = response.data;
              this.contestranklist = data.results;
              this.total = data.count;
            }).catch(function (error) {
              console.log(error);
            });
          },
          currentChangeHandler(e){
            this.curPage = e;
            getContestRankList({
              contest: this.contest_id,
              page: e,
            }).then((response)=> {
              let data = response.data;
              this.contestranklist = data.results;
              this.total = data.count;
            }).catch(function (error) {
              console.log(error);
            });
          },
          secondFormat(second){
            let dd,hh,mm,ss;
            second = typeof second === 'string' ? parseInt(second) : second;
            if(!second || second < 0){
              return;
            }
            //天
            dd = second / (24 * 3600) | 0;
            second = Math.round(second) - dd * 24 * 3600;
            //小时
            hh = second / 3600 | 0;
            second = Math.round(second) - hh * 3600;
            //分
            mm = second / 60 | 0;
            //秒
            ss = Math.round(second) - mm * 60;
            return dd + '天' + hh + '小时' + mm + '分' + ss + '秒';
          },
        },
    }
</script>

<style scoped>

</style>
