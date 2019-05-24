<template>
  <div>
    <el-card class="box-card" style="height: 380px;">
      <div slot="header" class="clearfix">
        <div style="font-size: 25px;text-align: center">{{announcement.title}}</div>
        <div style="font-size: 18px;text-align: left;margin-top: 15px">
          Creator:{{announcement.creator}}
        </div>
        <div style="font-size: 20px;text-align: left;margin-top: 5px">Create Time:{{announcement.create_time}}</div>
      </div>
      <div>
        <span>{{announcement.content}}</span>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {getAnnouncementDetail} from '../../api/api'
  import ElCard from "element-ui/packages/card/src/main";
    export default {
      name: "announcement",
      components: {ElCard},
      data(){
        return{
          announcement_id: '',
          announcement:{},
        }
      },
      created() {
        this.announcement_id = this.$route.params.announcement_id;
        this.getAnnouncement();
      },
      methods: {
        getAnnouncement(){
          getAnnouncementDetail(
            this.announcement_id
          ).then((response) => {
            this.announcement = response.data;
            console.log(this.announcement);

          }).catch((function (error) {
            console.log(error);
          }));
        }
      }
    }
</script>

<style scoped>

</style>
