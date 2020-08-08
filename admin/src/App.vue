<template >
  <div id="app" >
      <router-view name="header"></router-view>
      <router-view name="banner"></router-view>
       <router-view name="videoList"></router-view>
      <router-view name="footer"></router-view>

      <router-view name="login"></router-view>

      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {

}
</style>
