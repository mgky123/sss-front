<script setup>
    import {reactive } from 'vue'

    const state = reactive({count:0});

    function increment(){
      state.count++;
    }
</script>

<template>
    <button @click="increment">{{ state.count }}</button>
</template>

<style scope>
  div {
    margin: 0 auto;
    margin-bottom: 10px;
  }
</style>