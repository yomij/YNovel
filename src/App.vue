<script>
  export default {
    mpType: 'app',
    onLaunch: function(options) {
      // Do something initial when launch.
      console.log('App onLaunch')
    },
    onShow: function(options) {
      // Do something when show.
      console.log('App onShow')
    },
    onHide: function() {
      // Do something when hide.
      console.log('App onHide')
    },
    onError: function(msg) {
      console.log('App onError')
      console.log(msg)
    },
    async globalData() {
      return {
      	barHeight: await Megalo.getSystemInfo()
      }
    }
  }
</script>

<style lang="scss">
	@import './assets/styles/index.scss';
	.app {
		height: 100%;
		width: 100%;
	}
</style>
