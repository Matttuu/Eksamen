<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Tilføj Skib
        <b-link href="#/ship-list">(Skibs liste)</b-link>
      </h2>
      <b-form @submit="onSubmit">
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Indtast navn">
          <b-form-input id="name" :state="state" v-model.trim="twinship.name"></b-form-input>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Indtast hjemhavn">
          <b-form-input id="home" :state="state" v-model.trim="twinship.home"></b-form-input>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Indtast kaldesignal">
          <b-form-input id="callsignal" :state="state" v-model.trim="twinship.callsignal"></b-form-input>
        </b-form-group>
       <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Indtast unikt MMSI-nummer">
          <b-form-input id="mmsi" :state="state" v-model.trim="twinship.mmsi"></b-form-input>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Indtast anvendelse">
                  <b-form-textarea id="use"
                       v-model="twinship.use"
                       placeholder="Indtast anvendelse af skibet"
                       :rows="2"
                       :max-rows="6">{{twinship.use}}</b-form-textarea>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Indtast BRT/BT">
          <b-form-input id="brt" :state="state" v-model.trim="twinship.brt"></b-form-input>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Indtast Længde">
          <b-form-input id="length" :state="state" v-model.trim="twinship.length"></b-form-input>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Indtast maks antal om bord">
          <b-form-input id="maximumpeople" :state="state" v-model.trim="twinship.maximumpeople"></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Gem</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>

import axios from 'axios'

export default {
  name: 'CreateShip',
  data () {
    return {
      twinship: {}
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.post(`http://localhost:3000/twinship`, this.twinship)
      .then(response => {
        this.$router.push({
          name: 'ShowShip',
          params: { id: response.data._id }
        })
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  }
}
</script>