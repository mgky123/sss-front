<script setup>
  import { emit } from 'vue'

  const props = defineProps(['top', 'left']);

  function handleClose() {
    emit('close');
  }
</script>

<template>
  <div class="white-bg" :style="{ top: top, left: left }">
    <h4>상세페이지</h4>
    <p>상세페이지내용임</p>
    <button @click="handleClose">X</button>
  </div>
</template>

<style scoped>
  body {
    margin : 0;
  }
  div {
    box-sizing: border-box;
  }
  .white-bg {
    z-index: 9999;
    position: fixed; padding: 20px;
    width: 200px; height: 200px;
    background: white;
    border-radius: 8px;
    padding: 20px;
    border: 1px solid;
  } 
</style>