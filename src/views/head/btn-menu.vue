<template>

  <div>
      <div style="position:absolute;top: 10px;">
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
            <el-button size="medium" round>
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

</template>

<script>
  import {login, register, getUser,getAcceptedProblems,getChallengingProblems,getCollections} from '../../api/api'
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
          let that = this;
          login(
            {
              username: this.login_username,
              password: this.login_password
            }
          ).then((response) => {
            cookie.setCookie('token', response.data.token, 7);
            if (this.checkEmail(this.login_username)) {
              getUser({
                email: this.login_username,
              }).then((res) => {
                this.username = res.data[0].username;
                cookie.setCookie('name', res.data[0].username, 7);
                cookie.setCookie('id', res.data[0].id, 7);
                cookie.setCookie('isSuperUser', res.data[0].isSuperUser, 7);
                this.$store.dispatch('setInfo');
                this.getAcceptedProblem();
                this.getChallengingProblem();
                this.getCollection();
              }).catch((function (err) {
                that.$message.error("找不到改用户");
              }));
            } else {
              this.username = this.login_username;
              cookie.setCookie('name', this.login_username, 7);
              let that = this;
              getUser({
                username: this.username,
              }).then((res) => {
                cookie.setCookie('id', res.data[0].id, 7);
                cookie.setCookie('isSuperUser', res.data[0].isSuperUser, 7);
                this.$store.dispatch('setInfo');
                //解决异步问题,这里和上面不写在一起
                this.getAcceptedProblem();
                this.getChallengingProblem();
                this.getCollection();
              }).catch((function (err) {
              }));
            }
            this.LoginFormVisible = false;
            this.isLogin = true;
	    this.$message({
		  message: '登录成功',
		  type: 'success',
		  duration:'1000'
		});
          }).catch((function (error) {
            if ("non_field_errors" in error) {
              that.$message.error("密码错误");
            }
          }));
        }
      },
      Register() {
        let that = this;
        if (this.reg_username.length < 6 || this.reg_username.length > 16) {
          this.$message.error("用户名长度需要大于5位且小于17位");
        } else if (this.reg_email === "") {
          this.$message.error("邮箱不能为空");
        } else if (!this.checkEmail(this.reg_email)) {
          this.$message.error("邮箱格式不正确");
        } else if (this.reg_password === "") {
          this.$message.error("password is required");
        } else if (this.reg_password.length < 6 || this.reg_password.length > 16) {
          this.$message.error("密码长度需要大于5位且小于17位");
        } else if (this.reg_password_again !== this.reg_password) {
          this.$message.error("两次输入密码需要相同");
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
            localStorage.setItem('acceptedproblems',null);
            localStorage.setItem('challengingproblems',null);
            localStorage.setItem('collections',null);
            that.$store.dispatch('setAcceptedProblems');
            that.$store.dispatch('setChallengingProblems');
            that.$store.dispatch('setCollections');
		this.$message({
		  message: '注册成功',
		  type: 'success',
		  duration:'1000'
		});
          }).catch((function (error) {
            if ("username" in error) {
              that.$message.error("用户名已经存在");
            } else if ("email" in error) {
              that.$message.error("邮箱已经被注册");
            }
          }));
        }
      },
      commandHandler(command) {
        if (command == 'LogOff') {
          this.isLogin = false;
          this.delStores();
        } else if (command == 'Profile') {
          this.$store.state.topnavigation = '1';
          this.$router.push('/app/profile');
        }
      },
      checkEmail(emailAddress) {
        let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        return reg.test(emailAddress);
      },
      delStores(){
        cookie.delCookie('id');
        cookie.delCookie('token');
        cookie.delCookie('name');
        cookie.delCookie('isSuperUser');
        localStorage.removeItem('acceptedproblems');
        localStorage.removeItem('challengingproblems');
        localStorage.removeItem('collections');
        this.$store.dispatch('setInfo');
        this.$store.dispatch('setAcceptedProblems');
        this.$store.dispatch('setChallengingProblems');
        this.$store.dispatch('setCollections');
      },
      getAcceptedProblem() {
        getAcceptedProblems({
          user: this.$store.state.userInfo['id'],
          iscontest: 2,
        }).then((response)=> {
          let data = response.data;
          let acceptedproblems = {};
          for( let acceptedproblem of data){
            acceptedproblems[acceptedproblem['problem']] = acceptedproblem['create_time'];
          }
          localStorage.setItem('acceptedproblems',JSON.stringify(acceptedproblems));
          this.$store.dispatch('setAcceptedProblems');
        }).catch(function (error) {
          console.log(error);
        });
      },
      getChallengingProblem() {
        getChallengingProblems({
          user: this.$store.state.userInfo['id'],
        }).then((response)=> {
          let data = response.data;
          let challengingproblems = {};
          for( let challengingproblem of data){
            challengingproblems[challengingproblem['problem']] = challengingproblem['create_time'];
          }
          localStorage.setItem('challengingproblems',JSON.stringify(challengingproblems));
          this.$store.dispatch('setChallengingProblems');
        }).catch(function (error) {
          console.log(error);
        });
      },
      getCollection(){
        getCollections({
          user: this.$store.state.userInfo['id'],
        }).then((response)=> {
          let data = response.data;
          let collections = {};
          for( let collection of data){
            collections[collection['problem']] = collection['create_time'];
          }
          localStorage.setItem('collections',JSON.stringify(collections));
          this.$store.dispatch('setCollections');
        }).catch(function (error) {
          console.log(error);
        });
      },
    },
    created() {
      this.$store.dispatch('setInfo');
      let userInfo = this.$store.state.userInfo;
      if (userInfo['id'] != null && userInfo['name'] != null && userInfo['token'] != null) {
        this.getAcceptedProblem();
        this.getChallengingProblem();
        this.getCollection();
        this.isLogin = true;
        this.username = userInfo['name'];
      } else {
        this.delStores();
      }
    }
  }
</script>

<style scoped>

</style>
