<template>
  <div class="wrap" style="width:100%">
    <v-head></v-head>
    <v-con></v-con>
    <v-mask v-show='false'></v-mask>
    <v-foot></v-foot>
  </div>
</template>

<script>
  
  import vHead from 'components/Head/LoginHeader'
  import vCon from 'components/Reg/content'
  import vMask from 'components/Reg/mask'
  import vFoot from 'components/Foot/LoginFoot'

  export default {
    name: 'app',
    components: {
      vHead,
      vCon,
      vMask,
      vFoot
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-bottom: 300px;
  }
</style>
