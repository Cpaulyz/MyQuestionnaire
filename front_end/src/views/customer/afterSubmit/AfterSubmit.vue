<template>
  <div class='bg'>
    <div class='customer'>
      <div style="margin-top: 30%" class="title">完成填写！</div>
      <el-button type="text" @click="back()">再填一次</el-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      const paperId = this.$route.params.paperId
      console.log(paperId)
      this.$router.push({ name: 'customer', params: { paperId } })
    }
  }
}
</script>

<style>
.customer > .title {
  text-align: center;
  font-size: 40px;
}
</style>
