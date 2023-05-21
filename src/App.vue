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
    select: handleDateSelect
//  eventClick: handleEventClick(),
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
  

  function handleDateSelect(selectInfo) {
    showEventModal.value = true;
    modalTop = selectInfo.jsEvent.clientY + 'px';
    modalLeft = selectInfo.jsEvent.clientX + 'px';
//    let title = prompt('Please enter a new title for your event')
//    let calendarApi = selectInfo.view.calendar

//    calendarApi.unselect() // clear date selection

//    if (title) {
//      calendarApi.addEvent({
//        id: createEventId(),
//        title,
//        start: selectInfo.startStr,
//        end: selectInfo.endStr,
//        allDay: selectInfo.allDay
//      })
//    }
  }

  function handleModalClose(){
    showEventModal.value = false;
  }
</script>

<template>
  <div class='demo-app'>
    <div class='demo-app-main'>
      <FullCalendar 
        class='demo-app-calendar' 
        v-bind:options='calendarOptions'
        v-bind:select="handleDateSelect">
      </FullCalendar>
    </div>
    <EventModal 
      v-if="showEventModal" 
      :top="modalTop" 
      :left="modalLeft" 
      @close="handleModalClose">
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