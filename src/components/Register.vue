<template>
  <b-row class="justify-content-md-center">
    <b-col cols="6">
      <h2>Venligst registrer</h2>
      <div v-if="errors && errors.length">
        <div v-for="error of errors">
          <b-alert show>{{error.message}}</b-alert>
        </div>
      </div>
      <b-form @submit="onSubmit">
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Indtast Brugernavn">
          <b-form-input id="username" :state="state" v-model.trim="register.username"></b-form-input>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Indtast Kodeord">
          <b-form-input type="password" id="password" :state="state" v-model.trim="register.password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
          title="Kodeordet skal indholde mindst ét ord, ét lille og stort bogstav, kodeordet skal være mindst 8 tegn."></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Registrer</b-button>
        <b-button type="button" variant="success" @click="$router.go(-1)">Fortryd</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>

import axios from 'axios'

export default {
  name: 'Register',
  data () {
    return {
      register: {},
      errors: []
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.post(`http://localhost:3000/api/auth/register/`, this.register)
      .then(response => {
        alert("Registrering fuldendt!")
        this.$router.push({
          name: 'Login'
        })
      })
      .catch(e => {
        console.log(e)
        this.errors.push(e)
      })
    },
  }
}
</script>