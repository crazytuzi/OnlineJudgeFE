<template>
  <submissionstemplate v-bind:contest_id="contest_id"></submissionstemplate>
</template>

<script>
    import submissionstemplate from "@/views/status/submissionstemplate"
    export default {
        name: "contestsubmissions",
        data(){
          return {
            contest_id: 0,
          }
        },
        created() {
          this.contest_id = this.$route.params.contest_id;
        },
        components:
          {
            submissionstemplate,
          },

    }
</script>

<style scoped>

</style>
