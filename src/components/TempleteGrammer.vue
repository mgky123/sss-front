<script setup>
  import { ref, onMounted } from 'vue'

  const msg = ref("메세지")
</script>

<template>
  <span>메세지 : {{ msg }}</span>
</template>