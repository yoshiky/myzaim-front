<script setup lang="ts">

</script>

<template>
  <div id="overlay-loading">
    <div id="loading"><img src="../assets/loading.gif" alt="Loding"></div>
  </div>
</template>

<style scoped>
  #overlay-loading{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(100, 100, 100, .6);
    z-index: 999;
  }
  #loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>