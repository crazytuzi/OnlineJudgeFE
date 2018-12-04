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
        <template>
          <el-dropdown v-if="isLogin == true" @command="commandHandler">
            <el-button type="primary" size="medium" round>
              {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="Profile">UserProfile</el-dropdown-item>
              <el-dropdown-item command="LogOff">Login out</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </div>
      <div>
        <el-dialog title="Login" :visible.sync="LoginFormVisible" :modal=false>
          <el-input v-model="login_username" placeholder="Username"></el-input>
          <el-input v-model="login_password" type="password" placeholder="Password"></el-input>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="Login">Login</el-button>
            <br/>
            <el-button @click="LoginFormVisible = false;RegisterFormVisible = true">
              No account? Register now!
            </el-button>
          </div>
        </el-dialog>
        <el-dialog title="Register" :visible.sync="RegisterFormVisible" :modal=false>
          <el-input v-model="reg_username" placeholder="Username"></el-input>
          <el-input v-model="reg_email" placeholder="Email Address" type="email"></el-input>
          <el-input v-model="reg_password" type="password" placeholder="Password"></el-input>
          <el-input v-model="reg_password_again" type="password" placeholder="Password Again"></el-input>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="Register">Register</el-button>
            <br/>
            <el-button @click="RegisterFormVisible = false;LoginFormVisible = true">
              Already registed? Login now!
            </el-button>

          </div>
        </el-dialog>
      </div>
    </div>
  </div>

</template>

<script>
  import {login, register, getUser} from '../../api/api'
  import {Message} from 'element-ui'
  import cookie from '../../static/js/cookie'

  export default {
    data() {
      return {
        username: '',
        isLogin: false,
        login_username: '',
        login_password: '',
        reg_username: '',
        reg_email: '',
        reg_password: '',
        reg_password_again: '',
        LoginFormVisible: false,
        RegisterFormVisible: false,
      };
    },
    methods: {
      Login() {
        let that = this;
        if (this.login_username === "") {
          Message({
            message: '账号不能为空',
            type: 'warning'
          });

        } else if (this.login_password === "") {
          Message({
            message: '密码不能为空',
            type: 'warning'
          });

        } else {
          login(
            {
              username: this.login_username,
              password: this.login_password
            }
          ).then((response) => {
            if (this.checkEmail(this.login_username)) {
              getUser({
                email: this.login_username,
              }).then((res) => {
                this.username = res.data[0].username;
                cookie.setCookie('name', res.data[0].username, 7);
                cookie.setCookie('id', res.data[0].id, 7);
                cookie.setCookie('token', response.data.token, 7);
              }).catch((function (err) {
                Message({
                  message: '找不到该用户',
                  type: 'error'
                });
              }));
            } else {
              this.username = this.login_username;
              cookie.setCookie('name', this.login_username, 7);
              getUser({
                username: this.username,
              }).then((res) => {
                cookie.setCookie('id', res.data[0].id, 7);
              }).catch((function (err) {

              }));
            }
            cookie.setCookie('token', response.data.token, 7);
            that.$store.dispatch('setInfo');
            this.LoginFormVisible = false;
            this.isLogin = true;
            Message({
              message: 'Login success',
              type: 'success'
            });
          }).catch((function (error) {
            if ("non_field_errors" in error) {
              Message({
                message: '账号或者密码不正确',
                type: 'error'
              });
            }
          }));
        }
      },
      Register() {
        let that = this;
        if (this.reg_username === "") {
          Message({
            message: '账号不能为空',
            type: 'warning'
          });
        } else if (this.reg_email === "") {
          Message({
            message: '邮箱不能为空',
            type: 'warning'
          });
        } else if (!this.checkEmail(this.reg_email)) {
          Message({
            message: '邮箱格式不对',
            type: 'warning'
          });
        } else if (this.reg_password === "") {
          Message({
            message: 'password is required',
            type: 'warning'
          });
        } else if (this.reg_password.length < 6 || this.reg_password.length > 16) {
          Message({
            message: 'password must be between 6 and 20 characters',
            type: 'warning'
          });
        } else if (this.reg_password_again !== this.reg_password) {
          Message({
            message: 'password does not match',
            type: 'warning'
          });
        } else {
          register(
            {
              username: this.reg_username,
              email: this.reg_email,
              password: this.reg_password
            }
          ).then((response) => {
            cookie.setCookie('name', this.reg_username, 7);
            cookie.setCookie('id', response.data.id, 7);
            cookie.setCookie('token', response.data.token, 7);
            that.$store.dispatch('setInfo');
            this.RegisterFormVisible = false;
            this.isLogin = true;
            this.username = this.reg_username;
            Message({
              message: 'Register success',
              type: 'success'
            });
          }).catch((function (error) {
            if ("username" in error) {
              Message({
                message: '账号已经存在',
                type: 'error'
              });
            } else if ("email" in error) {
              Message({
                message: '邮箱已被注册',
                type: 'error'
              });
            }
          }));
        }
      },
      commandHandler(command) {
        if (command == 'LogOff') {
          this.isLogin = false;
          cookie.delCookie('id');
          cookie.delCookie('token');
          cookie.delCookie('name');
          this.$store.dispatch('setInfo');
        } else if (command == 'Profile') {
          this.$store.state.topnavigation='1';
          this.$router.push('/app/profile');
        }
      },
      checkEmail(emailAddress) {
        let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        return reg.test(emailAddress);
      },
    },
    created() {
      this.$store.dispatch('setInfo');
      if (cookie.getCookie("id") != null && cookie.getCookie("name") != null && cookie.getCookie("token") != null) {
        this.isLogin = true;
        this.username = cookie.getCookie("name");
      }
      else {
        cookie.delCookie('id');
        cookie.delCookie('token');
        cookie.delCookie('name');
        this.$store.dispatch('setInfo');
      }
    }
  }
</script>

<style scoped>

</style>
