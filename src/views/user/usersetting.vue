<template>
    <div>
      <input name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="avatarUpdate"/>
    </div>
</template>

<script>
    import {uploadAvatar} from '../../api/api'
    export default {
      data() {
        return {
        };
      },
      methods: {
        avatarUpdate(e){
          let userInfo = this.$store.state.userInfo;
          if (userInfo['id'] != null && userInfo['name'] != null && userInfo['token'] != null) {
            let file = e.target.files[0];
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

<style scoped>

</style>
