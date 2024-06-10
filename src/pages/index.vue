<template>
  <div>
    <v-card>
      <v-layout>
        <v-app-bar
          color="primary"
          prominent
        >
          <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

          <v-toolbar-title>My files</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-switch
            v-model="themeValue"
            :label="`Theme: ${themeValue}`"
            false-value="dark"
            true-value="light"
            hide-details
            class="px-2"
          />

          <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
        </v-app-bar>

        <v-navigation-drawer
          v-model="drawer"
        >
          <v-list
            :items="items"
          ></v-list>
        </v-navigation-drawer>

        <v-main>
          <v-sheet
            class="d-flex"
            height="54"
            tile
          >
            <v-select
              v-model="type"
              :items="types"
              class="ma-2"
              label="View Mode"
              variant="outlined"
              dense
              hide-details
            ></v-select>
            <v-select
              v-model="weekday"
              :items="weekdays"
              class="ma-2"
              label="weekdays"
              variant="outlined"
              dense
              hide-details
            ></v-select>
          </v-sheet>
          <v-sheet>
            <v-calendar
              ref="calendar"
              v-model="value"
              :events="events"
              :view-mode="type"
              :weekdays="weekday"
            ></v-calendar>
          </v-sheet>
        </v-main>
      </v-layout>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import {useDate, useTheme} from 'vuetify'
import {onMounted} from "vue";

const theme = useTheme()

const type = ref<"month" | "week" | "day">('month')
const types = ref<("month" | "week" | "day")[]>(['month', 'week', 'day'])
const weekday = ref<number[]>([0, 1, 2, 3, 4, 5, 6])
const weekdays = ref<{ title: string, value: number[] }[]>([
  {title: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6]},
  {title: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0]},
  {title: 'Mon - Fri', value: [1, 2, 3, 4, 5]},
  {title: 'Mon, Wed, Fri', value: [1, 3, 5]},
])
const value = ref<Date[]>([new Date()])
const events = ref<{
  title: string
  start: Date
  end: Date
  color: string
  allDay: boolean
}[]>([])
const colors = ref<string[]>(['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'])
const titles = ref<string[]>(['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'])

// navigation-drawer dynamic values
const drawer = ref(true)
const group = ref(null)
const items = ref<{
  title: string,
  value: string,
}[]>([
  {
    title: 'Foo',
    value: 'foo',
  },
  {
    title: 'Bar',
    value: 'bar',
  },
  {
    title: 'Fizz',
    value: 'fizz',
  },
  {
    title: 'Buzz',
    value: 'buzz',
  },
])

const themeValue = computed({
  get: () => {
    return theme.global.name.value
  },
  set: (newValue) => {
    theme.global.name.value = newValue
  }
  })

watch(() => group.value, () => {
  console.log(group.value)
  drawer.value = false
})

function rnd(a: number, b: number) {
  return Math.floor((b - a + 1) * Math.random()) + a
}

function getEvents(args: { start: Date, end: Date }) {
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
      allDay: !allDay,
    })
  }

  events.value = getEventsArr
  console.log(events.value)
}

onMounted(() => {
  const adapter = useDate()
  getEvents({
    start: adapter.startOfDay(adapter.startOfMonth(new Date())) as Date,
    end: adapter.endOfDay(adapter.endOfMonth(new Date())) as Date
  })
})
</script>
