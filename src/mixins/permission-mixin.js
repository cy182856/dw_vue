export const permission = {
  methods: {
    hasPermission: function(key) {
      if (this.$store.getters.userInfo && this.$store.getters.userInfo.authList) {
        return this.$store.getters.userInfo.authList.some(item => item === key)
      } else {
        false
      }
    }
  }
}
