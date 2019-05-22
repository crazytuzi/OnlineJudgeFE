<template>
    <div>
      <el-table
        :data="collections"
        style="width: 100%"
        :row-style="{height: '55px'}"
        :cell-style="{padding: '0'}">
        <el-table-column
          label="AC"
          width="250"
          align="center">
          <template slot-scope="scope">
            <div v-if="that.$store.state.userInfo['id']!==null && that.$store.state.userInfo['name']!==null && that.$store.state.userInfo['token']!==null">
              <i class="el-icon-check" v-if="that.$store.state.userAcceptedProblems!==null&&that.$store.state.userAcceptedProblems.hasOwnProperty(collections[scope.$index].problem)"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="Problem ID"
          width="250"
          align="center">
          <template slot-scope="scope" >
            <router-link tag='a' :to="'/app/problem/' + collections[scope.$index].problem" >
              {{collections[scope.$index].problem}}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="Collect Time"
          width="250"
          align="center">
        </el-table-column>
        <el-table-column
          label="Operate"
          width="250"
          align="center">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index)"
              type="text"
              >
              delete
            </el-button>
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
    import {getCollections, delCollection} from "../../api/api"
    export default {
      data() {
        return {
          allcollections: [],
          collections: [],
          that: this,
          pageSize: 5,
          total: 1000,
          curPage: 1,
        };
      },
      created() {
          this.colletctionsDictToArr();
          this.getPageCollections();
      },
      methods:{
        colletctionsDictToArr(){
          this.allcollections = [];
          let colletctionsDict = this.$store.state.userCollections;
          if (colletctionsDict !== null){
            for (let key in colletctionsDict){
              let dict = {
                problem: key,
                create_time: colletctionsDict[key]
              };
              this.allcollections.push(dict);
            }
            this.total = this.allcollections.length;
          }
        },
        getPageCollections(){
          if ((this.curPage-1) * this.pageSize + 1 > this.total){
            this.curPage = Math.ceil(this.total/this.pageSize);
            this.curPage = (this.curPage===0)?1:this.curPage;
          }
          this.collections = [];
          for (let i=(this.curPage-1)*this.pageSize;i<this.curPage*this.pageSize && i<this.total;++i) {
            this.collections.push(this.allcollections[i]);
          }
        },
        currentChangeHandler(e) {
          this.curPage = e;
          this.getPageCollections();
        },
        deleteRow(index) {
          getCollections({
            user: this.$store.state.userInfo['id'],
            problem: this.collections[index].problem
          }).then((response)=> {
            let data = response.data;
            if (data.length>0){
              let collectionId = data[0]['id'];
              delCollection(
                collectionId
              ).then((response)=>{
                if (response.status === 200){
                  delete this.$store.state.userCollections[this.collections[index].problem];
                  localStorage.setItem('collections',JSON.stringify(this.$store.state.userCollections));
                  this.$store.dispatch('setCollections');
                  this.allcollections.splice((this.curPage-1)*this.pageSize+index,1);
                  this.total = this.allcollections.length;
                  this.getPageCollections();
                }
              }).catch(function (error) {
                console.log(error);
              });
            }
          }).catch(function (error) {
            console.log(error);
          });
        },
      },
    }
</script>

<style scoped>

</style>
