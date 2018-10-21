<template>

  <div>
    <div>
      <div style="position:absolute;left: 900px;top: 10px;">
        <template v-if="isLogin == false">
          <el-button round
                     @click="LoginFormVisible = true"
          >Login
          </el-button>
          <el-button round
                     @click="RegisterFormVisible = true"
          >Register
          </el-button>
        </template>
      </div>
      <div>
        <el-dialog title="Login" :visible.sync="LoginFormVisible">
          <el-input v-model="login_username" placeholder="Username"></el-input>
          <el-input v-model="login_password" type="password" placeholder="Password"></el-input>
          <div slot="footer" class="dialog-footer">
            <el-button @click="LoginFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="Login">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="Register" :visible.sync="RegisterFormVisible">
          <div slot="footer" class="dialog-footer">
            <el-button @click="RegisterFormVisible = false">取 消</el-button>
            <el-button type="primary">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>

</template>

<script>
  import {login} from '../../api/api'
  import {Message} from 'element-ui'
  import cookie from '../../static/js/cookie'

  export default {
    data() {
      return {
        isLogin: false,
        login_username: '',
        login_password: '',
        LoginFormVisible: false,
        RegisterFormVisible: false,
      };
    },
    methods: {
      Login() {
        let that = this;
        login(
          {
            "username": this.login_username,
            "password": this.login_password
          }
        ).then((response) => {
          //本地存储用户信息
          cookie.setCookie('name', this.login_username, 7);
          cookie.setCookie('token', response.data.token, 7);
          //存储在store
          // 更新store数据
          that.$store.dispatch('setInfo');
          this.LoginFormVisible = false;
          this.isLogin = true;
        }).catch((function (error) {
          if ("username" in error) {
            Message({
              message: '账号不能为空',
              type: 'warning'
            });
          } else if ("password" in error) {
            Message({
              message: '密码不能为空',
              type: 'warning'
            });
          } else if ("non_field_errors" in error) {
            Message({
              message: '账号或者密码不正确',
              type: 'error'
            });
          }
        }));
      },

    },
    created() {
      //重新触发store
      //更新store数据
      this.$store.dispatch('setInfo');
      if (cookie.getCookie("name") != null && cookie.getCookie("token") != null) {
        this.isLogin = true;
      }
      else {
        //清除缓存
        cookie.delCookie('token');
        cookie.delCookie('name');
        //重新触发store
        //更新store数据
        this.$store.dispatch('setInfo');
      }
    }
  }
</script>

<style scoped>

</style>
