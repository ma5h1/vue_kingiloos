<template>
  <div class="home" :style="{backgroundImage:'url(https://cdn.hipwallpaper.com/i/84/78/OLkAoY.jpg)'}">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>


  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
