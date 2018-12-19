<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Ret skib
        <router-link :to="{ name: 'ShowShip', params: { id: twinship._id } }">(Vis skib)</router-link>
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
          <b-form-input id="Indtast kaldesignal" :state="state" v-model.trim="twinship.callsignal"></b-form-input>
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
          <b-form-input id="use" :state="state" v-model.trim="twinship.use"></b-form-input>
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
        <b-button type="submit" variant="primary">Opdatér</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>

import axios from 'axios'

export default {
  name: 'EditShip',
  data () {
    return {
      twinship: {}
    }
  },
  created () {
    axios.get(`http://localhost:3000/twinship/` + this.$route.params.id)
    .then(response => {
      this.twinship = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.put(`http://localhost:3000/twinship/` + this.$route.params.id, this.twinship)
      .then(response => {
        this.$router.push({
          name: 'ShowShip',
          params: { id: this.$route.params.id }
        })
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  }
}
</script>