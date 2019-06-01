<template>
    <div>
      <el-card class="box-card" style="height: 220px;margin-top: -5px">
      <div style="margin-top: -10px">
        Avatar Setting
        <el-row :gutter="20">
          <el-col :span="20" :offset="6">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              ref="image"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :before-upload="beforeAvatarUpload"
              :limit="1"
              accept="image/png,image/gif,image/jpeg">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            <el-button style="margin-left: 10px;left: 1%;position: relative" size="small" type="success" @click="avatarUpdate">upload avatar</el-button>
          </el-col>
        </el-row>
      </div>
      </el-card>
      <el-card class="box-card" style="height: 202px;">
      <div style="margin-top: -10px">
        Profile Setting
        <el-row :gutter="20">
            <el-col :span="4" :offset="2">
            Real Name
          </el-col>
          <el-col :span="5">
            <el-input v-model="real_name"></el-input>
          </el-col>
          <el-col :span="4" :offset="2">
            Student ID
          </el-col>
          <el-col :span="5">
            <el-input v-model="student_id"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" :offset="2">
            QQ
          </el-col>
          <el-col :span="5">
            <el-input v-model="QQ"></el-input>
          </el-col>
          <el-col :span="4" :offset="2">
            blog
          </el-col>
          <el-col :span="5">
            <el-input v-model="blog"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" :offset="2">
            mood
          </el-col>
          <el-col :span="16">
            <el-input v-model="mood"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" :offset="10">
            <el-button type="primary"
                       @click="saveHandle"
                        size="medium">Save All
            </el-button>
          </el-col>
        </el-row>
      </div>
      </el-card>
    </div>
</template>

<script>
    import {uploadAvatar,updateUserProfile,getRanks} from '../../api/api'
    export default {
      data() {
        return {
          user_id: '',
          userProfileId: '',
          dialogImageUrl: '',
          dialogVisible: false,
          real_name: '',
          student_id: '',
          QQ: '',
          blog: '',
          mood: ''
        };
      },
      methods: {
        getUserProfileId(){
          getRanks({
            user: this.user_id
          }).then((response)=> {
            let data = response.data;
            if (data.results.length>0){
              let result = data.results[0];
              this.userProfileId = result['id'];
              this.real_name = result['real_name'];
              this.student_id = result['student_no'];
              this.QQ= result['QQ'];
              this.blog = result['blog'];
              this.mood = result['mood'];
            }
          }).catch(function (error)
          {
            console.log(error);
          })
        },
        beforeAvatarUpload(file) {
          const isImage = (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif');
          const isLt2M = file.size / 1024 / 1024 < 2;
          if (!isImage) {
            this.$message.error('只能上传图片');
          }
          if (!isLt2M) {
            this.$message.error('上传图片大小不能超过200kb');
          }
          return isImage && isLt2M;
        },
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
        avatarUpdate(){
          let file = this.$refs.image.uploadFiles[0].raw;
          let param = new FormData();
          param.append('avatar',file);
          uploadAvatar(this.userProfileId,param).then((response)=> {
            if(response.status === 200){
              console.log("修改成功");
            }else{
              console.log("你没有权限");
            }
          }).catch(function (error) {
            console.log("error",error);
          });
        },
        saveHandle(){
          updateUserProfile(this.userProfileId,{
            real_name: this.real_name,
            student_no: this.student_id,
            QQ: this.QQ,
            blog: this.blog,
            mood: this.mood
          }).then((response)=> {
            if(response.status === 200){
              console.log("修改成功");
            }else{
              console.log("你没有权限");
            }
          }).catch(function (error) {
            console.log("error",error);
          });
        },
      },
      created() {
        let userInfo = this.$store.state.userInfo;
        if (userInfo['id'] != null && userInfo['name'] != null && userInfo['token'] != null) {
          this.user_id = userInfo['id'];
        }
        this.getUserProfileId();
      }
    }
</script>
<style>
  .disabled .el-upload--picture-card {
    display: none;
  }
</style>
