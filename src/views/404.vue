<template>
  <p class="page-container">
    404 error, page not found
  </p>
</template>
<script>
export default {
  name: 'Page404',
  mounted() {
    setTimeout((_) => {
      this.$router.push('/')
    }, 1000)
  }
}
</script>
<style lang="scss" scoped>
.page-container {
  font-size: 20px;
  text-align: center;
  color: rgb(192, 204, 218);
}
</style>
