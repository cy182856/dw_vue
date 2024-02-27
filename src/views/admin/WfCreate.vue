<template>
  <div class="iframe">
    <iframe
      id="iframeMapViewComponent"
      ref="iframeDom"
      name="iframeMap"
      :src="getPageUrl"
      width="100%"
      height="100%"
      frameborder="0"
      scrolling="no"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      getPageUrl: 'static/modeler.html?modelId=',
      id: ''
    }
  },
  mounted: function() {
    this.getPageUrl = this.getPageUrl + `${this.$route.query.id}`
  }
}
</script>
<style lang="scss" scoped>
.iframe {
  height: 100%;
  margin-left:25px
}
</style>
