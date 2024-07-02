<template>
  <v-layout>
    <v-navigation-drawer permanent floating class="position-fixed" width="332">
      <v-list>
        <v-list-item
          title="Booking"
          subtitle="f*ck you"
          class="pt-2 pb-4"
          prepend-icon="mdi-book-open-outline"
        />
        <v-list-item class="d-flex justify-center items-center py-4">
          <v-btn size="large" rounded="lg" color="primary" variant="outlined"
            >Создать
          </v-btn>
        </v-list-item>
        <v-list-item class="px-0 pt-0 pb-4 d-flex justify-center items-center">
          <v-date-picker
            max-width="300"
            hide-header
            show-adjacent-months
            weeks-in-month="dynamic"
          ></v-date-picker>
        </v-list-item>
        <v-list-item
          v-for="(room, index) in rooms"
          :key="index"
          :value="room.value"
          :title="room.title"
          :subtitle="`${room.capacity} / ${room.floor}`"
          @click="selectRoom(room.value)"
          :active="selectedRoom === room.value"
        ></v-list-item>
      </v-list>

      <template #append>
        <v-list>
          <!--<v-list-item>
            <v-switch
              v-model="themeValue"
              :label="`Theme: ${themeValue}`"
              false-value="dark"
              true-value="light"
              hide-details
            />
          </v-list-item>-->
          <v-list-item
            v-for="(item, i) in [
              {
                title: 'Logout',
                icon: 'mdi-logout',
                action: logout
              }
            ]"
            :key="i"
            :value="item"
            color="primary"
            @click="item.action"
            :append-icon="item.icon"
            :title="item.title"
          >
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>

    <v-main>
      <v-sheet class="pa-2">
        <v-calendar
          v-model="value"
          :events="events"
          view-mode="week"
          :interval-start="7"
          :intervals="14"
        ></v-calendar>
      </v-sheet>
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import { useDate /*useTheme*/ } from 'vuetify'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

// const theme = useTheme()
const router = useRouter()

const value = ref<Array<Date>>([new Date()])
const events = ref<
  {
    title: string
    start: Date
    end: Date
    color: string
    allDay: boolean
  }[]
>([])
const colors = ref<string[]>([
  'blue',
  'indigo',
  'deep-purple',
  'cyan',
  'green',
  'orange',
  'grey darken-1'
])
const titles = ref<string[]>([
  'Meeting',
  'Holiday',
  'PTO',
  'Travel',
  'Event',
  'Birthday',
  'Conference',
  'Party'
])

const rooms = ref<
  {
    title: string
    value: string
    appendIcon: string
    capacity: number
    floor: number
  }[]
>([
  {
    title: 'Room 1',
    value: 'room1',
    appendIcon: '',
    capacity: 10,
    floor: 2
  },
  {
    title: 'Room 2',
    value: 'room2',
    appendIcon: '',
    capacity: 12,
    floor: 2
  },
  {
    title: 'Room 3',
    value: 'room3',
    appendIcon: '',
    capacity: 17,
    floor: 1
  },
  {
    title: 'Room 4',
    value: 'room4',
    appendIcon: '',
    capacity: 6,
    floor: 1
  }
])
const selectedRoom = ref<string>('')

function rnd(a: number, b: number) {
  return Math.floor((b - a + 1) * Math.random()) + a
}

function getEvents(args: { start: Date; end: Date }) {
  const getEventsArr = []

  const min = args.start
  const max = args.end
  const days = (max.getTime() - min.getTime()) / 86400000
  const eventCount = rnd(days, days + 20)

  for (let i = 0; i < eventCount; i++) {
    const allDay = rnd(0, 3) === 0
    const firstTimestamp = rnd(min.getTime(), max.getTime())
    const first = new Date(firstTimestamp - (firstTimestamp % 900000))
    const secondTimestamp = rnd(2, allDay ? 288 : 8) * 900000
    const second = new Date(first.getTime() + secondTimestamp)

    getEventsArr.push({
      title: titles.value[rnd(0, titles.value.length - 1)],
      start: first,
      end: second,
      color: colors.value[rnd(0, colors.value.length - 1)],
      allDay: !allDay
    })
  }

  events.value = getEventsArr
  console.log(events.value)
}

function logout() {
  router.push('/login')
}

function loadEvents() {
  const adapter = useDate()
  const eventsRange = {
    start: adapter.startOfDay(adapter.startOfMonth(new Date())) as Date,
    end: adapter.endOfDay(adapter.endOfMonth(new Date())) as Date
  }
  console.log(eventsRange)
  getEvents(eventsRange)
}

function selectRoom(roomValue: string) {
  console.log(roomValue)
  selectedRoom.value = roomValue
  loadEvents()
}

onMounted(loadEvents)
</script>
