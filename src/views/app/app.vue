<template>

  <el-container>
    <el-header><router-view name = "v-header"></router-view></el-header>
    <el-main><router-view name ='v-content'></router-view></el-main>
    <el-footer ><router-view name = 'v-footer'></router-view></el-footer>
  </el-container>

</template>
<script>

</script>
<style>
</style>
