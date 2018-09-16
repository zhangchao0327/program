<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app, .card{
  height: 100%;
}
body,html{
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>
