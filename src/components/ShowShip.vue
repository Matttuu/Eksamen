<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Ret skib
        <b-link href="#/ship-list">(Skibs liste)</b-link>
      </h2>
      <b-jumbotron>
        <template slot="header">
          {{twinship.name}}
        </template>
        <template slot="lead">
          Navn: {{twinship.name}}<br>
          Hjemhavn: {{twinship.home}}<br>
          Kaldesignal: {{twinship.callsignal}}<br>
          Unikt MMSI-nummer: {{twinship.mmsi}}<br>
          Anvendelse: {{twinship.use}}<br>
          BRT/BT: {{twinship.brt}} tons<br>
          Længde: {{twinship.length}} meter<br>
          Maks antal om bord: {{twinship.maximumpeople}} personer<br>
        </template>
        <hr class="my-4">
        <p>
          Updated Date: {{twinship.updated_date}}
        </p>
        <b-btn variant="success" @click.stop="edittwinship(twinship._id)">Ret</b-btn>
        <b-btn variant="danger" @click.stop="deletetwinship(twinship._id)">Fjern</b-btn>
      </b-jumbotron>
    </b-col>
  </b-row>
</template>

<script>

import axios from 'axios'

export default {
  name: 'ShowShip',
  data () {
    return {
      twinship: []
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
    edittwinship (twinshipid) {
      this.$router.push({
        name: 'EditShip',
        params: { id: twinshipid }
      })
    },
    deletetwinship (twinshipid) {
      axios.delete('http://localhost:3000/twinship/' + twinshipid)
      .then((result) => {
        this.$router.push({
          name: 'ShipList'
        })
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  }
}
</script>

<style>
  .jumbotron {
    padding: 2rem;
  }
</style>