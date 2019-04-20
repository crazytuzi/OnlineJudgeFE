<template>
  <div id="completechart"  :style="{width: '500px', height: '500px'}"></div>
</template>

<script>
    let echarts = require('echarts/lib/echarts');
    require('echarts/lib/chart/pie');
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/toolbox');
    require('echarts/lib/component/legend');
    export default {
        name: "completechart",
        props: ["completepie_option"],
        mounted: function () {
          let chart = echarts.init(document.getElementById('completechart'));
          chart.setOption(this.completepie_option);
        }
    }
</script>

<style scoped>

</style>
