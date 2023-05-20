<script setup>
  import { ref, onMounted } from 'vue';

  const count = ref(0);

  function increment(){
    count.value++;
  }

  onMounted(()=>{
    console.log('숫자 세기의 초기값은 ${ count.value } 입니다.');
  })
</script>

<template>
  <div>
    <button @click="increment">숫자 세기: {{ count }}</button>
  </div>
</template>

<style scope>
  div {
    margin: 0 auto;
    margin-bottom: 10px;
  }
</style>