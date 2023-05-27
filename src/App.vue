<script setup>
  import { ref, onMounted } from 'vue'
  import FullCalendar from '@fullcalendar/vue3'
  import dayGridPlugin from '@fullcalendar/daygrid'
  import timeGridPlugin from '@fullcalendar/timegrid'
  import interactionPlugin from '@fullcalendar/interaction'
  import EventModal from './components/EventModal.vue'
  import axios from 'axios'

  let events = ref(null);
  onMounted(()=>{
    axios.get('http://localhost:3000/events').then(response => {
      response.data.forEach(item => {
        calendarOptions.value.events.push({
          id: item.id,
          title: item.username, 
          start: item.startdate, 
          end: item.enddate, 
          extendedProps:{
            eventtype: item.eventtype,
            editable: item.editable
          }
        });
      });
      events.value = calendarOptions.value.events;
    }).catch(error => {
      console.error(error);
    });
  });

  let calendarOptions = ref({
    plugins: [
      dayGridPlugin,
      timeGridPlugin,
      interactionPlugin
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events : [],
    initialView: 'dayGridMonth',
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    weekends: true,
    select: handleDateSelect,
    eventClick: handleEventSelect
  });

  let showEventModal = ref(false);
  let modalTop = ref(0);
  let modalLeft = ref(0);
  let selectInfoTemp = ref(null);

  function handleDateSelect(selectInfo) {
    showEventModal.value = true;
    modalTop = selectInfo.jsEvent.clientY + 'px';
    modalLeft = selectInfo.jsEvent.clientX + 'px';
    selectInfoTemp.value = selectInfo;
  }

  function handleModalClose(){
    showEventModal.value = false;
  }

  let eventCountonView = ref(0);
  function handleModalItemSelected(item){
    showEventModal.value = false;

    if(item.title){
      calendarOptions.value.events.push({
        id: "view"+eventCountonView.value,
        title: item.title,
        start: selectInfoTemp.value.startStr,
        end: selectInfoTemp.value.endStr,
        allDay: selectInfoTemp.value.allDay,
        backgroundColor : item.color,
        extendedProps:{
          editable: true
        }
      });
    }
    eventCountonView.value++;
    selectInfoTemp.value = null;
  }

  function handleEventSelect(selectInfo){
    if(selectInfo.event.extendedProps?.editable == true  && confirm('정말로 삭제하시겠습니까?')){

      const eventIndex = calendarOptions.value.events.findIndex(e => e.id === selectInfo.event.id);
      if(eventIndex > -1){
        calendarOptions.value.events.splice(eventIndex,1);
      }

      selectInfo.event.remove();
    }
  }

  let data = ref(null);
  function fetchData(){
    axios.get('http://localhost:3000/data').then(response => {
      data.value = response.data;
    }).catch(error => {
      console.error(error);
    });
  }
</script>

<template>
  <div class='demo-app'>
    <div class='demo-app-main'>
      <FullCalendar 
        class='demo-app-calendar' 
        :options='calendarOptions'
        :select="handleDateSelect"
        :eventClick="handleEventSelect">
      </FullCalendar>
    </div>
    <EventModal 
      v-if="showEventModal" 
      :top="modalTop" 
      :left="modalLeft" 
      @close="handleModalClose"
      @item-click="handleModalItemSelected">
    </EventModal>
  </div>
</template>

<style scoped>
  h2 {
    margin: 0;
    font-size: 16px;
  }
  ul {
    margin: 0;
    padding: 0 0 0 1.5em;
  }
  li {
    margin: 1.5em 0;
    padding: 0;
  }
  b { 
    margin-right: 3px;
  }
  .demo-app {
    display: flex;
    min-height: 100%;
    font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
    font-size: 14px;
  }
  .demo-app-main {
    flex-grow: 1;
    padding: 3em;
  }
  .fc { /* the calendar root */
    max-width: 1100px;
    margin: 0 auto;
  }
</style>