import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { ru } from 'vuetify/locale'
import { createVuetify } from 'vuetify'
import { VCalendar } from 'vuetify/labs/VCalendar'

export default createVuetify({
  components: {
    VCalendar
  },
  locale: {
    locale: 'ru-RU',
    fallback: 'ru',
    messages: { ru }
  }
})
