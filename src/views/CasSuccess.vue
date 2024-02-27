<template>
  <div class="login-container" />
</template>

<script>
import { mapActions } from 'vuex'
import { loadPreUrl } from '@/utils/storage'

export default {
  name: 'CasSuccess',
  data() {
    return {
    }
  },
  async created() {
    const res = await this.loginByCasAction()
    if (res && res.success) {
      const redirect = loadPreUrl() || '/'
      console.log('redirect:' + redirect)
      // 替换当前路由，即在history中替换login的路由，避免浏览器回退时再回到登录页面
      this.$router.replace({ path: redirect })
    }
  },
  methods: {
    ...mapActions(['loginByCasAction'])
  }
}
</script>
