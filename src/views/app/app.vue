<template>

  <el-container  style="height: 560px;background-color: #eee">
    <el-header style="background-color: #FFFFFF"><router-view name = "v-header"></router-view></el-header>
    <el-main><router-view name ='v-content' style="background-color: #FFFFFF;padding-top: 20px;height: 420px;width: 100%"></router-view></el-main>
    <el-footer><router-view name = 'v-footer'></router-view></el-footer>
  </el-container>

</template>
<script>

</script>
<style>
</style>
