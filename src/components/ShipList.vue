<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Skibs liste
        <b-link @click="logout()">(Logout)</b-link>
        <b-link href="#/add-ship">(Tilføj skib)</b-link>
      </h2>
      <b-table striped hover :items="twinships" :fields="fields">
        <template slot="actions" scope="row">
          <b-btn size="sm" @click.stop="details(row.item)">Detaljer</b-btn>
        </template>
      </b-table>
      <ul v-if="errors && errors.length">
        <li v-for="error of errors">
          {{error.message}}
        </li>
      </ul>
    </b-col>
  </b-row>
</template>

<script>

import axios from 'axios'

export default {
  name: 'ShipList',
  data () {
    return {
      fields: {
        name: { label: 'Navn', sortable: true, 'class': 'text-center' },
        home: { label: 'Hjemhavn', sortable: true },
        callsignal: { label: 'Kaldesignal', sortable: true },
        actions: { label: 'Konfigurér', 'class': 'text-center' }
      },
      twinships: [],
      errors: []
    }
  },
  created () {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
    axios.get(`http://localhost:3000/twinship`)
    .then(response => {
      this.twinships = response.data
    })
    .catch(e => {
      this.errors.push(e)
      if(e.response.status === 401) {
        this.$router.push({
          name: 'Login'
        })
      }
    })
  },
  methods: {
    details (twinship) {
      this.$router.push({
        name: 'ShowShip',
        params: { id: twinship._id }
      })
    },
    logout () {
    localStorage.removeItem('jwtToken')
    this.$router.push({
      name: 'Login'
    })
    }
  }
  
}
</script>