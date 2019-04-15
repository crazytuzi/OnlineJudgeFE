<template>
    <div>
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        ref="image"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :limit="1"
        accept="image/png,image/gif,image/jpeg">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="avatarUpdate">更换头像</el-button>
    </div>
</template>

<script>
    import {uploadAvatar} from '../../api/api'
    export default {
      data() {
        return {
          dialogImageUrl: '',
          dialogVisible: false,
        };
      },
      methods: {
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
        avatarUpdate(){
          let userInfo = this.$store.state.userInfo;
          if (userInfo['id'] != null && userInfo['name'] != null && userInfo['token'] != null) {
            let file = this.$refs.image.uploadFiles[0].raw;
            let param = new FormData();
            param.append('avatar',file);
            uploadAvatar(userInfo['id'],param).then((response)=> {
              console.log("response",response);
            }).catch(function (error) {
              console.log("error",error);
            });
          }else{
            console.log("not login");
          }
        },
      }
    }
</script>
<style>
  .disabled .el-upload--picture-card {
    display: none;
  }
</style>
