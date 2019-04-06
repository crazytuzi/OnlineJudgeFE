<template>
  <submissionstemplate v-bind:contest_id="contest_id"></submissionstemplate>
</template>

<script>
  import submissionstemplate from "@/views/status/submissionstemplate"
    export default {
        name: "Status",
        data(){
          return{
            contest_id: '',
          }
        },
        components:
          {
            submissionstemplate,
          },
    }
</script>

<style>
</style>
