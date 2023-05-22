<script setup>
  import { defineProps, defineEmits, ref, onMounted } from 'vue';

  const ExpReasonList = ref([]);
  onMounted(()=>{
    const DBConnected = false;

    if(DBConnected == true){
      alert('Connected! Plz modify EventModal');
    }else{
      ExpReasonList.value = [
        { title : "휴가", color : 'RED' },
        { title : "개인사유", color : 'GREEN' },
        { title : "기타", color : 'PURPLE' },
      ]
    }
  });

  const props = defineProps(['top', 'left']);
  const emits = defineEmits(['close', 'item-click']);

  function handleClose() {
    emits('close');
  }

  function handleItemClick(item){
    emits('item-click',item);
  }
</script>

<template>
  <div class="modal-content" :style="{ top: top, left: left }">
    <button class="modal-close" @click="handleClose">X</button>
    <ul>
      <li v-for="item in ExpReasonList" :key="item.title" @click="handleItemClick(item)">
        <span class="color-box" :style="{ background: item.color }"></span>
        <span>{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
  body {
    margin : 0;
  }
  div {
    box-sizing: border-box;
  }
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    position:absolute;
    top: 10px;
    left: 10px;
  }
  li {
    width:140px;
    height:21px;
    display: flex;
    align-items: center;
    border-radius: 4px;
    background-color: #f4f4f4;
    border: 1px solid #ddd;
    transition: background-color 0.3s ease;
    margin-bottom:5px;
  }
  li:hover {
    background-color: #eaeaea;
  }
  .modal-content {
    z-index: 9999;
    position: fixed; padding: 20px;
    width: 200px; height: 200px;
    background: #fff;
    border-radius: 4px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
  .modal-close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor : pointer;
  }
  .color-box {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    border-radius: 4px;
  }
</style>