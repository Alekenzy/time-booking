<template>
  <span>
    <v-alert
      :model-value="success"
      closable
      color="success"
      border="start"
      elevation="2"
      border-color="primary"
      icon="mdi-check"
    >
      {{ successMsg }}
    </v-alert>

    <v-alert
      :model-value="error"
      closable
      color="error"
      border="start"
      elevation="2"
      border-color="primary"
      icon="mdi-alert-outline"
    >
      {{ errorMsg }}
    </v-alert>
  </span>
</template>

<script>
export default {
  name: 'Alerts',
  props: {
    success: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
    successMsg: { type: String, default: null },
    errorMsg: { type: String, default: null }
  }
}
</script>
