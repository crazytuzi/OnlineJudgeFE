<template>
  <my-tabs :tabList="tabList" :tabIndex="tabIndex" @changeTab="changeTab">
    <keep-alive>
      <component :is="currentContent">
      </component>
    </keep-alive>
  </my-tabs>
</template>
import MyTabs from '../components/utils/MyTabs'
import Home from '@/views/home/home'
import Problems from '@/views/problem/problems'
<script>
    export default {
        name: "NavMenu",
        components: {
          MyTabs,
          'Home': home,
          'Problems': problems
        },
        data () {
          return {
            tabIndex: 0,
            currentContent: 'Home',
            tabList: [
              {
                index: 0,
                name: '选项一',
                component: 'Home'
              },
              {
                index: 1,
                name: '选项二',
                component: 'Problems'
              }
            ]
          }
        },
        methods: {
          // 切换选项卡
          changeTab: function (tab) {
            this.tabIndex = tab.index
            this.currentContent = tab.component
          }
        }
    }
</script>

<style scoped>

</style>
