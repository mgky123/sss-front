<script setup>
  import { ref } from 'vue'
  import FullCalendar from '@fullcalendar/vue3'
  import dayGridPlugin from '@fullcalendar/daygrid'
  import timeGridPlugin from '@fullcalendar/timegrid'
  import interactionPlugin from '@fullcalendar/interaction'
  import { INITIAL_EVENTS, createEventId } from './event-utils'
  import EventModal from './components/EventModal.vue'

  let calendarOptions = {
    plugins: [
      dayGridPlugin,
      timeGridPlugin,
      interactionPlugin // needed for dateClick
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    weekends: true,
    select: handleDateSelect,
    eventClick: handleEventSelect
//  eventsSet: handleEvents()
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };

  let currentEvents = [];
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

  function handleModalItemSelected(item){
    showEventModal.value = false;

    let calendarApi = selectInfoTemp.value.view.calendar;
    calendarApi.unselect();

    if(item.title){
      calendarApi.addEvent({
        id : createEventId(),
        title : item.title,
        start : selectInfoTemp.value.startStr,
        end : selectInfoTemp.value.endStr,
        allDay : selectInfoTemp.value.allDay,
        backgroundColor : item.color
      });
    }

    selectInfoTemp.value = null;
  }

  function handleEventSelect(selectInfo){
    const event = selectInfo.event;
    if(confirm('정말로 삭제하시겠습니까?')){
      event.remove();
    }
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

  b { /* used for event dates/times */
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