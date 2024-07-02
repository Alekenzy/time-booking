<template>
  <v-container class="fill-height bg-light-blue-lighten-5" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="elevation-1 pa-8" border>
          <v-card-title>
            <v-container class="text-center">
              <v-avatar color="primary" size="120">
                <v-icon size="100"> mdi-account </v-icon>
              </v-avatar>
              <div class="text-grey pt-8">Welcome to Time-Booking Service!</div>
            </v-container>
          </v-card-title>
          <v-card-text class="px-0 pb-0">
            <alerts
              :success="success"
              success-msg="Successfully logged in!"
              :error="error"
              :error-msg="errorMsg"
            />

            <v-form v-model="valid">
              <v-text-field
                v-model="username"
                autocomplete="username"
                label="Username"
                name="username"
                append-icon="mdi-account"
                type="text"
                required
                variant="outlined"
                :rules="[() => !!username || 'This field is required']"
                :placeholder="placeholder"
                @keyup.enter="login"
              />

              <v-text-field
                id="password"
                v-model="password"
                autocomplete="current-password"
                label="Password"
                name="password"
                append-icon="mdi-lock"
                type="password"
                required
                variant="outlined"
                :rules="[() => !!password || 'This field is required']"
                :placeholder="placeholder"
                @keyup.enter="login"
              />
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-center px-0">
            <v-btn
              id="login-btn"
              block
              size="x-large"
              color="primary"
              @click="login"
            >
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      placeholder: null,
      username: null,
      password: null,
      success: false,
      error: false,
      errorMsg: null,
      valid: false
    }
  },

  computed: {
    isAuthenticated() {
      return false
    }
  },

  watch: {
    username() {
      this.resetPlaceholder()
    },
    password() {
      this.resetPlaceholder()
    }
  },

  created() {
    if (this.isAuthenticated) {
      this.$router.replace({ name: 'products' })
    }
  },

  mounted() {
    this.fixAutocomplete()
  },

  methods: {
    login() {
      if (!this.valid) return
      this.$router.push('/')
    },

    /**
     * Set placeholder when browser autocompletes username or password to raise
     * v-text-field labels.
     * See: https://github.com/vuetifyjs/vuetify/issues/3679
     */
    fixAutocomplete() {
      let times = 0
      const interval = setInterval(() => {
        times += 1
        if (this.placeholder || times === 20) {
          clearInterval(interval)
        }

        const username = this.$el.querySelector(
          'input[name="username"]:-webkit-autofill'
        )
        const password = this.$el.querySelector(
          'input[name="password"]:-webkit-autofill'
        )

        if (username || password) {
          this.$nextTick(() => {
            this.placeholder = '`\u0020`'
          })
        }
      }, 100)
    },

    /**
     * We set the placeholder back to null if the user edited this field.
     * This way the label of the text field will be moved properly.
     * See the fixAutocomplete function for more information.
     */
    resetPlaceholder() {
      this.placeholder = null
    }
  }
}
</script>
