<script setup>
  import { ref } from 'vue'

  const msg = ref("메세지");
  const rawHtml = ref("<span style='color:red'>이것은 빨간색이어야 합니다</span>");
  let DynamicId = "red";
  const number=1;
  const ok=true;

  function formatDate(dateStr){
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('ko',{dateStyle:'medium'}).format(date);
  }
</script>

<template>
  <div>
    <span>메세지 : {{ msg }}</span>

    <p>텍스트 보간법 사용 : {{ rawHtml }}</p>
    <p>v-html 디렉티브 사용 : <span v-html="rawHtml"></span></p>
  </div>
  <div :id="DynamicId">{{ DynamicId }}</div>
  <div> {{ number+1 }}</div>
  <div> {{ ok ? '예' : '아니오' }}</div>
  <div> {{ formatDate('2022-05-20') }}</div>
</template>

<style scope>
  div {
    margin: 0 auto;
    margin-bottom: 10px;
  }

  #red{
    color : red;
  }

  #blue{
    color : blue;
  }
</style>