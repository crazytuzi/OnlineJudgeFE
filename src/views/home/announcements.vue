<template>
  <div>
    <div style="height: 40px;">
      <el-row :gutter="24">
        <el-col :span="4" :offset="3" style="font-size: 25px">
          Announcements
        </el-col>
        <el-col :span="4" :offset="8">
          <el-button type="primary" size="medium" round @click="getAnnouncements">Refresh</el-button>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-table
        :data="announcements"
        style="width: 100%"
        :row-style="{height: '55px'}"
        :cell-style="{padding: '0'}"
      >
        <el-table-column
          label="Title"
          width="600"
          align="center">
          <template slot-scope="scope">
            <router-link tag='a' :to="'/app/announcement/' + announcements[scope.$index].id" >
              {{announcements[scope.$index].title}}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          label="Create Time"
          prop="create_time"
          width="300"
          align="center">
        </el-table-column>
        <el-table-column
          prop="creator"
          label="Creator"
          width="300"
          align="center">
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
    import {getAnnouncementsList} from '../../api/api'
    export default {
        name: "announcements",
        data() {
          return {
            announcements: [],
            pageSize: 5,
            total: 1000,
          }
        },
        created(){
          this.getAnnouncements();
        },
        methods: {
          getAnnouncements() {
            getAnnouncementsList({}).then((response) => {
              let data = response.data;
              this.announcements = data.results;
              this.total = data.count;
            }).catch(function (error) {
              console.log(error);
            });
          },
          currentChangeHandler(e) {
            getAnnouncementsList({
              page: e,
            }).then((response) => {
              let data = response.data;
              this.announcements = data.results;
              this.total = data.count;
            }).catch(function (error) {
              console.log(error);
            });
          },
        }
    }
</script>

<style scoped>

</style>
