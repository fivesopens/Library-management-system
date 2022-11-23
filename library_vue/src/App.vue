<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>

export default {
  name: 'App',
  components: {}
}
</script>

<style>
body,html{
  margin: 0;
  padding: 0;
}
body{
    background-image:  radial-gradient(circle, rgb(83, 168, 255), rgb(217, 236, 255));
  }
</style>
